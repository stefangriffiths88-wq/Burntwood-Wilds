# Next update: Cow Queen finale — approved direction and review

Planning only. No gameplay changes, version bump or publication authorised by this document.
Reviewed 23 October 2026 against main 0bb723c57afccc3150ed708677013bf4783ad272.

## Approved direction

The Cow Queen cursed Burntwood; saving the town means defeating her.
Final encounter at Chase Terrace Park, separate from the existing Elder Lane park area.
Use selected concept 3 (Cursed Queen): large female cow, glasses, hair in a bun.
Translate her into the existing simple Canvas artwork and check the actual phone-size sprite before integration; no broad graphics overhaul.

After freeing all five existing areas, retain the journey build and unlock the final confrontation.
Before entering, offer a final chance to spend gold, arrange charms and heal.

Mimi introduction:
“Five places freed… but the curse hasn’t broken. She’s waiting at Chase Terrace Park. Everything you’ve gathered has brought you to this. Make it count.”

Queen introduction:
“You’ve been interfering with my control. Freeing my guardians. Bringing hope back to MY town.”
“I should have dealt with you when you first grew whiskers.”
“Now… I’ll teach you your place.”

Three phases:
1. Heavy hoof shockwaves and a clearly telegraphed charge, with a punishable crash.
2. At two-thirds health, cursed roots partition the arena and bounded followers increase pressure. Breaking roots opens routes and briefly weakens her.
3. Below one-third health, faster charge/shockwave/marked curse-strike combinations, with recovery windows.

Hard and rewarding; the accumulated build should matter. Avoid unavoidable hits, endless adds and excessive health.
Rewards: 10 essence for the first Queen victory; 5 on subsequent victories.
Permanent Cursebreaker crown beside the winning character and a real town-restoration ending.
Mimi victory line: “You broke the curse! Finally… now Jodie might stop eating my food.”

Also retain NEXT_ZAK_SHOP_ONLY.md: Zak remains a 10-essence shop purchase and loses his trapped/rescue scene; retain Evie's rescue. No live change yet.
User playtested 10.37 and reported it otherwise seemed good.

## Findings that must shape implementation

- world/reward-flow.js currently calls finish(true,true) after the fifth area.
- world/hub.js currently declares BURNTWOOD IS SAVED, breaks the spell, mentions human form and renders the final summary at five areas.
- upgrades/permanent.js currently unlocks Mimi when the fifth area is awarded. recruitment copy also equates five areas with breaking the Queen's curse.
- ui/journey-recovery.js recognises only existing arena identifiers and hub/area/intro/cleared modes; it has no final encounter state. Do not simply change every five to six.
- Normal area entry resets area-specific state. Preserve earned upgrades, charms, gold and journey identity for the Queen.
- Permanent essence awarding currently marks the run award before confirming the permanent write. A later journey checkpoint can survive independently. Resolve reward/save consistency before adding the larger Queen payout; AREA SAVED must not imply a failed permanent reward is safe.
- The existing completion hook needs checking on the new terminal victory path so RUN records exactly one win, rather than area completion or dialogue opening.

## Suggested additions — not approved implementation

1. A clear hub objective after area five: Confront the Cow Queen at Chase Terrace Park. Before that, show how many guardians remain.
2. Brief Queen interference/dialogue after selected earlier bosses so the final confrontation pays off the curse story. Keep dialogue short, skippable and out of combat controls.
3. Save a dedicated final-arena entry checkpoint including the current build. App interruption should resume predictably without duplicating rewards or rerolling loot. Decide death/retry rules separately; do not silently add unlimited free retries.
4. Telegraph every attack using shape/motion as well as colour. Keep safe routes visible under phone controls; guarantee recovery windows and cap followers/roots.
5. Test all 13 heroes, especially slow Ricky, close-range heroes, walls, summons, returning projectiles and boss-resistant freeze/slow interactions. No mandatory hero or exact charm combination.
6. An attack cue followed by a short music drop, distinct phase changes and a victory music transition; respect Effects/Music mute.
7. A short restoration sequence showing the curse lifting from Burntwood, then rewards and crown. Preserve existing unlocked heroes, including previously earned Mimi.
8. Include focused saving/reward reliability work and terminal win tracking before cosmetic extras.

## Verification performed

No source changes were made.
All six focused Node suites passed:
- feedback-1037-test.cjs
- ricky-test.cjs
- reward-flow-test.cjs
- journey-recovery-test.cjs
- story-rescues-test.cjs
- signature-builds-test.cjs

Latest main workflow 39987600962: browser, curse-review and changed-review jobs all completed successfully.
Existing tests cover current five-area behaviour; passing them is not proof of the future Queen battle's balance or mobile layout.
New Queen implementation will require targeted phase, recovery, save-failure, reward-once, migration, win-event and mobile control checks plus human playtesting.
