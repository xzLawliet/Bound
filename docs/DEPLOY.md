# Reproduce Bound on NEAR testnet

Active instance: owner `xzlawliet.testnet`, guardian `guardian.xzlawliet.testnet`, agent `agent2.xzlawliet.testnet`, vendor `vendor.xzlawliet.testnet`. Limits 0.25 NEAR max / 0.5 NEAR daily. Unknown receiver `near-examples.testnet`. The 2026-11-06 run ended unpaused with `spent_today` exactly 0.1 NEAR. Full receipt list: README live proof. Deploy [`C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y`](https://explorer.testnet.near.org/transactions/C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y) uses wasm SHA256 `d8a46cdd310339fb0c9654eacdc7879894e0663038a64039e684b1d72d733110` from source `9e58556`. `Cargo.toml` `repository` is `https://github.com/xzLawliet/Bound` and was not compiled into that wasm. `agent.xzlawliet.testnet` is unused (gas allowance 0, no successful payments).

The commands below use `YOUR_NAME.testnet` placeholders. They are the reproduce path, not a second copy of the live receipts. Legacy old guardian receipts for `guardian.bound-aoyamari.testnet` stay later in this file. https://xzlawliet.github.io/Bound/ still calls that legacy guardian until a later publish from `main`. `frontend/src/near.ts` calls `guardian.xzlawliet.testnet`.

## Build

Rust 1.88+, wasm32-unknown-unknown, and `npm install -g near-cli-rs@latest`.

```bash
cargo test --manifest-path contracts/agent-guardian/Cargo.toml
rustup target add wasm32-unknown-unknown --toolchain 1.88.0
cargo build --release --target wasm32-unknown-unknown --manifest-path contracts/agent-guardian/Cargo.toml
```

## Accounts

```bash
near create-account YOUR_NAME.testnet --use-faucet --network-id testnet
near create-account guardian.YOUR_NAME.testnet --use-account YOUR_NAME.testnet --initial-balance 5 --network-id testnet
near create-account agent.YOUR_NAME.testnet --use-account YOUR_NAME.testnet --initial-balance 1 --network-id testnet
near create-account vendor.YOUR_NAME.testnet --use-account YOUR_NAME.testnet --initial-balance 0.1 --network-id testnet
```

## Deploy, initialize, whitelist

Use supported current `near-cli-rs` syntax (CLI changes flags between versions). Example:

```bash
near contract deploy guardian.YOUR_NAME.testnet use-file contracts/agent-guardian/target/wasm32-unknown-unknown/release/agent_guardian.wasm \
  with-init-call new json-args '{"owner":"YOUR_NAME.testnet","max_per_tx":"250000000000000000000000","daily_limit":"500000000000000000000000"}' \
  prepaid-gas '100 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send

near contract call-function as-transaction guardian.YOUR_NAME.testnet add_to_whitelist \
  json-args '{"account_id":"vendor.YOUR_NAME.testnet"}' prepaid-gas '30 Tgas' attached-deposit '0 NEAR' \
  sign-as YOUR_NAME.testnet network-config testnet sign-with-keychain send

near contract call-function as-read-only guardian.YOUR_NAME.testnet get_policy json-args '{}' network-config testnet now
```

## Agent access key

Use the near-api-js path below. Do not rely on `near account add-key` with no allowance flag: that CLI can prompt for unlimited or for zero, and neither is the allowance used here. Omitting `allowance` in `addFunctionCallAccessKey` is the SDK default, exactly 0.25 NEAR of gas budget. That number is not the treasury `max_per_tx` and it is not full access. Generate an `ed25519` key with `KeyPair.fromRandom` and keep the secret in an ignored local file. With the full-access bootstrap key still on the account:

```js
await account.addFunctionCallAccessKey({ publicKey: generatedPublicKey, contractId: 'guardian.YOUR_NAME.testnet', methodNames: ['spend'] })
await account.deleteKey(bootstrapPublicKey)
console.log(await account.getAccessKeys())
```

Afterwards the agent account should have one Function Call permission, receiver the guardian, method `spend` only. Delete the bootstrap key only after that function-call key exists. Do not commit private keys or send them in chat. The active key on `agent2.xzlawliet.testnet` is `ed25519:AjkYUs1vp7MvfwJmXHs1vaYfYcMT7uEK6EhLU5uksE2c`, added in [`FTVzRfsjWK1x4UMVDEVpAXUhRDewRRBf69GpDPgWwNrH`](https://explorer.testnet.near.org/transactions/FTVzRfsjWK1x4UMVDEVpAXUhRDewRRBf69GpDPgWwNrH), bootstrap removed in [`3b77Pr5xeonRQnWULnzsDn56xDcZAu5PqE5zzPWnxUBS`](https://explorer.testnet.near.org/transactions/3b77Pr5xeonRQnWULnzsDn56xDcZAu5PqE5zzPWnxUBS). Initial allowance was exactly 0.25 NEAR. After the 2026-11-06 run it was about 0.2492 NEAR.

Set `OWNER_ACCOUNT_ID` and `OWNER_PRIVATE_KEY` locally to use owner admin calls. Add `owner-id` and an admin script before browser wallet signing; until then, CLI owner controls are the implemented admin path.

## Demo

```bash
cd scripts
npm install
cp .env.example .env.local
# Modify guardian/agent/vendor IDs; put agent secret only in .env.local.
npm run demo
npm run demo -- --negative-only
# Owner must pause first before this single-request phase.
npm run demo -- --paused-check
```

On `guardian.xzlawliet.testnet` with `agent2.xzlawliet.testnet`, the 2026-11-06 run recorded:
- Allowed 0.1 NEAR to `vendor.xzlawliet.testnet`: [`CmDoLMHxw6of9qPLZc1RntH3ZuQS4uuh7mMDuG1mR6qZ`](https://explorer.testnet.near.org/transactions/CmDoLMHxw6of9qPLZc1RntH3ZuQS4uuh7mMDuG1mR6qZ)
- 0.3 NEAR rejected over max: [`GSJ6Jd6q6oGfjw91a6nQoTRcerxvJ48JJeYXvhHkg1Cc`](https://explorer.testnet.near.org/transactions/GSJ6Jd6q6oGfjw91a6nQoTRcerxvJ48JJeYXvhHkg1Cc)
- 0.1 NEAR to `near-examples.testnet` rejected: [`HGtfkbpYV99BTVB77eRKU3SbRWaBQKoj75NoLXwedexR`](https://explorer.testnet.near.org/transactions/HGtfkbpYV99BTVB77eRKU3SbRWaBQKoj75NoLXwedexR)
- Native transfer blocked `AccessKeyRequiresFullAccessActionError`
- `spent_today` exactly 0.1 NEAR
- Pause [`BKH74dMTfo76QXQrrAiA4G8N89kqfQ9FHV89yxEsWLjc`](https://explorer.testnet.near.org/transactions/BKH74dMTfo76QXQrrAiA4G8N89kqfQ9FHV89yxEsWLjc), paused rejection [`Ffj9zMx2DXdJFnXLHtXwVYV75d7tVfUemrEyoVA1BQsW`](https://explorer.testnet.near.org/transactions/Ffj9zMx2DXdJFnXLHtXwVYV75d7tVfUemrEyoVA1BQsW), unpause [`5zFyRDCHbByoPwL11soDg6cNoTCP8v2cZDsGofr93ZpR`](https://explorer.testnet.near.org/transactions/5zFyRDCHbByoPwL11soDg6cNoTCP8v2cZDsGofr93ZpR)

`npm run demo` reads daily usage first and refuses when headroom is gone. The 0.5 / 0.5 day in the legacy section is `guardian.bound-aoyamari.testnet`, not this balance. The active wasm SHA256 is `d8a46cdd310339fb0c9654eacdc7879894e0663038a64039e684b1d72d733110` (base58 `FagUutviDcjAKZY6Crv8Aj7H3T41jkqBFhuH1kCGWf3m` on the legacy upgrade of the same bytes).

Agent `--paused-check` expects owner already paused and will return success only on `reason=paused`. Restore owner unpause manually with CLI.

CLI pause/unpause:

```bash
near contract call-function as-transaction guardian.YOUR_NAME.testnet pause json-args '{}' \
  prepaid-gas '30 Tgas' attached-deposit '0 NEAR' sign-as YOUR_NAME.testnet \
  network-config testnet sign-with-keychain send
near contract call-function as-transaction guardian.YOUR_NAME.testnet unpause json-args '{}' \
  prepaid-gas '30 Tgas' attached-deposit '0 NEAR' sign-as YOUR_NAME.testnet \
  network-config testnet sign-with-keychain send
```

## Storage & test notes

Unit tests cover both ways the contract moves NEAR:

- `spend` creates a transfer receipt for the exact yocto amount when the policy allows. A rejected `spend` (pause, zero, whitelist, per-tx cap, daily cap, spendable balance) leaves `spent_today` unchanged and creates no transfer.
- `withdraw` is owner-only, rejects zero, rejects amounts above the spendable balance, and still works while paused. The receipt pays the owner and does not consume the daily cap.
- Non-owners cannot `set_policy`, whitelist add/remove, `pause`, `unpause`, or `withdraw`.
- `deposit` is not owner-gated. It only accepts a non-zero attached deposit.
- Amounts are integer yoctoNEAR. Views report the current UTC bucket immediately; the stored bucket rolls on the next `spend` or `set_policy`.
- Spendable balance reserves `storage_usage * 10^19` yoctoNEAR. That constant is `env::storage_byte_cost()` from near-sdk 5.17.2.

This is not a comprehensive audit. There is no owner-key rotation in the MVP. A full-access key on the guardian account can still change code or transfer NEAR outside these methods. `spend` does not restrict the predecessor, so any account can pay a whitelisted receiver up to the caps. No off-chain or TEE claims are made.

## Bytecode provenance

### First wasm

The first `guardian.bound-aoyamari.testnet` `view_code` hash was base58 `6SS3z8n8jBE2Co4pLGF6c24tAaWbi145PEtdvbZcLTh`, SHA256 `0164a8f67c6087542cff3dfbb7404e95c07c971e05fb16adf245f386ec2046b0` (standard base58 of the raw digest, not base58check). The string `3882a4N4K5525P3Q7663C23U4A9BJ13375UDWB9C78H` does not encode that digest. That wasm is no longer the account code.

On that first wasm, and still after the upgrade below, a read-only `contract_source_metadata` call returns:

```json
{"version":"0.1.0","link":"https://github.com/aoyamari/Bound","standards":[{"standard":"nep330","version":"1.3.0"}],"build_info":null}
```

`link` in that JSON is the repository URL stored in the wasm on `guardian.bound-aoyamari.testnet`. The public source is https://github.com/xzLawliet/Bound. `Cargo.toml` `repository` is now that URL. This change does not rebuild or redeploy, so those deployed bytes still name `https://github.com/aoyamari/Bound`. `build_info` is null, so the wasm does not name a git commit. The embedded link matches `Cargo.toml` `repository` from `469b74b` through `31ab724`. Those commits, including the documented deploy commit `05859e9`, have the same `lib.rs`, `Cargo.toml`, `Cargo.lock`, and `rust-toolchain.toml`. Earlier commits embed a different link (prior repository `https://github.com/aoyamari/bound` at `ec52f6a`, `https://github.com/example/onchain-agent-guardian` at `21f5987`) and are not that first wasm.

Rust 1.88.0 (`6b00bc3880198600130e1cf62b8f8a93494488cc`, LLVM 20.1.5), command:

```bash
RUSTFLAGS='--remap-path-prefix=/usr/local/cargo=/home/box/.cargo' \
  cargo build --release --target wasm32-unknown-unknown --manifest-path contracts/agent-guardian/Cargo.toml
```

produced a 255,267-byte wasm whose SHA256 is `0164a8f67c6087542cff3dfbb7404e95c07c971e05fb16adf245f386ec2046b0`. The same command without that remap, with this machine's cargo home `/usr/local/cargo`, produced SHA256 `7c5d346b89f53d5f4023970520861f0f50e688d8a1e1817cbdcccb431fb67ab2`. The two files are the same length and differ only in 20 copies of that cargo-home prefix inside panic paths. No contract build workflow existed; `.github/workflows/pages.yml` at `cbca672` built the frontend only and was removed in `44de228`. Deploy transaction `GdqpWg8PvXefyA3Y4ShMo2d73fxFp5CaqovCs6MBWrmg` does not store a commit id.

This identifies the first deployed source as that identical contract tree, not one commit inside it. The compiler note above is only for that reproduction. It does not assign a compiler to any other local wasm, and it does not mean a later source change or a build with `NEP330_BUILD_INFO_*` set will match.

`scripts/contract-provenance.py` prints SHA256, base58, and the embedded NEP-330 JSON for a wasm. Its encoder self-test still uses the first digest above; that pair is not the current code hash. `.github/workflows/contract-provenance.yml` is an optional later build: it sets `NEP330_BUILD_INFO_SOURCE_CODE_SNAPSHOT` to `HEAD` and remaps paths to `/cargo-home` and `/workspace`, then uploads a wasm artifact. This upgrade did not use those variables (`build_info` is null) and this follow-up does not change the contract.

### Legacy old guardian receipts: second wasm on `guardian.bound-aoyamari.testnet`

Legacy. The active deploy [`C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y`](https://explorer.testnet.near.org/transactions/C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y) on `guardian.xzlawliet.testnet` uses this same SHA256 from source `9e585567f69163f1e9bbbc4d53e35e9a9901983c`. This section is the old account. Its 0.5 NEAR day is not the active `spent_today` of 0.1 NEAR.

Upgrade deploy [`Cb6saE7z...`](https://explorer.testnet.near.org/transactions/Cb6saE7zu8kRQUYTqqhjgmNpzooTTLJsov7FEvy4HCwH) of contract source `9e585567f69163f1e9bbbc4d53e35e9a9901983c`. That commit is the contract-source ancestor of https://github.com/xzLawliet/Bound `main`. Documentation commits after it leave the contract at that source. One `DeployContract` action and no init call. Read-only `view_code` matches base58 `FagUutviDcjAKZY6Crv8Aj7H3T41jkqBFhuH1kCGWf3m`, SHA256 `d8a46cdd310339fb0c9654eacdc7879894e0663038a64039e684b1d72d733110`, 255,688 bytes. No compiler version is claimed here for that file. The same observations were first recorded on the prior repository in [pull request #2](https://github.com/aoyamari/Bound/pull/2).

Legacy state after that upgrade: `get_policy` owner `bound-aoyamari.testnet`, max 0.25 NEAR, daily 0.5 NEAR, not paused, whitelist only `vendor.bound-aoyamari.testnet`. On UTC day bucket `20763` (2026-11-06), legacy `get_spent_today` is 0.5 NEAR. That is a legacy old guardian receipt. Active `spent_today` on `guardian.xzlawliet.testnet` for the same date is exactly 0.1 NEAR. Legacy `can_spend` on the old account: vendor 0.3 NEAR `over_max_per_tx`; `near-examples.testnet` 0.1 NEAR `not_whitelisted`; vendor 0.1 NEAR `over_daily_limit`.

`view_access_key_list` for `agent.bound-aoyamari.testnet`: one key, `ed25519:7MMphMSA1J6R9w9kWL2RJmj3nvC8P3T32dDYy2TyExA3`, Function Call, receiver `guardian.bound-aoyamari.testnet`, method `spend` only. A direct transfer with that key was rejected `AccessKeyRequiresFullAccessActionError` and was not repeated here. Pause proof: [`7uUR1gfa...`](https://explorer.testnet.near.org/transactions/7uUR1gfap394ABxjmsieZgEQWXa31zMSCgkoi1MVnsF5), agent rejection [`DBoVGpNm...`](https://explorer.testnet.near.org/transactions/DBoVGpNmUkLBX4M7Xars3JtmUuw9gASv5RMkeG1H3EEe), unpause [`G7HnvG3f...`](https://explorer.testnet.near.org/transactions/G7HnvG3fezT7jeWuzAWaAWn2EVw4Yx3JFumntZ8TZaD4).

Optional read-only checks, with no key and no transaction:

```bash
curl -s https://rpc.testnet.near.org -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"bound-view-code","method":"query","params":{"request_type":"view_code","finality":"final","account_id":"guardian.bound-aoyamari.testnet"}}' \
  | jq -r '.result.hash'
curl -s https://rpc.testnet.near.org -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"bound-meta","method":"query","params":{"request_type":"call_function","finality":"final","account_id":"guardian.bound-aoyamari.testnet","method_name":"contract_source_metadata","args_base64":"e30="}}'
```

Legacy agent key scope: `near account list-keys agent.bound-aoyamari.testnet network-config testnet now`. The active agent is `agent2.xzlawliet.testnet`. `agent.xzlawliet.testnet` is unused.

### Frontend

React/Vite/TypeScript, public `get_policy`, `get_spent_today` and `can_spend` via `fetch`; no browser key. Source calls `guardian.xzlawliet.testnet`. The header shows that id in exact case. The published Pages build still calls archive guardian `guardian.bound-aoyamari.testnet`. Owner wallet UI is not wired yet until specifically completed; not represented as live admin. The required Node version is >=22.22.2. For a supplied secret in NEAR account credential JSON, keep the key file outside the repo and pass `AGENT_KEY_FILE`.

## Dashboard publishing

GitHub Pages for https://github.com/xzLawliet/Bound serves https://xzlawliet.github.io/Bound/ from the `gh-pages` branch at `/`. `.github/workflows/contract-provenance.yml` builds and uploads a wasm artifact. Source stays on `main`. A new dashboard release uses this command:

```bash
cd frontend
npm ci
npm run publish
```

`publish` runs tests, builds, then uses a dev-only `gh-pages` package to deploy `dist` to the `gh-pages` branch of https://github.com/xzLawliet/Bound. Pages deploys that branch from `/`. The live site is https://xzlawliet.github.io/Bound/. `frontend/vite.config.ts` has the `/Bound/` base. The published build serves `/Bound/assets/index-Z9pJAv1H.js` and `/Bound/assets/index-BlP7_agH.css` and still calls legacy guardian `guardian.bound-aoyamari.testnet`. This change does not run `npm run publish`. https://xzlawliet.github.io/Bound/ shows `guardian.xzlawliet.testnet` only after a later publish from `main`. Browser RPC is public GET-style contract view through JSON-RPC. Direct contract mutation is CLI-only in MVP; the web app has no wallet or credentials.
