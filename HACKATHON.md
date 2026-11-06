# NEAR HACKATHON — submit notes

**Project:** Bound
**Tracks (pick both if form allows):** `security` + `agents`
**Deadline:** 14 Nov 2026 · 23:59 UTC
**Site:** https://nearhackathon.com/
**Live dashboard:** https://xzlawliet.github.io/Bound/
**Repository:** https://github.com/xzLawliet/Bound
**Active testnet:** owner `xzlawliet.testnet`, guardian `guardian.xzlawliet.testnet`, agent `agent2.xzlawliet.testnet`, vendor `vendor.xzlawliet.testnet`. Limits 0.25 NEAR max / 0.5 NEAR daily. Unknown receiver `near-examples.testnet`. 2026-11-06 run ended unpaused with `spent_today` exactly 0.1 NEAR. Receipts: README live proof. Legacy old guardian receipts stay in `DEV.md` and are not this balance. https://xzlawliet.github.io/Bound/ still calls `guardian.bound-aoyamari.testnet` until a later publish from `main`.

## Positioning one-liner

Transparent on-chain spending policy for AI agents — complementary to OutLayer (TEE custody), not a clone.

## Demo script outline (~75 seconds)

1. Show explorer / UI: policy is **public** (`get_policy`).
2. Agent spends under limit to whitelisted vendor → **SpendAllowed**.
3. Agent tries over `max_per_tx` or daily → **SpendRejected** with on-chain reason.
4. Same FC key tries native NEAR transfer → **fails** (FC keys cannot transfer).
5. Close: *OutLayer isolates keys; we make budgets verifiable.*

## FC key proof (required narrative)

- Create agent key with `add_access_key` permission = Function Call only to guardian `spend`.
- Document that Function Call keys **cannot** `Transfer` NEAR at the protocol level.
- Treasury NEAR only leaves via guardian `spend` / owner `withdraw`.

## Submit checklist

- [x] Public GitHub repo
- [x] README with OutLayer table + Do X → see Y
- [x] `cargo test` green
- [x] Testnet deploy + example tx links (active `guardian.xzlawliet.testnet` / `agent2.xzlawliet.testnet`, including allow, over-max, non-whitelist, and pause; legacy receipts in `DEV.md`)
- [ ] Demo video 60–90s
- [ ] Post on X tagging `@NEARProtocol` + `#NEARHackathon`
- [ ] Form: NEAR wallet for prizes, repo URL, post link
- [ ] Do **not** claim “more secure than OutLayer”

## Future (mention only, do not block MVP)

- `spend_via_intent` — settle via NEAR Intents to whitelisted merchants
- Optional private inference for “why spend” while keep allow/deny on-chain
