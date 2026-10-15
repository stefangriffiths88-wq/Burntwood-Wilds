# Burntwood town — 10.5.0

## Residents and interaction
Unselected heroes occupy the established positions. world/conversations.js owns the approved first-visit and post-victory lines in TOWN_CHAT. Tap a resident or use nearby TALK: name, existing approved portrait, short dialogue, close button. Combat timers pause during dialogue and shop panels. Stefan opens his workshop; Mimi runs the run shop, or Jodie when playing Mimi. Exact existing shop greetings remain unchanged.

Stefan's workshop is at (334,548); its shed stays accessible when Stefan is playable, without adding a duplicate Stefan. Self-service line: “Help yourself. You know where everything is.” The existing run shop and charm fusion remain at Sankey’s Corner.

## Essence and permanent upgrades
Final arena bosses grant 2 essence per arena defeat per journey; heroic bosses continue to grant run-only charm choices. Shared currency and per-character permanent ranks survive new runs/losses/reloads. Gold escape tokens and an opening cinematic are not included.

upgrades/permanent.js owns the schema, validation, storage, award deduplication and bonus queries. world/workshop.js owns UI and confirmed purchase transactions. Five ranks per track cost 2/4/6/8/10 essence:
- Tough Kit: +2 max health/rank, cap +10.
- Hard Hitter: +1% normal attack and permanent-companion damage/rank, cap +5%. Sources weapon/cat; specials, status and charm/perk procs excluded.
- Quick Feet: +1% movement speed/rank, cap +5%.
- Ready Again: −1% special cooldown/rank, cap −5%.
- Helping Paw: +3% healing received/rank, cap +15%. Does not multiply max-health stat increases. Vampiric healing retains its shared 2 HP/s budget.

Bonuses are snapshotted for each journey and refreshed when entering its first arena, so starting-hub purchases work immediately in the first battle. Purchases made between arenas apply to a new run. They do not change an active journey halfway through. UI states this explicitly.

Victory shows +2 essence and saved status. Loss or final completion offers RETURN TO BURNTWOOD, starting a fresh journey in town with run-only equipment reset and saved essence retained. Earlier arena victories retain the existing boss-perk/continue flow. Cleared bosses and resident victory lines reflect the current journey, not all previous runs.

## Save contract
localStorage key burntwood-wilds-progress-v1. Schema 1 stores essence, validated per-hero ranks, bounded award tokens and workshop-introduction status. Writes are synchronous. Purchase currency/ranks change only after a successful write. If boss-reward saving fails, the reward remains in memory with an explicit backup-needed message; export before leaving. Corrupt stored data is not silently overwritten. A valid explicitly confirmed restore can repair it.

Backup/restore is copyable JSON in the workshop, with a Copy button and manual-selection fallback. Import validates schema, hero IDs, integer balances and rank caps before replacing anything. A separate confirmation clearly states that restore replaces progress; it does not add balances. Progress stays in the current browser/origin; it does not automatically sync across phones. No active combat/run resumption is saved.

## Visuals and map
world/residents.js owns TOWN_DRAW_SCALE for hub NPCs and the selected hub hero. This corrects oversized town Zak/Mimi without altering approved gameplay drawing modules, portraits, combat scale or hitboxes. Existing intentional child/adult differences remain.

Bruce's orange mouth ellipse is removed in arenas/rugby.js; antler net remains. All defeated bosses retain their actual identity in the hub: resting tilt, lowered stance, bandage, bruise, dizzy stars and victory flag. They cannot be re-entered in the same journey. Combat bosses and attacks are unchanged.

Minimap markers come from townMapMarkers: named SHOP and STEF service squares, resident dots, four boss circles, cleared ticks and the player. Town lighting gently brightens per current-run victory. Boss previews are display-only and never spawn actual enemies or rewards.

## Verification and limits
New town-test.cjs covers all resident/selected-hero combinations, self-service Stefan, purchase previews/cancellation/deduplication/caps, exact bonus values and hero isolation, snapshots, save/reload, invalid/corrupt import, unavailable storage, loss return, both final/heroic defeat orders, wounded previews and service map markers. Existing encounters/charm/gameplay suites remain required.

Browser tests use real mobile taps, all seven conversations, purchase confirmation and actual page reload to check persistence, backup/restore confirmation controls, seven hub scale views, four wounded boss views and a short workshop viewport. Screenshots require human/model visual review; CI simulations do not establish native Safari behaviour or human survival balance.

Future: opening spell scene, expanded conversations/discoveries, gold escape tokens, starting charms and larger town decoration remain design work, not implemented scope.
