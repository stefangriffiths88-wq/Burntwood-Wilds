// Crisp individual object illustrations, shared by chest cards, slots and shops.
const CHARM_ART={
 sturdy:'<circle cx="32" cy="32" r="17"/><circle cx="27" cy="27" r="2"/><circle cx="37" cy="27" r="2"/><circle cx="27" cy="37" r="2"/><circle cx="37" cy="37" r="2"/>',
 iron:'<path d="M19 46 22 18Q32 10 42 18L45 46Z"/><path d="M24 24H40M23 31H41M22 38H42"/>',
 running:'<path d="M14 39 26 26 37 35 49 35 52 44 16 47Z"/><path d="M19 30H8M15 24H5M27 31 33 35"/>',
 quick:'<path d="M20 16H44L40 25 44 46H20L24 25Z"/><path d="M23 29H41M22 34H42M22 39H42M47 21 56 30 47 39"/>',
 keen:'<path d="M12 32Q32 12 52 32Q32 52 12 32Z"/><ellipse cx="32" cy="32" rx="6" ry="11"/><path d="M8 22 19 26M8 42 19 38M56 22 45 26M56 42 45 38"/>',
 heavy:'<path d="M12 45 19 14Q27 22 23 42M27 45 34 10Q43 21 38 42M42 45 49 17Q57 27 52 45"/>',
 scavenger:'<path d="M20 14V32Q20 48 33 48Q46 48 46 32V14M20 23H46"/><path d="m8 32 5 5-5 5M53 23l5 5-5 5"/>',
 locket:'<path d="M25 16Q32 5 39 16M32 48C7 34 13 17 25 22Q32 15 39 22C51 17 57 34 32 48Z"/><path d="M23 27 39 40M32 25 27 39"/>',
 watch:'<circle cx="32" cy="35" r="18"/><path d="M26 11H38M32 11V17M32 24V35L40 39"/>',
 frost:'<circle cx="32" cy="32" r="21"/><path d="M32 16V48M18 24 46 40M18 40 46 24M28 19l4 5 4-5M20 27l6 1-1 6M44 37l-6-1 1-6"/>',
 hunter:'<path d="m32 10 7 10 12 1-2 12 3 10-13 2-7 9-7-9-13-2 3-10-2-12 12-1Z"/><path d="m32 22 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z"/>',
 bramble:'<circle cx="32" cy="32" r="17"/><path d="m19 18-6-8 1 16M40 17l11-7-6 15M48 37l10 8-13-1M26 48l-7 9 1-14M20 28l22 13M22 37l18-16"/>',
 ember:'<path d="M18 30Q32 19 46 30L43 41Q32 57 21 41Z"/><path d="M16 30Q32 13 48 30ZM32 20V11M27 15Q14 11 20 25"/>',
 thorn:'<path d="m32 9 5 15 15-8-9 15 13 7-17 1-2 16-9-14-14 9 6-16-13-6 17-2Z"/><circle cx="32" cy="32" r="7"/>',
 moon:'<path d="M43 14Q15 15 24 37Q31 47 47 39Q33 61 15 41Q1 19 26 10Z"/><path d="m33 43 1 14 8-8 8 3-5-13"/>',
 mender:'<path d="M14 22Q32 11 44 24Q52 39 35 47Q20 53 14 38Q10 23 27 23Q43 23 39 35Q35 46 27 35Q18 23 37 17"/>',
 purse:'<path d="M21 13H43L38 25Q55 49 43 53H21Q9 49 26 25ZM23 24H41"/><path d="M32 31V46M38 34H29Q24 38 33 39Q42 43 27 44"/>',
 patient:'<path d="M19 12Q49 9 45 29Q42 44 25 53Q34 32 22 28Z"/><path d="M21 18 42 20M25 28 40 29"/>',
 storm:'<circle cx="32" cy="32" r="22"/><path d="m35 14-14 21h11l-3 15 16-23H34Z"/>',
 bell:'<path d="M17 43H47L43 24Q32 9 21 24ZM12 45H52M27 48Q32 58 37 48M29 15V9H35V15M31 21l-3 10 7 5-4 9"/>',
 guardian:'<path d="M32 7 52 15V31Q49 47 32 57Q15 47 12 31V15Z"/><path d="M23 38H41L38 25Q32 18 26 25ZM29 41Q32 47 35 41"/>',
 echo:'<circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="11"/><path d="M8 20Q0 32 8 44M56 20Q64 32 56 44M28 25l9 7-9 7"/>',
 opportunist:'<path d="M19 15H45L32 40ZM32 40V54"/><circle cx="32" cy="24" r="5"/><path d="m11 35 5 5-5 5M49 35l5 5-5 5"/>',
 glass:'<path d="M7 21 19 15 32 24 45 15 57 21 48 45H16Z"/><path d="m32 24-6 21M32 24l8 21M17 20l4 18M47 20l-4 18"/>',
 still:'<path d="M12 41 19 20 38 14 52 30 46 47 25 52Z"/><path d="M19 20 28 35 52 30M28 35l-3 17M19 43Q29 38 40 43"/>',
 blood:'<path d="M12 15 28 10 51 48 40 54ZM35 15 50 9 55 19 42 27"/><path d="M23 25Q14 38 23 39Q32 38 23 25Z"/>',
 blunt:'<path d="M19 10H45L50 28 42 44H22L14 28ZM23 44V54H41V44"/><path d="m24 20 16 15M40 20 24 35"/>',
 clockwork:'<path d="M32 51C7 36 10 15 25 20Q32 12 39 20C54 15 57 36 32 51Z"/><circle cx="32" cy="32" r="8"/><path d="M32 19V24M32 40V45M19 32H24M40 32H45M23 23l4 4M37 37l4 4M41 23l-4 4M27 37l-4 4"/>',
 phantom:'<path d="M15 50V29Q14 8 32 8Q50 8 49 29V50L40 44 32 51 23 44Z"/><ellipse cx="25" cy="28" rx="3" ry="6"/><ellipse cx="39" cy="28" rx="3" ry="6"/>',
 lantern:'<path d="M23 16Q21 2 32 5Q43 2 41 16M18 19H46L42 49H22ZM16 52H48M20 16H44M32 24Q21 39 32 42Q43 39 32 24Z"/>'};
function charmArtwork(key,small=false){let c=CHARMS[key];return '<svg class="charmArtwork '+(small?'mini':'')+'" viewBox="0 0 64 64" role="img" aria-label="'+c.name+'" style="--rarity:'+c.color+'"><rect x="2" y="2" width="60" height="60" rx="15" fill="#0e241d" stroke="'+c.color+'"/><g fill="'+c.color+'22" stroke="'+c.color+'" stroke-width="2.7" stroke-linejoin="round" stroke-linecap="round">'+CHARM_ART[key]+'</g><path d="M12 10H24" stroke="#fff6cf" stroke-width="2" opacity=".65"/></svg>';}

CHARM_ART.wisp='<circle cx="32" cy="30" r="13"/><path d="M21 45Q1 51 9 27M43 13Q62 9 55 36M32 24V36M26 30H38"/>';
CHARM_ART.element_fire='<path d="M32 9Q12 31 21 45Q32 59 46 43Q52 28 39 21Q41 39 30 39Q23 36 32 9Z"/>';
CHARM_ART.element_ice='<path d="M32 8V56M11 20 53 44M11 44 53 20M23 13 32 22 41 13M23 51 32 42 41 51"/>';
CHARM_ART.element_lightning='<path d="M38 7 16 35H30L24 57 49 27H35Z"/>';
CHARM_ART.element_venom='<path d="M20 12 44 12 40 24Q56 50 32 54Q8 50 24 24ZM22 39H42"/>';
CHARM_ART.element_leech='<path d="M18 14H46V33Q44 47 32 45Q20 47 18 33ZM32 45V55M23 55H41"/>';
CHARM_ART.element_wound='<path d="M16 11 28 53M28 11 40 53M40 11 52 53"/>';
CHARM_ART.element_retaliation='<path d="M32 8 53 22 46 48 32 56 18 48 11 22ZM20 32H44M32 20V44"/>';
