# Five-area builds — 10.6.0

The run requires all five distinct areas, in any order. Each arena offers six choices (8/22/37/52/67/82 seconds); heroic at 45 seconds, final boss at 90 seconds. Thirty selections reach level 31. XP can bring a choice up to three seconds forward, never produce extra choices. Boss fighting time is additional. This is a pacing starting point, not a claim of human balance.

## Ownership and growth
`upgrades/build-stats.js` owns twelve stat tracks, rarity, caps and `HERO_GROWTH`. `progression.js` owns offers and scaling. Growth is granted with each selected level; health adds only the gained maximum, not a full heal. Normal/permanent-companion damage scales with Power; specials/status/procs retain their own values. Jodie’s companion and Evie’s autonomous duck cooldowns use attack speed as well as player normal attacks. All heroes use the same inventory/economy/reward code.

| Stat | Common / Uncommon / Rare / Epic / Legendary | Chosen-stat cap |
|---|---|---|
| Vitality | 3 / 5 / 7 / 10 / 15 HP | 150 HP |
| Protection | 1 / 2 / 3 / 4 / 6 armour | 40 |
| Recovery | .1 / .15 / .25 / .4 / .6 HP/s | 5 HP/s |
| Power, Tempo | 3 / 5 / 7 / 10 / 15% | 150 / 100% |
| Precision | 1 / 2 / 3 / 4 / 6 points | 60 points |
| Ferocity, Scavenging | 5 / 8 / 12 / 18 / 25% | 150 / 100% |
| Agility, Reflexes, Focus | 2 / 3 / 4 / 5 / 7% | 50 / 40 / 40% |
| Restoration | 3 / 5 / 7 / 10 / 15% | 100% |

A stat stops at its cap or five Legendary selections, whichever comes first. Combined charm/stat caps: armour 60 (damage multiplied by 100/(100+3×armour)); critical chance 75%; critical damage 400% total; attack speed bonus 150%; movement bonus 65%; dodge reduction 50%; special reduction 70%; pickup bonus 150%. Permanent bonuses remain separately modest. Weapon/special/dodge investments advance through five rarity colours; Stefan/Evie retain their existing four additional weapon upgrades. No sixth/above-Legendary ability purchase.

| Area order | Common | Uncommon | Rare | Epic | Legendary |
|---|---:|---:|---:|---:|---:|
| 1 | 50 | 30 | 15 | 5 | 0 |
| 2 | 35 | 32 | 23 | 9 | 1 |
| 3 | 20 | 30 | 30 | 16 | 4 |
| 4 | 10 | 23 | 34 | 25 | 8 |
| 5 | 5 | 15 | 30 | 35 | 15 |

Heroic reward screens offer three distinct choices; fourth/fifth stage guarantee at least one Epic or Legendary. Earlier offers sometimes favour an equipped duplicate for fusion. Loaded Purse is excluded from mid-run random stock/rewards.

## Gold and essence
Zero starting gold except an equipped saved Loaded Purse starter grants 100 once. Ordinary defeats: 12% chance of a two-gold pickup; heroic: 12 gold; final: 20 gold and two saved essence. No old flat 60-coin arena reward. Pickup range affects gold and XP. Mimi sells three charm offers; purchases are single use, stock refreshes after a victory, and prices by rarity are 35/65/130/210/330 gold. Existing five run supplies remain available.

Rerolls spend saved essence after explicit confirmation: 2/4/6/8… throughout one run; reopening and changing arenas do not reset the price. Starter unlock prices: 6/12/24/40/60 saved essence by rarity. Unlock once, select one globally for future fresh runs; no repeated entrance cost. Changing selection during a run affects the next run. Starter occupies one of three equipment slots.

Save v2 (`burntwood-wilds-progress-v2`) accepts old v1 backups and falls back to the old key. Existing essence/hero ranks remain intact; v1 is not deleted. No active-run resume after page reload. Purchases apply only after successful save writes. No automatic cloud sync.

## Park
Five rival cat types: Scrapper (double swipe), Hedge Pouncer (marked landing), Bin Bandit (rubbish delivery), Bench Bruiser (broad swipe), Spitter (warned slippery hairball patches). Heroic Patch pounces then swipes three times. Umbrella Man cycles warned sweep/rush and frontal shield; punish the stuck recovery or attack behind the shield. At low health his recovery becomes shorter. He seeks rubbish piles and channels a 5%-maximum-health heal. Dealing 1.5% maximum health during the channel interrupts it. Total healing is capped at 15% maximum health, even if bandits refill bins. Defeated town preview retains his identity with resting/wounded treatment.

## Inventory and limitations
BUILD / BAG pauses combat and lists equipped/spare charms, fusion ranks, effects, warnings and stat totals. Equip/fusion only in town. Two identical same-rank copies fuse up to III; rarity is fixed and separate. When bag fusion creates a stronger copy of an equipped charm it replaces that weaker copy, retaining the weaker one in the bag. No item is silently lost. Stat and rarity UI uses labels as well as colour.

Scripted invulnerable journeys test mechanics, not survival difficulty. Mobile Chromium is not native iPhone Safari. Burntwood’s existing illustrative roads are preserved pending an agreed reference map. Opening cinematic, escape tokens and broader geography work remain deferred.

## 10.11.0 — rewards that change a run (supersedes the 10.6 numbers above)

User requested exciting, dramatic rewards and whole-game reward/balance review.
This update changes the shared run reward loop; approved character moves, sprites,
portraits, collision, saves and permanent upgrade prices remain intact.

| Stat | Common / Uncommon / Rare / Epic / Legendary |
|---|---|
| Vitality | 8 / 12 / 18 / 25 / 35 HP |
| Protection | 2 / 3 / 5 / 7 / 10 armour |
| Recovery | .2 / .35 / .5 / .75 / 1 HP/s |
| Power | 10 / 15 / 22 / 30 / 40% |
| Tempo | 8 / 12 / 18 / 25 / 35% |
| Precision | 4 / 6 / 9 / 12 / 16 points |
| Ferocity | 15 / 22 / 32 / 45 / 60 points |
| Agility, Reflexes, Focus | 5 / 7 / 10 / 13 / 16% |
| Scavenging | 15 / 25 / 40 / 60 / 80% |
| Restoration | 10 / 15 / 22 / 30 / 40% |

Existing chosen-stat and combined caps still apply. Blunt Promise suppresses crit
stat offers. After Last Light, regeneration/healing-effect offers are withheld for
that arena. Every third pick offers a Rare+ stat (Epic+ in areas four/five).
When two ability paths remain, two distinct ability choices accompany the stat.
Ability colours indicate progress, with honest STEP X OF Y / FINAL UPGRADE labels;
rolled rarity belongs to stat/charm rewards. Weapon upgrades take effect on the
next attack within .12s. Selection adds a brief, nonblocking reward banner and
synthesized chime. Reduced-motion visuals avoid movement; no extra confirmation.
Feedback is owned by upgrades/feedback.js, separate from combat and progression.

Enemy HP/damage no longer grow with purchased levels, and existing enemies are
not strengthened by a choice. Arena-order multipliers are HP 1/1.4/1.9/2.45/3.1
and damage 1/1.22/1.44/1.67/1.9. Final-area values are near the earlier level-25
scaling, while early investments can create a genuine advantage. Spawn pressure
follows elapsed arena milestones, never how many upgrades have been selected.
Five areas, six choices each and 90s final-boss timing remain unchanged.

Heroic offers include Rare+ from the first arena, Epic+ in the fourth/fifth.
Fusion/bag/equip consequences are labelled. Final boss gold 35, heroic gold 20;
ordinary defeats have an 18% chance of two gold. Shop charm prices are
30/55/95/150/220. Fresh stock has three distinct choices and at least one
currently affordable item whenever gold reaches 30. Reopening does not refresh
stock; confirmed rerolls retain the saved-essence debit and escalating costs.
Fire, lightning and bleed perk damage scale once with Power; recursion guards,
healing limits, slows and other safety caps remain unchanged.

Design references (representative games, not a claim to survey every roguelike):
- https://store.steampowered.com/app/1794680/Vampire_Survivors/ — focused weapon investment and snowballing choices.
- https://store.steampowered.com/app/2321470/Deep_Rock_Galactic_Survivor/ — stronger equipment alongside deeper, tougher encounters.
- https://www.supergiantgames.com/games/hades/ — combining divine powers in a run.

These informed our own design decisions; they do not establish numeric balance.
The new deterministic 30-build/900-choice audit checks contracts and caps, not
human survival or excitement. Existing actual-combat, charm and browser suites
remain required, followed by user phone playtesting.
