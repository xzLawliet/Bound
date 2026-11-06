# Bound development and live proof

**Test only:** all accounts below are on NEAR **testnet**. Never use its private keys on mainnet.

## Active account

Owner `xzlawliet.testnet`. Guardian `guardian.xzlawliet.testnet`. Agent `agent2.xzlawliet.testnet`. Vendor `vendor.xzlawliet.testnet`. Unknown receiver `near-examples.testnet`. Limits 0.25 NEAR max / 0.5 NEAR daily. The 2026-11-06 run ended unpaused with `spent_today` exactly 0.1 NEAR. Receipts are in the README live-proof table: deploy [`C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y`](https://explorer.testnet.near.org/transactions/C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y), whitelist [`BL1QBjbxW13tiXj2RyM2PWCz7GaEVsCxxB5hcPdbaE5B`](https://explorer.testnet.near.org/transactions/BL1QBjbxW13tiXj2RyM2PWCz7GaEVsCxxB5hcPdbaE5B), agent2 create [`F9LXENTGCouNQxDabduV5Wob8MzbnbwS1qM2PwBAsHQa`](https://explorer.testnet.near.org/transactions/F9LXENTGCouNQxDabduV5Wob8MzbnbwS1qM2PwBAsHQa), function-call key [`FTVzRfsjWK1x4UMVDEVpAXUhRDewRRBf69GpDPgWwNrH`](https://explorer.testnet.near.org/transactions/FTVzRfsjWK1x4UMVDEVpAXUhRDewRRBf69GpDPgWwNrH), bootstrap delete [`3b77Pr5xeonRQnWULnzsDn56xDcZAu5PqE5zzPWnxUBS`](https://explorer.testnet.near.org/transactions/3b77Pr5xeonRQnWULnzsDn56xDcZAu5PqE5zzPWnxUBS), allowed 0.1 [`CmDoLMHxw6of9qPLZc1RntH3ZuQS4uuh7mMDuG1mR6qZ`](https://explorer.testnet.near.org/transactions/CmDoLMHxw6of9qPLZc1RntH3ZuQS4uuh7mMDuG1mR6qZ), over-max [`GSJ6Jd6q6oGfjw91a6nQoTRcerxvJ48JJeYXvhHkg1Cc`](https://explorer.testnet.near.org/transactions/GSJ6Jd6q6oGfjw91a6nQoTRcerxvJ48JJeYXvhHkg1Cc), non-whitelist [`HGtfkbpYV99BTVB77eRKU3SbRWaBQKoj75NoLXwedexR`](https://explorer.testnet.near.org/transactions/HGtfkbpYV99BTVB77eRKU3SbRWaBQKoj75NoLXwedexR), pause [`BKH74dMTfo76QXQrrAiA4G8N89kqfQ9FHV89yxEsWLjc`](https://explorer.testnet.near.org/transactions/BKH74dMTfo76QXQrrAiA4G8N89kqfQ9FHV89yxEsWLjc), paused rejection [`Ffj9zMx2DXdJFnXLHtXwVYV75d7tVfUemrEyoVA1BQsW`](https://explorer.testnet.near.org/transactions/Ffj9zMx2DXdJFnXLHtXwVYV75d7tVfUemrEyoVA1BQsW), unpause [`5zFyRDCHbByoPwL11soDg6cNoTCP8v2cZDsGofr93ZpR`](https://explorer.testnet.near.org/transactions/5zFyRDCHbByoPwL11soDg6cNoTCP8v2cZDsGofr93ZpR). A direct native transfer was blocked with `AccessKeyRequiresFullAccessActionError`.

The function-call key is `ed25519:AjkYUs1vp7MvfwJmXHs1vaYfYcMT7uEK6EhLU5uksE2c`, method `spend` only, receiver `guardian.xzlawliet.testnet`. Initial gas allowance was exactly 0.25 NEAR (near-api-js default when allowance is omitted). After the run it was about 0.2492 NEAR. That budget is not the treasury cap and not full access. The private key stays local. Owner faucet [`HCTPTiMUQhCzHKLKYKspcz7aTgSjwgxspSpq7sDbVEAA`](https://explorer.testnet.near.org/transactions/HCTPTiMUQhCzHKLKYKspcz7aTgSjwgxspSpq7sDbVEAA) is 10 NEAR of account creation.

`agent.xzlawliet.testnet` is unused. Its key had gas allowance 0 and it made no successful payments.

Artifact SHA256 `d8a46cdd310339fb0c9654eacdc7879894e0663038a64039e684b1d72d733110` was produced from contract source commit `9e58556` and is deployed on `guardian.xzlawliet.testnet`. The archive guardian upgrade used the same digest. `Cargo.toml` `repository` is now `https://github.com/xzLawliet/Bound`. That later metadata edit was not compiled into the artifact. `contract_source_metadata.link` inside the bytes is `https://github.com/aoyamari/Bound` and `build_info` is null. The link is the repository string stored from commit `9e58556`. The active account is `guardian.xzlawliet.testnet`.

`frontend/src/near.ts` calls `guardian.xzlawliet.testnet`. https://xzlawliet.github.io/Bound/ serves `/Bound/assets/index-Bsw1NO-N.js` and `/Bound/assets/index-Caz9VB2G.css`. A read-only fetch on 2026-11-06 showed that bundle calls the same guardian. This documentation change does not publish Pages.

All guardian private credentials stay outside tracked files, locally; full-access owner credentials are outside the repo, while the restricted agent credential is under ignored `scripts/credentials/`. `.gitignore` excludes credentials and local env files. None of those files or raw private keys belongs in the public repo, browser, or demo.

## Legacy old guardian receipts (`bound-aoyamari.testnet`)

Legacy only. These balances and receipts belong to `guardian.bound-aoyamari.testnet`. They are not the balance of `guardian.xzlawliet.testnet`, which ended 2026-11-06 at 0.1 NEAR spent.

- Owner `bound-aoyamari.testnet`
- Guardian `guardian.bound-aoyamari.testnet`
- Agent `agent.bound-aoyamari.testnet` (only `spend` on guardian permitted)
- Whitelist `vendor.bound-aoyamari.testnet`
- Config: 0.25 NEAR max payment / 0.5 NEAR per UTC day
- Testnet treasury ~5 NEAR; first deploy [transaction](https://explorer.testnet.near.org/transactions/GdqpWg8PvXefyA3Y4ShMo2d73fxFp5CaqovCs6MBWrmg). That transaction id is not a git commit. See `docs/DEPLOY.md` for the first wasm's source range.
- Public source: https://github.com/xzLawliet/Bound. Deployed contract source is ancestor `9e585567f69163f1e9bbbc4d53e35e9a9901983c`. Commits after that ancestor on `main` did not replace that deployed wasm.
- Add whitelist [transaction](https://explorer.testnet.near.org/transactions/4DfDaNBXAKtPHuzATaMnC6b3r6E2G1QWZSBB8FvgrtZh)
- Added Function Call key [transaction](https://explorer.testnet.near.org/transactions/EodNEt68piFniETwQLxMKRaJDNK5bR5o6DDtreXEY639)
- Deleted full-access bootstrap key [transaction](https://explorer.testnet.near.org/transactions/aWtyzmteNMx9Ss3y5f5gF1kC5CzMfQC2uqWeqDZQd7f)

## Legacy old guardian receipts: code upgrade on `guardian.bound-aoyamari.testnet`

Legacy record for `guardian.bound-aoyamari.testnet`. The active deploy is [`C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y`](https://explorer.testnet.near.org/transactions/C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y) on `guardian.xzlawliet.testnet`, using this same wasm digest from source `9e58556`. The `Cargo.toml` repository edit after that source was not built into the wasm.

Second deploy of contract source `9e585567f69163f1e9bbbc4d53e35e9a9901983c` (ancestor of current `main`), [`Cb6saE7z...`](https://explorer.testnet.near.org/transactions/Cb6saE7zu8kRQUYTqqhjgmNpzooTTLJsov7FEvy4HCwH). Read-only tx status: signer and receiver `guardian.bound-aoyamari.testnet`, one `DeployContract` action, `SuccessValue` (`without-init-call`). This note does not name a compiler for that wasm. These observations were first written on the prior repository in [pull request #2](https://github.com/aoyamari/Bound/pull/2) and are carried forward here. This follow-up sends no new transaction.

Read-only `view_code` (2026-11-06): base58 `FagUutviDcjAKZY6Crv8Aj7H3T41jkqBFhuH1kCGWf3m`, SHA256 `d8a46cdd310339fb0c9654eacdc7879894e0663038a64039e684b1d72d733110`, 255,688 bytes. `contract_source_metadata` is still `{"version":"0.1.0","link":"https://github.com/aoyamari/Bound",...,"build_info":null}`. That `link` is the prior repository string inside the deployed bytes. It is not the current public source URL. The bytes do not carry a git commit. `.github/workflows/contract-provenance.yml` can set `NEP330_BUILD_INFO_*` on a later build; it was not used for this deploy, and this follow-up does not change the contract. `Cargo.toml` `repository` in source is now `https://github.com/xzLawliet/Bound`. That edit does not replace the `link` recorded in the bytes on `guardian.bound-aoyamari.testnet`.

`get_policy` after the upgrade: owner `bound-aoyamari.testnet`, max `250000000000000000000000` (0.25 NEAR), daily `500000000000000000000000` (0.5 NEAR), `paused` false, whitelist only `vendor.bound-aoyamari.testnet`.

Legacy `get_spent_today` on UTC day bucket `20763` (2026-11-06) for `guardian.bound-aoyamari.testnet` is `500000000000000000000000` (0.5 / 0.5). That number is a legacy old guardian receipt, not the active balance. The active guardian ended the same UTC day at exactly 0.1 NEAR spent. Earlier `SpendAllowed` receipts in this section are the previous bytecode on the legacy account.

Read-only `can_spend` after the upgrade:

- `vendor.bound-aoyamari.testnet` 0.3 NEAR → `over_max_per_tx`
- `near-examples.testnet` 0.1 NEAR → `not_whitelisted`
- `vendor.bound-aoyamari.testnet` 0.1 NEAR → `over_daily_limit`

Pause on the upgraded code, then restored:

- Owner [pause](https://explorer.testnet.near.org/transactions/7uUR1gfap394ABxjmsieZgEQWXa31zMSCgkoi1MVnsF5) → `Paused`
- Agent [spend 0.1 NEAR to vendor](https://explorer.testnet.near.org/transactions/DBoVGpNmUkLBX4M7Xars3JtmUuw9gASv5RMkeG1H3EEe) → `SpendRejected` / `paused` (no transfer)
- Owner [unpause](https://explorer.testnet.near.org/transactions/G7HnvG3fezT7jeWuzAWaAWn2EVw4Yx3JFumntZ8TZaD4) → `Unpaused`

`view_access_key_list` for `agent.bound-aoyamari.testnet` returns one key, `ed25519:7MMphMSA1J6R9w9kWL2RJmj3nvC8P3T32dDYy2TyExA3`, Function Call to `guardian.bound-aoyamari.testnet`, method `spend` only. A direct NEAR transfer with that key was rejected `AccessKeyRequiresFullAccessActionError`. This follow-up did not submit that transfer again.

## Legacy old guardian receipts: first bytecode (2026-11-06)

- **Allowed 0.1 NEAR:** [`3pNHTman...`](https://explorer.testnet.near.org/transactions/3pNHTmanHQ8gPtnQNVeCLt7k4YuemMYNc9aTL6NtYoqR) -> `SpendAllowed`, `memo=bound-allowed`, daily spend 0.1 -> 0.2 NEAR.
- **Over limit 0.3 NEAR:** [`B8p9RA7z...`](https://explorer.testnet.near.org/transactions/B8p9RA7zqgARfrJ6g1k1mrPP1Mx63urtPfJ3po6V1Z4x) -> `SpendRejected: over_max_per_tx`.
- **Not whitelisted 0.1 NEAR:** [`CbaJYocR...`](https://explorer.testnet.near.org/transactions/CbaJYocRDNseff9iAtpchbtD8o6pcy6WvHQxssL3Mbn9) -> `SpendRejected: not_whitelisted`.

Direct native transfer of 1 yoctoNEAR using the same agent key was attempted before these runs and rejected `RequiresFullAccess` by protocol. No treasury transfer to the intended recipient succeeded. `npm run demo` includes the same negative test. The demo script reads the current daily usage first, verifies the relative allowed increment, and refuses when daily headroom is insufficient. This preserves accounting when invoked more than once on different days.

## Legacy old guardian receipts: emergency stop on the first bytecode

- [Pause](https://explorer.testnet.near.org/transactions/DYAbRR83n3QRCYnFp8Ft3REGQSt9MrcygThDv7VDwA4B)
- [Unpause](https://explorer.testnet.near.org/transactions/EzukxiKFGnP64zQkeozVwdNhZxHTNqJjXdwvXpkq4WDS)
- While paused, legitimate whitelisted spending on the legacy guardian emitted `SpendRejected / paused`. That legacy treasury was restored. The active guardian's pause proof is the 2026-11-06 README table.

## Static dashboard hosting

The client-only dashboard is live at https://xzlawliet.github.io/Bound/. GitHub Pages serves the `gh-pages` branch of https://github.com/xzLawliet/Bound from `/`, and the site base path is `/Bound/`. The page title is `Bound — Autonomy, within bounds.` The published build serves `/Bound/assets/index-Bsw1NO-N.js` and `/Bound/assets/index-Caz9VB2G.css`. That bundle requests `guardian.xzlawliet.testnet`. Read-only check on 2026-11-06. This documentation change does not publish. RPC is public read access; no keys enter the browser.

## State reads

Active reads. The 2026-11-06 run result is above: unpaused, `spent_today` exactly 0.1 NEAR, one function-call key on `agent2.xzlawliet.testnet`. Legacy reads used `guardian.bound-aoyamari.testnet`, `vendor.bound-aoyamari.testnet`, and `agent.bound-aoyamari.testnet`.

```bash
near contract call-function as-read-only guardian.xzlawliet.testnet get_policy json-args '{}' network-config testnet now
near contract call-function as-read-only guardian.xzlawliet.testnet can_spend json-args '{"receiver":"vendor.xzlawliet.testnet","amount":"300000000000000000000000"}' network-config testnet now
near account list-keys agent2.xzlawliet.testnet network-config testnet now
```


### Revalidation with near-api-js 7.4.0

The demo now uses supported SDK 7.4.0 (`Account`, `KeyPairSigner`, explicit bigint gas and deposit). `npm audit` reports zero production vulnerabilities. Old v5 `connect`/`keyStores` APIs are no longer required. If using an external credential key JSON, `KeyPairSigner.fromSecretKey` expects the `ed25519:` prefix.

Legacy old guardian receipts: end-to-end demo on the first bytecode of `guardian.bound-aoyamari.testnet`. The 0.5 NEAR day total below is that legacy account, not `guardian.xzlawliet.testnet`:
- [Allowed 0.1 NEAR](https://explorer.testnet.near.org/transactions/BuuwybQdwNjbqNt4hgxp5ssFkePr3REQQtNCvURKAMdC) -> accumulated day usage exactly 0.5 NEAR.
- [Over-max rejection](https://explorer.testnet.near.org/transactions/3cL4xH9gBxbLdoc7678rJqJYMHMNAprBZitcJeVtd1Z7)
- [Non-whitelisted rejection](https://explorer.testnet.near.org/transactions/7RYBvjzyTin3w7YmUvsNp2bLswwq51Kqp8AQaNc8e66W)
- [Agent request during pause](https://explorer.testnet.near.org/transactions/EthpUMqJJXzMW6rsTiFNDm9zwbmRHv65xRiZQ489QkAp) -> `SpendRejected: paused`.
- Restored [unpause](https://explorer.testnet.near.org/transactions/78nWR2WyuQip5djUujJVjXmMxXkAJJFqXMApdU7dNH6E) after pause proof.

Do not repeat the positive scenario after the cap is exhausted: default script safely refuses once configured allowance is reached. Dry-run cards remain available until the UTC reset. Negative-only and paused checks do not move whitelist treasury funds.
