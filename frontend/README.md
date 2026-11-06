# Bound dashboard

Polished read-only demo UI for **Bound** — *Autonomy, within bounds.*

Talks to a NEAR testnet guardian via public RPC only. No backend. No wallet. No keys in the browser.

**Contract:** [`guardian.xzlawliet.testnet`](https://explorer.testnet.near.org/accounts/guardian.xzlawliet.testnet). Owner `xzlawliet.testnet`. Agent `agent2.xzlawliet.testnet`. Vendor `vendor.xzlawliet.testnet`.
**Deploy and init:** [`C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y`](https://explorer.testnet.near.org/transactions/C4ECGqdcki9YV9ZZUbTdzuFYoyNH48poWXSna4NGTQ9y). Wasm SHA256 `d8a46cdd310339fb0c9654eacdc7879894e0663038a64039e684b1d72d733110` from source `9e58556` (that metadata edit in `Cargo.toml` was not rebuilt into the wasm). On 2026-11-06, `spent_today` ended at exactly 0.1 NEAR. Payment receipts are in the root README.
**Header:** `guardian.xzlawliet.testnet` in exact case. Scenario rows show `vendor.xzlawliet.testnet` and `near-examples.testnet`. Owner text comes from `get_policy`.
**Published site:** https://xzlawliet.github.io/Bound/ still calls legacy guardian `guardian.bound-aoyamari.testnet` until a later publish from `main`. This change does not publish Pages.
**RPC:** `https://rpc.testnet.near.org`
**Views used:** `get_policy`, `get_spent_today`, `can_spend`
**Repository:** https://github.com/xzLawliet/Bound
**Live dashboard:** https://xzlawliet.github.io/Bound/

## Run

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** (Vite binds `0.0.0.0:5173`).

Other scripts:

```bash
npm test          # unit tests (yocto helpers)
npm run build     # production build → dist/
npm run preview   # serve dist on :5173
```

## What you see

- Giant typographic hero + **LIVE NEAR TESTNET** badge and explorer deep-link
- Three live stat cards: max per payment, daily allowance, spent today
- Architecture / live-simulate focus toggle
- Three dry-run buttons call `can_spend` on `guardian.xzlawliet.testnet`. They are views, not the payments below:
  1. `0.1 Ⓝ` → `vendor.xzlawliet.testnet` (payment [`CmDoLMHx…`](https://explorer.testnet.near.org/transactions/CmDoLMHxw6of9qPLZc1RntH3ZuQS4uuh7mMDuG1mR6qZ))
  2. `0.3 Ⓝ` → `vendor.xzlawliet.testnet` (rejection [`GSJ6Jd6q…`](https://explorer.testnet.near.org/transactions/GSJ6Jd6q6oGfjw91a6nQoTRcerxvJ48JJeYXvhHkg1Cc); live max is 0.25 NEAR)
  3. `0.1 Ⓝ` → `near-examples.testnet` (rejection [`HGtfkbpY…`](https://explorer.testnet.near.org/transactions/HGtfkbpYV99BTVB77eRKU3SbRWaBQKoj75NoLXwedexR))

## Stack

React 18 + Vite + TypeScript. Raw `fetch` to NEAR JSON-RPC — no `near-api-js`, no secrets.

## Publish

`npm run publish` tests, builds, and publishes `dist` to the `gh-pages` branch of https://github.com/xzLawliet/Bound. The live site is https://xzlawliet.github.io/Bound/ and still calls legacy guardian `guardian.bound-aoyamari.testnet`. It shows `guardian.xzlawliet.testnet` only after a later publish from `main`. This change does not run `npm run publish`.
