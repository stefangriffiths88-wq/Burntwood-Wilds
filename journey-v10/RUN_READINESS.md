# RUN private testing and release boundaries

Build the maintained source with `python3 journey-v10/build.py`, then run
`python3 journey-v10/package_run.py`. The generated `dist/index.html` and all 24
approved portraits/icons retain relative paths. `release.json` records their
checksums; the ZIP contains only the playable distribution, not private reference
material, source history or previous releases. Keep generated packages out of git.

The RUN CLI can register an existing project and deploy a distribution directory.
Use the registered game's identity; do not accidentally create duplicate titles.
The package script does not authenticate, import, deploy, publish or enter a jam.
Actual RUN-hosted acceptance still requires the owner's signed-in session and a
private deployed test. Use portrait/mobile fit and test host safe-area clearance.

## Storage and recovery

Official RUN runtime documentation says localStorage works per game in published
builds, but can throw in Studio preview or elsewhere. The standalone game therefore
catches storage failures and reports when the journey cannot be saved. Existing
permanent progression and validated backup tools remain separate. Saves are local
to the hosting origin/device: GitHub Pages saves do not automatically transfer to
RUN or another phone. No cloud-sync or SDK integration is claimed.

Stef chose **restart current area** on 19 October 2026. The saved entrance snapshot
retains the previous build, health and gold. Rewards from the interrupted attempt
roll back; completed areas and their committed rewards are retained. A defeated
boss checkpoints safe walkout/treasure, including already-rolled chest choices,
so closing during reward selection does not reroll or duplicate them. Resume is
deliberate and paused. A fresh journey replaces an existing save only after an
explicit confirmation. Corrupt originals are preserved until deliberately replaced.

## Private host acceptance

Verify character art, first-play/replay, combat controls, music gesture/background
handling, text/control safe areas, earned upgrade, chest choice and inventory.
Close/reopen during an area, after boss defeat and after buying/merging; verify
resume, conserved gold/charms and permanent rewards. Test both iPhone and Android
in RUN itself; desktop Chromium checks alone do not establish app compatibility.
Then have unfamiliar players reach Rugby without coaching and watch whether they
return voluntarily. Public release can be labelled early access once these gates
pass. Human balance and retention are not established by automated survival runs.

Jam eligibility is independent: validate project dates and RUN's current rules,
obtain public approval, and explicitly enter through Creator Hub. Packaging or
publishing alone does not enter a competition.

Sources checked 19 October2026:
- https://github.com/series-ai/venus-sdk-docs/blob/main/rundot-developer-platform/runtime-environment.md
- https://github.com/series-ai/rundot-cli-releases
- https://events.run.world/events/octoberjam/
