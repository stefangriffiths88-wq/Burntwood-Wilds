# Voting-link report — 22 October 2026

Owner: current Work session; branch `fix/vote-entry-10-35-1`, based on main62decbaec30d5b9f94a57c4d01266cc51c261e75. Stef explicitly requested fixing the in-game voting link after10.35.0 / RUN1.0.8. No gameplay, art or music changes are authorised by this targeted fix.

## Verified findings

- The initial response blaming the URL was incorrect. `https://run.world/jams/octoberjam?game=oeJYyzlGHanZwYoRldTS` really does highlight and scroll to Burntwood Wilds with its Vote control when opened as a top-level browser page. This was visually verified in the real public RUN site, not a mocked response. The live row links to `https://run.world/wild_creations/burntwood-wilds`, with the current1.0.8 thumbnail and correct creator identity.
- Clicking the actual Vote for us anchor inside the hosted game's nested iframe did not open a tab or navigate. The host iframe's observed sandbox is `allow-scripts allow-same-origin allow-downloads allow-forms allow-presentation allow-orientation-lock`: ordinary popups and top-frame navigation are not granted. Do not weaken or bypass this platform boundary.
- The pinned SDK bundle reports5.29.1, also the current npm stable version during this investigation. The official `@series-inc/rundot-game-sdk@5.29.1` package and its complete NAVIGATION.md document game-to-game and stack/quit navigation, not page/URL/jam navigation. `navigateToRunPage` is absent from the actual SDK. The existing conditional call and its mock were not evidence of a supported working native route.
- The current voting browser test intercepts the destination and supplies a fake `navigateToRunPage`. It proves checkpoint and UI contracts only; it did not prove real RUN navigation. Future acceptance must include an actual tap in the real host and visible correct destination.

## Status / next action

No game source or generated files changed; no release uploaded. Main remains10.35.0 / RUN1.0.8. Direct automatic navigation cannot currently be implemented using a verified supported host API. Do not invent another URL or arbitrary postMessage/RPC request, change iframe permissions, or claim this is fixed.

Ask Stef whether to use an honest Copy voting link fallback (with paste-into-Safari instructions and preserved checkpoint), or keep the game unchanged pending a supported RUN navigation capability. A clipboard fallback is a changed user experience, not automatic navigation. No vote was cast and no sign-in was attempted during investigation.
