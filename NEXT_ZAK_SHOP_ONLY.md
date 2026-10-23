# Next update: Zak is shop-only

Stef’s playtest feedback23 October2026:10.37 feels good, but Zak appears trapped at Chasewater even though freeing him still requires buying him. Explicit direction: keep Zak as an essence purchase.

Agreed next-update behaviour: Zak remains10 essence at Stefan’s workshop, preserving existing owned access. Remove Zak from the Chasewater trapped/rescue scene and its dialogue. Evie remains the rescue for defeating Night Owl. Do not grant Zak for a boss/rescue, refund an existing purchase, or alter other character prices. Harvey is outside this specific correction.

Confirmed source on main0bb723c57afccc3150ed708677013bf4783ad272: world/curse-story.js Chasewater companions includes Zak and intro names both Evie/Zak; ESSENCE_HERO_COSTS already sets zak:10. This is a story-presentation inconsistency, not a missing shop unlock.

This branch records the next update only. No game code, generated build, Pages or RUN publication changed. Next explicit Update: remove Zak’s companion entry, make Evie’s scene text singular, replace the old Evie-owned/Zak-pending fixture in feedback-1037-test.cjs with shop-only coverage; verify fresh/owned saves, Night Owl/Evie rescue and actual10-essence Zak transaction. Test changed story/roster paths proportionally, then release via established Pages/RUN direction.
