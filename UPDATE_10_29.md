# 10.29 implementation checklist

Base: main 14c4bdb6b1a5a8b17f03745acde6a59bbc6f19d3. Branch feature/elder-lane-10-29.

- Town: remove duplicate direction boards; retain destination names; show service information nearby; compact objectives and lower-screen coach.
- Guardian Bell: matching shield silhouettes on hero and health orb.
- Rugby: horizontal entrance plaque.
- Joseph: exterior collision-safe Overhype impacts; rank3/5 dash recovery with matching descriptions.
- Burntwood Park: Elder Lane entrance, southern gardens/woodland, central play/bike area, northern field; staged finite encounters, guard, recovery and Bramble Beast.
- Roster: six initial heroes (Jackson, Ava, Mimi, Joseph, Jodie, Evie). Boss unlocks: Rugby/Tom, Chasewater/Zak, Quarry/Stefan, Sankeys/Harvey, Park/Havannah. Five-area journey/Immy. Legacy earned access retained.
- RUN: replace thumbnail with approved Rugby Strike artwork; retain existing SDK/tracking/game ID and deployment credentials.

Local targeted contracts passed: twelve-hero Park route/guard/recovery/boss/exit; real Bruce exterior contact at30/60/120Hz with ten impacts; Joseph dash healing and Last Light lock; Bell shield consumption/HUD; six starters and all earned/migrated unlocks. Retained mechanics checks passed. PR92 source c15a65f6fd3220a6c684b9eaf25a87073d691b4e; CI39587078646 and RUN package39587078661 running. Pending: phone screenshot review, required CI, verified Pages and RUN releases. No candidate is deployed yet. Current production GitHub10.28; RUN10.25/platform1.0.4.

Phone review corrected missing replay control after roster-copy change and stable native details/open serialization. Portrait gameplay screenshots reviewed; compact coach raised clear of the health orb, landscape Help kept accessible. Park route roots now target the actual player position with committed warnings; static-player damage contract added. Joseph anchored ricochets visibly recoil between hits; all ten impacts remain bounded. CI followups must use the final matching RUN package hash.
