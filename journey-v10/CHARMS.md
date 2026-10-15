# Thirty run-only charms — 10.6.0

Three equipped slots. Rarity is immutable; merging two identical same-rank copies gives the next fusion rank (I–III). Rank power is 1 / 1.5 / 2 unless explicitly noted. `items/charm-catalog.js` owns identity/rarity, `items/charms.js` owns effects/fusion, `items/economy.js` owns shops/starter unlocks. See BUILDS.md for prices and odds. Inventory displays exact current-rank effects.

| Rarity | Charm | Rank I effect |
|---|---|---|
| Common | Sturdy Button | +10 maximum health |
| Common | Iron Thimble | +3 armour |
| Common | Running Stitch | +6% movement |
| Common | Quick Thread | +8% normal/permanent-companion attack speed |
| Common | Keen Whisker | +8 points critical chance |
| Common | Heavy Claw | +25 points critical damage |
| Common | Scavenger’s String | +25% pickup range |
| Common | Scratched Locket | Every 12 defeats drops 10 healing |
| Uncommon | Pocket Watch | −15% special cooldown |
| Uncommon | Frost Marble | Direct hits slow 20% for 1.5s; bosses resist |
| Uncommon | Hunter’s Badge | +20% damage to heroic/final bosses |
| Uncommon | Bramble Ring | Knockback exposes ordinary enemies for +15% damage, 2s |
| Uncommon | Ember Acorn | Defeats leave 2s fire, 4 damage per .5s; max 8 patches |
| Uncommon | Thorn Brooch | Taking damage bursts for 18; 3s cooldown |
| Uncommon | Moon Ribbon | Dodge through an enemy: next normal hit +50%, 4s mark |
| Uncommon | Mender’s Knot | +20% healing received |
| Rare | Loaded Purse | Starting charm only: 100 gold once per fresh run |
| Rare | Patient Fang | Five eligible noncritical hits: next guaranteed critical |
| Rare | Storm Button | Chains 8 damage to two foes; 1.5s cooldown |
| Rare | Cracked Bell | Eight qualifying hits burst for 12 nearby damage |
| Rare | Guardian Bell | 20s without damage gives one-hit shield |
| Rare | Echo Coin | Every fifth normal attack primes one 40% echo |
| Rare | Opportunist’s Pin | +20% normal damage against slowed/stunned foes |
| Epic | Glass Collar | +30% normal damage; −20% max health |
| Epic | Stillwater Stone | Stand still 1s: +25% normal damage |
| Epic | Bloodstained Ribbon | 2% normal-hit lifesteal, cap 2 HP/s; other healing −30% |
| Epic | Blunt Promise | +25% normal damage; criticals disabled |
| Epic | Clockwork Heart | −30% special cooldown; −15% attack speed |
| Legendary | Phantom Pact | Special gives 4s clone mirroring normal hits at 40%; special cooldown +20% |
| Legendary | Last Light Lantern | Once/arena lethal rescue at 1 HP, 2s invulnerability; no healing and +25% normal damage afterwards |

Guardian shield threshold ranks: 20/16/12 seconds. Patient Fang: 5/4/3 eligible noncritical hits before the guarantee, with a .12s counter gate to bound simultaneous multihits. Any natural critical resets the counter; extra critical chance competes with the guarantee rather than adding another critical. Blunt Promise overrides Patient Fang, critical chance/damage and the critical shrine. Direct weapon/permanent-companion hits can crit; special/status/perk/charm/clone damage cannot.

Phantom mirrors at 40/50/60%, at most once per .2s; one clone, no recursive proc/crit/perk damage. Last Light’s rescue/penalties are identical at all fusion ranks. Loaded Purse never grants additional gold from acquisition, re-equipping or fusion; its starter grant remains 100 at all ranks. Glass’s health cost, Blood’s 2 HP/s cap and −30% other healing, Phantom’s cooldown penalty and Clockwork’s attack-speed penalty do not disappear at higher ranks. Most positive values scale by rank power; Clockwork’s speed penalty also scales, as shown in inventory.

Useful pairings: Frost + Opportunist; Keen + Heavy; Watch + Phantom; Mender + Locket/Blood; Quick + Echo. Tradeoffs: Patient + Keen reduces guarantee frequency; Blunt disables crit items; Blood reduces healing pickups; Last Light disables all healing after rescue; Glass reduces the health buffer; Stillwater rewards risky stationary play. Queues, fire patches, lifesteal and proc intervals are bounded.
