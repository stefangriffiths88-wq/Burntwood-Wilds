# 10.29 implementation checklist

Base: main 14c4bdb6b1a5a8b17f03745acde6a59bbc6f19d3. Branch feature/elder-lane-10-29.

- Town: remove duplicate direction boards; retain destination names; show service information nearby; compact objectives and lower-screen coach.
- Guardian Bell: matching shield silhouettes on hero and health orb.
- Rugby: horizontal entrance plaque.
- Joseph: exterior collision-safe Overhype impacts; rank3/5 dash recovery with matching descriptions.
- Burntwood Park: Elder Lane entrance, southern gardens/woodland, central play/bike area, northern field; staged finite encounters, guard, recovery and Bramble Beast.
- Roster: six initial heroes (Jackson, Ava, Mimi, Joseph, Jodie, Evie). Boss unlocks: Rugby/Tom, Chasewater/Zak, Quarry/Stefan, Sankeys/Harvey, Park/Havannah. Five-area journey/Immy. Legacy earned access retained.
- RUN: replace thumbnail with approved Rugby Strike artwork; retain existing SDK/tracking/game ID and deployment credentials.

Release candidate: runtime source77df3c863d2bc7f8e098beac2dd206b5b417ab6c; final fixture commitc420ce5fcfa61c439e296656a54bdc82fc0e3631, PR92. Full gameplay/browser job119184256950 in CI39588609096 passed, including266 hero/charm combinations and21 actual-attack journeys/105 arenas. Final focused CI39590124581 passed both jobs; existing shop/layout fixtures now seed earned access, while dedicated production tests still require six locked heroes. RUN prepare39588829881 passed; artifact12340448581 contains38 reviewed final phone images at390×844,320×568,844×390. All57 changed files match the tested candidate byte for byte.

Pending: exact-head merge, main/Pages verification, explicit RUN publish request, uploaded-version verification and receipt. Current production GitHub10.28; RUN10.25/platform1.0.4. Native iPhone Safari and human balance remain user playtest. No gameplay work remains unsaved.

Phone review corrected missing replay control after roster-copy change and stable native details/open serialization. Portrait gameplay screenshots reviewed; compact coach raised clear of the health orb, landscape Help kept accessible. Park route roots now target the actual player position with committed warnings; static-player damage contract added. Joseph anchored ricochets visibly recoil between hits; all ten impacts remain bounded. CI followups must use the final matching RUN package hash.
