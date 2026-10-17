# Active release checkpoint — 10.15.0

17 October 2026. This Work session owns feature/town-lane-detail and PR #73. User explicitly authorised Rugby/town/Bruce detail update.

Final source: 6f841eb8e1aaba7e0a09a680e5c8452b6d988f3a. Generated/package head: f3e1161b76516a4313a0d706cbc5128b4a8714dd. Final CI 39060991575: numeric/character/upgrade/save/economy/encounter and broad phone suites passed; charm matrix still running. Changed-review job117478809500 passed. Phone artifact12111407244 reviewed at390x844/650 and844x390; Mimi shop, route, Bruce, caption clearance accepted for user playtest. No new runtime edits planned.

Canonical/versioned runtime380521 bytes, SHA256704dc587bc553ddea0af3e327a0efa1eccf70fdb6f032d50d62d2a185aa458f9, Git blob0fd82931fab9c5b9856850ef4c7ce7d29e1334cb. Historical10.14.0 preserved.

Implemented: winding/potholed lane with forward arrivals; nonblocking Mimi captions; spaced Rugby-only upgrades (14/34/54/76/98/120s, minimum18s); signed town streets/pavements and minimap; no town arrow; shopkeeper behind counter inside open MIMI’S frontage; contoured/furred detailed reference-based Bruce. All other arenas/hero art and permanent saves preserved.

Earlier full runs39060561748/39060714623 failed only at an old hardcoded shop tap; corrected fixture reads hub.shop, still using actual touchscreen dialogue→shop. Phone inspection fixed caption/bag and fascia overlap, plus a road junction in a building. Superseded pending runs cancelled by concurrency.

NEXT: wait for final CI39060991575. If green, verify branch/main heads, merge PR73, confirm Pages success and24public byte hashes (/tmp/detail-release-hashes.json), then close PROJECT_STATUS.md/this checkpoint and return10.15.0?v10150 link. Native Safari/fun balance remains Stef’s playtest. Other worktrees and docs PR70 preserved.
