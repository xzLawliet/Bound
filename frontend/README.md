# Bound dashboard

Polished read-only demo UI for **Bound** — *Autonomy, within bounds.*

Talks to a NEAR testnet guardian via public RPC only. No backend. No wallet. No keys in the browser.

**Contract (source target):** [`guardian.xzlawliet.testnet`](https://explorer.testnet.near.org/accounts/guardian.xzlawliet.testnet) (previously `guardian.bound-aoyamari.testnet`). The account was created with 5 NEAR. No contract code and no policy are recorded on it, so this UI has no live policy to render until a later deploy.
**Owner account:** `xzlawliet.testnet` (previously `bound-aoyamari.testnet`) exists. Faucet of 10 NEAR: [`HCTPTiMUQhCzHKLKYKspcz7aTgSjwgxspSpq7sDbVEAA`](https://explorer.testnet.near.org/transactions/HCTPTiMUQhCzHKLKYKspcz7aTgSjwgxspSpq7sDbVEAA). That receipt is not a contract deploy. The owner id is not a frontend literal; it appears only if `get_policy` returns it.
**Published site:** https://xzlawliet.github.io/Bound/ still calls `guardian.bound-aoyamari.testnet`. This change does not publish Pages.
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
- Three preconfigured dry-runs (`can_spend` on `guardian.xzlawliet.testnet`, previously `guardian.bound-aoyamari.testnet`). No code is recorded on the new guardian, so these cards have no new on-chain result:
  1. `0.1 Ⓝ` → `vendor.xzlawliet.testnet` (previously `vendor.bound-aoyamari.testnet`). On the previous guardian, 2026-11-06 UTC was already 0.5 / 0.5, so that dry-run returned `over_daily_limit`. That result is not a result for the new guardian.
  2. `0.3 Ⓝ` → `vendor.xzlawliet.testnet` (previously `vendor.bound-aoyamari.testnet`). The card compares `0.3` with live `max_per_tx`. The intended max after init remains `0.25 Ⓝ`. That policy is not deployed.
  3. `0.1 Ⓝ` → `near-examples.testnet` (unchanged unknown receiver). `not_whitelisted` applies only after init, and only while unpaused. Not observed on the new account.

## Stack

React 18 + Vite + TypeScript. Raw `fetch` to NEAR JSON-RPC — no `near-api-js`, no secrets.

## Publish

`npm run publish` tests, builds, and publishes `dist` to the `gh-pages` branch of https://github.com/xzLawliet/Bound. The live site is https://xzlawliet.github.io/Bound/ and still calls `guardian.bound-aoyamari.testnet`. This migration does not run `npm run publish`. Do not publish during on-chain owner-admin operations; owner controls are only through documented NEAR CLI in this MVP. Owner for the new namespace is `xzlawliet.testnet` (previously `bound-aoyamari.testnet`).
