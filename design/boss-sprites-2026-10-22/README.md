# Native boss sprite design review — 22 October 2026

**Latest direction: revision two in REVIEW_2.md.** Skinny Umbrella Man wears a dirty untucked shirt; accepted Night Owl stays byte-identical; Rubble Trouble is the proposed comic golem name/design; Loki, a giant husky to save from the Cow Queen, replaces Bramble Beast. `preview-revised.html` contains the current review. Original files and the initial notes below are retained as history, not current direction. Nothing is integrated or published to RUN.

Stef requested improved actual in-game boss looks, explicitly preserving Bruce. Umbrella Man belongs at Sankeys Corner, replacing the Trolley King identity there. This is a visual proposal only; no game integration, map/combat changes, production merge or RUN upload is authorised by this review.

Four native Canvas candidates, using the game's Path2D, gradient, stone, leaf and drawing primitives. Jackson is the exact production sprite for scale. The crop uses worldViewScale(390)=0.7366667; display scales with viewport width. Ready / Attack tell / Strike buttons render discrete state poses, not a claim of implemented gameplay or finished animation. Scene backgrounds are cropped design context: actual Quarry/Sankeys native ground functions and simplified Chasewater/Park scenery, not screenshots of the live game or a new map design.

- Umbrella Man: slim hunched human street figure, long patched coat, visible narrow stubbled face, rubbish bag and battered offset umbrella; canopy rises for the warning pose, closes/tilts for striking. Sankeys Corner only.
- Night Owl: broad ragged feather wings, barn-owl heart face, narrowed amber eyes, hooked beak, talons and a small purple curse scar. Chasewater.
- Big Barry: asymmetrical quarried slabs, much larger hammer fist, embedded red split seam, moss, rusty quarry plate and chain. Quarry.
- Bramble Beast: low four-pawed body, bark muzzle, root claws, fangs, varied leafy thorn mane and small purple cracks. Burntwood Park off Elder Lane.
- Bruce: unchanged; his production source is not included or replaced.

`boss-proposals.js` owns only candidate renderers. `burntwood-boss-looks.html` is the self-contained preview fragment. `preview-shell.html`, `build-preview.py` and `render-review.cjs` are the local review harness; scripts may need the repo source path/runtime dependency root adjusted after materialization. No candidate is in journey-v10/manifest.json.

Validation: Node syntax; real Skia Canvas rendering of all4 bosses ×3 poses; actual Jackson renderer; controls invoke redraw. Twelve PNGs and a four-scene board were rendered and visually inspected locally. No full combat tests needed: gameplay is untouched. Browser/native Safari appearance remains user review. A malformed existing bossLeaf path omits a separator before0 in two quadratic segments; this candidate corrects those separators only in its embedded helper. Production is unchanged; carry the correction into the owned drawing helper if the designs are approved.

Base verified main2ea2496ba8ae16e85d17371ce13cc0736c9518b9. Music remains draftPR99/test link, voting draftPR98/test link; retain both. Source branch design/boss-sprites-2026-10-22 is the recoverable design checkpoint. Next: show the four native gameplay-scale candidates, get visual feedback, then integrate only on explicit update direction.
