# Next update: gameplay review and preparation
Recorded 24 October 2026. User: “Ok get them ready for the new update not yet though.”
Documentation/preparation only. Do not implement, merge or publish gameplay changes until Stef explicitly says update.

## Combined scope
Retain NEXT_COW_QUEEN.md, NEXT_PROGRESSION_PRIORITIES.md and NEXT_ZAK_SHOP_ONLY.md.
Add the following gameplay improvements from the review. Exact tuning remains to be designed and playtested; illustrative numbers are not validated balance.

1. Restore distinctive functioning boss mechanics. Current Sankeys Umbrella Man is a market enemy dispatched through stepMonsterBoss; legacy rubbish healing/shield logic belongs to park code and is not his active controller. Build the appropriate mechanic for Umbrella Man without accidentally transplanting unrelated park behaviour. Give each boss a distinct response required from the player, using clear openings and bounded mechanics.
2. Improve upgrade spacing as well as XP costs. Normal showUpgrade bypasses legacy-only minimum timing, and chooseUpgrade can immediately reopen another choice. Preserve earned XP and insert meaningful active combat between choices; do not make the player wait on a frozen menu. Retain quick first improvement and provisional first-area level 4–5.
3. Prevent recovery from rewarding idle waiting. Review regeneration, Wisp, Joseph defence healing, heart drops, shrines and between-area healing together. Cleared active route stretches allow regeneration without new threats. Prefer finite rest-point recovery and/or healing earned through combat or relevant defence. Preserve each hero's identity and avoid blanket healing nerfs.
4. Shift later challenge toward behaviour and enemy combinations. Existing stage HP multipliers are 1/1.4/1.9/2.45/3.1 and damage 1/1.22/1.44/1.67/1.9. These facts alone do not prove fights are too long; measure encounter durations and deaths before retuning. Do not add health merely to make fights hard.
5. Support deliberate specialisation with fewer total choices and useful offers. Thirty current choices versus three five-rank tracks plus evolutions leaves room to complete several paths. Current category rotation follows history count rather than chosen build. Preserve uncertainty while allowing players to pursue a plan; test focused and mixed builds, including special- and defence-focused heroes.
6. Make ordinary shop rerolls cost journey gold rather than saved essence. Current rerolls cost 2/4/6 essence versus 2 essence per boss, competing with permanent unlocks. Determine escalating gold prices through economy checks; do not charge players or migrate balances during preparation.
7. Align risk and reward. Current ordinary boss payout is 35 gold and 2 essence regardless of encounter length. Review gold income, healing purchases and reward usefulness across area order. Preserve the working boss-charm strengthening system rather than replacing it with another reward system. Optional content should show its reward before commitment.

## Evidence and limits
Reviewed current main 0bb723c57afccc3150ed708677013bf4783ad272, unchanged during this review.
Inspected combat dispatch, bosses, route spawn gates, upgrade offers, growth/scaling, defences, healing, charms, shops and permanent reward logic.
Controlled checks:
- With accumulated XP injected, normal mode accepted six choices at the same combat time. This demonstrates back-to-back menu behaviour, not natural levelling frequency.
- Direct regeneration check: 1 HP/s restored 30 health over 30 seconds.
- Joseph rank-five defence healed 30 to 36.4 health without an incoming attack.
- Sankeys boss at half health, 60 seconds of simulation with invulnerability to isolate behaviour: only walk/monsterWind/monsterAttack/recover; market=true, park=false, no healUsed field, normal parkDamageFactor=1. This is not a player survival test.
Existing automated suites often use invulnerability and injected upgrades; they verify contracts, not human fun or difficulty.

## Validation required once authorised
Measure first-upgrade timing, time between choices, total picks and time in menus.
Measure ordinary/heroic/boss duration, damage sources, healing earned versus idle healing, gold earned/spent and reward usefulness.
Cover all 13 heroes, fresh and progressed saves, focused and mixed builds, different area orders, slow Ricky and melee/summon characters.
Verify attack telegraphs correspond to hit geometry; safe movement, walls and projectiles work in each boss arena.
Verify existing owned heroes/saves and essence balances survive migration; rewards and terminal Queen win occur once; save failures cannot silently lose rewards.
Use targeted deterministic and mobile layout checks, followed by human phone playtesting. No balance claim based solely on invulnerable runs.

Do not resume the paused large artwork overhaul. Native Queen sprite review remains part of her integration preparation.
