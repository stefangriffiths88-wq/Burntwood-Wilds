# Jam voting button · 22 October 2026

User entered the October Jam and requested a voting link inside the game like the Monster Attack screenshot. Scope: native-style Vote for us link in main menu and victory panels; direct public jam destination highlights existing game oeJYyzlGHanZwYoRldTS. No vote is cast automatically and no reward is offered for voting. The separate essence/advert proposal remains unimplemented.

Candidate10.33.1 is on feature/jam-vote-10-33-1 from verified main0976c1e973d649339d847ea46c52c92045f99156. Maintained source ui/jam-vote.js, build.py, menu.css, controls.js and manifest. Boss, damage, rewards, progression and approved art are unchanged. Source stays separate until phone verification and user testing; RUN remains10.33.0 / platform1.0.7. No new RUN upload is authorised by this development checkpoint.

Standalone/web link opens the public voting page in a new tab. Where a RUN API exposing navigateToRunPage is present, use that supported internal routing method; save the current safe checkpoint before navigation. Unsupported native hosts may restrict external links; the preserved RUN SDK predates this method, so actual native acceptance remains pending. SDK rejection produces an inline recovery message and never attempts top-frame navigation or forced popups.

Focused browser verification: actual menu link navigation (destination mocked), real boss defeat→town→victory button, correct game highlight, saved hub checkpoint before native routing, reward conservation, rejected routing and three phone sizes including reduced motion. Pending CI/screens. Native RUN/iPhone Safari and actual voting-page acceptance are separate from these checks. Next: inspect phone artifacts, fix fit if necessary, publish only the test file for user review.
