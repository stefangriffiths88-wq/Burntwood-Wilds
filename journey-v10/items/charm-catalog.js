// Rarity is immutable identity; fusion rank I–III is separate.
const CHARM_DEFS=[
 ['sturdy','Sturdy Button','♥',0,'+10 maximum health.'],['iron','Iron Thimble','⬡',0,'+3 armour.'],['running','Running Stitch','➤',0,'+6% movement speed.'],['quick','Quick Thread','»',0,'+8% normal and permanent-companion attack speed.'],['keen','Keen Whisker','◎',0,'+8 percentage points critical chance.'],['heavy','Heavy Claw','ϟ',0,'+25 percentage points critical damage.'],['scavenger','Scavenger’s String','◇',0,'+25% pickup range.'],['locket','Scratched Locket','♥',0,'Every 12 defeats drops healing.'],
 ['watch','Pocket Watch','◷',1,'Special cooldown −15%; perfect defence refunds 1s.'],['frost','Frost Marble','❄',1,'Direct hits slow 20% for 1.5s; bosses resist.'],['hunter','Hunter’s Badge','✦',1,'+20% damage to heroic and final bosses.'],['bramble','Bramble Ring','♧',1,'Knockback exposes ordinary enemies: +30% damage for 2s.'],['ember','Ember Acorn','♨',1,'Defeats leave a small burning patch for 2s.'],['thorn','Thorn Brooch','✹',1,'Taking damage releases thorns; 3s cooldown.'],['moon','Moon Ribbon','☽',1,'Dodge through: next normal hit +50%.'],['mender','Mender’s Knot','✿',1,'+20% healing received.'],
 ['purse','Loaded Purse','₲',2,'Starting charm only: +100 gold once on a fresh run.'],['patient','Patient Fang','Ⅴ',2,'Five eligible non-critical hits: next eligible hit guaranteed critical. Any critical resets it.'],['storm','Storm Button','ϟ',2,'Direct hits chain to 2 foes; 1.5s cooldown.'],['bell','Cracked Bell','◉',2,'Six qualifying hits release a 30-damage shockwave.'],['guardian','Guardian Bell','◇',2,'20s without damage grants a one-hit shield.'],['echo','Echo Coin','◎',2,'Every fifth normal attack primes one 70%-damage echo.'],['opportunist','Opportunist’s Pin','✧',2,'+35% normal damage to slowed or stunned foes.'],
 ['glass','Glass Collar','♦',3,'+30% normal damage; −20% maximum health.'],['still','Stillwater Stone','▣',3,'Stand still for 1s: +25% normal damage. Moving removes it.'],['blood','Bloodstained Ribbon','♥',3,'Normal hits heal 2% of damage, capped at 2 HP/s. Other healing −30%.'],['blunt','Blunt Promise','✖',3,'+25% normal damage. Your attacks cannot critically hit.'],['clockwork','Clockwork Heart','⚙',3,'Special cooldown −30%; normal attack speed −15%.'],
 ['wisp','Healing Wisp','✚',2,'A green orb circles you. Heal 2% max health every 3s.'],
 ['element_fire','Cinder Heart','✦',2,'+35% fire damage.'],
 ['element_ice','Glacial Shard','✦',2,'+35% ice damage.'],
 ['element_lightning','Storm Prism','✦',2,'+35% lightning damage.'],
 ['element_venom','Venom Fang','✦',2,'+35% venom damage.'],
 ['element_leech','Crimson Chalice','✦',2,'+35% Leech healing.'],
 ['element_wound','Serrated Seal','✦',2,'+35% wound damage.'],
 ['element_retaliation','Revenge Crest','✦',2,'+35% retaliation damage.'],
 ['phantom','Phantom Pact','♙',4,'Special summons a shadow for 4s mirroring normal hits at 40% power. Special cooldown +20%.'],['lantern','Last Light Lantern','☀',4,'Once per arena survive lethal damage at 1 HP with 2s invulnerability. Healing then disabled; normal damage +25%.']
];
const CHARMS=Object.fromEntries(CHARM_DEFS.map(([key,name,icon,rarity,text])=>[key,{name,icon,rarity,color:RARITIES[rarity].color,text}]));
const CHARM_GOLD_PRICES=[30,55,95,150,220],STARTER_COSTS=[6,12,24,40,60];
