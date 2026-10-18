// Dedicated weapon/special/defence pictograms, composable within existing SVG art.
const HERO_ABILITY_ART={harvey:['M5 4Q1 12 5 20Q12 25 19 20Q24 12 19 4Q12 -1 5 4ZM9 8Q5 14 11 17Q18 17 16 10Q12 6 9 11','M8 3Q13 -1 17 4L21 16Q22 23 15 22L6 19Q1 17 4 11ZM7 10H8M13 6H14M15 15H16M9 17H10'],immy:['M3 20Q5 9 17 4M7 13 4 8M11 8 10 3M15 6 21 7','M3 10 5 3 10 6Q12 5 14 6L19 3 21 10V17Q12 24 3 17ZM7 12H9M15 12H17M10 17 12 18 14 17'],
 jackson:['M3 17Q1 3 17 3Q23 3 21 9Q19 22 6 21ZM7 8 16 17M9 6 6 9M13 10 10 13M17 14 14 17','M2 18 9 10 14 11 20 5M15 4 22 4 22 11M3 6 10 6M2 11H6'],
 ava:['M12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8Z','M12 2V8M2 12H8M16 12H22M12 16V22M4 4 8 8M16 16 20 20M4 20 8 16M16 8 20 4'],
 stef:['M3 12 6 7 10 7 10 4 14 4 14 7 19 8 21 14 16 20 7 20Z','M7 12 10 7 14 7 14 4 18 4 18 7 22 10 21 17 16 21 9 19ZM1 7H5M1 12H4M2 17H5'],
 jodie:['M4 3 7 15M11 2 12 15M18 3 17 15M3 18Q12 23 21 18','M6 12Q12 7 18 12Q24 22 12 19Q0 22 6 12ZM4 5V8M10 2V6M16 2V6M21 5V8'],
 evie:['M3 16Q2 11 9 12V8Q9 2 15 3Q20 3 19 8L23 10H18Q17 20 8 21Q2 21 3 16Z','M12 3 14 7 19 8 16 12 17 17 12 14 7 17 8 12 5 8 10 7ZM3 20H21'],
 zak:['M6 18Q0 16 4 10Q2 3 10 5Q15 -1 19 7Q26 8 22 15Q23 21 16 19Z','M7 3 6 9Q0 15 6 20Q12 25 20 19Q25 12 18 9L17 3ZM7 14H18M10 18H15'],
 mimi:['M3 21 18 2 22 2 22 6 7 21ZM3 14 10 21','M12 2A10 10 0 1 0 22 12M12 7V17M8 9Q12 5 16 9Q18 14 12 17'],
 joseph:['M3 14 7 8 13 8 17 12 15 19 5 20ZM17 3 21 3M19 7H23M2 3 7 5','M3 17 8 10 12 14 20 3M15 3H21V9M4 21H20'],
 tom:['M2 11 6 6 11 7 12 12 11 20 3 19ZM13 12 14 7 19 6 23 11 22 19 14 20Z','M2 18 7 14 10 20 14 8 18 15 22 11M4 5 9 7M16 3 20 5'],
 havannah:['M12 2 14 8 21 7 17 12 22 17 15 17 12 23 9 17 2 17 7 12 3 7 10 8Z','M3 12Q3 2 12 2Q21 2 21 12M5 11 9 8M15 8 19 11M6 20 9 15 12 21 15 15 18 20']};
function heroAbilityIcon(hero,path){if(path==='weapon')return '<img class="uiGlyph abilityArt weaponPortrait" src="journey-v10/assets/icons/'+hero+'.webp" alt="'+CHARACTERS[hero].name+' normal attack">';let d=path==='dodge'?({harvey:HERO_ABILITY_ART.harvey[0],immy:HERO_ABILITY_ART.immy[0],jackson:GLYPHS.agility,ava:GLYPHS.star,stef:GLYPHS.armour,jodie:GLYPHS.paw,evie:GLYPHS.duck,zak:GLYPHS.cloud,mimi:GLYPHS.reflexes,joseph:GLYPHS.regen,tom:GLYPHS.armour,havannah:GLYPHS.ferocity}[hero]||GLYPHS.armour):HERO_ABILITY_ART[hero]?.[path==='special'?1:0]||GLYPHS.star;return '<svg class="uiGlyph abilityArt" viewBox="0 0 24 24" aria-hidden="true"><path d="'+d+'"/></svg>';}
function updateActionIcons(){for(let [id,path]of [['charge','special'],['dodge','dodge']]){let el=$(id);el.querySelector?.('.abilityArt')?.remove();el.insertAdjacentHTML?.('beforeend',heroAbilityIcon(selected,path));}}
const DEFENCE_BUTTONS={harvey:'PORTAL',immy:'ROOTSTEP',jackson:'SIDESTEP',ava:'ESCAPE',stef:'BRACE',jodie:'CIRCLE',evie:'COVER',zak:'ESCAPE',mimi:'VANISH',joseph:'SHAKE OFF',tom:'BRACE',havannah:'GET OFF!'};
