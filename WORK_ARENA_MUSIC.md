# Arena music — approved development, 22 October 2026

Stef accepted the three original music sketches, requested variety by arena and faster tempo for bosses. This session owns audio implementation only. Test first; no RUN publication or production replacement. Other pending voting work remains PR98, separate and unmerged. Essence/ad/shop proposals are not implemented.

Base main: d726ee3137718cebf39a40e0ae8b7c347625ffcf (verified remote, PR98 only open). Branch: feature/arena-music-10-34. Source checkpoint is the branch head containing this file.

`journey-v10/ui/audio.js` owns five distinct original procedural arrangements, using the approved sketches as the direction: Rugby Rush144BPM, Chasewater136, Quarry132, Burntwood Park152, Chase Terrace148. Minor-key bass, percussion and varied lead/chord patterns replace the shared gentle combat arpeggio. Bosses retain their area's identity and ramp to20% faster with extra percussion. Victory resolves briefly before the existing calm town motif; cleared treasure/return remain calm. Existing quiet-story moments are retained. Town, audio preferences and effects retained.

No recordings/downloads, extra external assets or combat-RNG use. Phrase buses fade/retire on transitions; sources disconnect on ending. Music mute/background/pause stops scheduling, percussion buffer is cached. No gameplay timers or enemy/hero values are modified.

Next: run focused audio lifecycle contracts and actual browser graph/offline render/production state transitions; package isolated `burntwood-preview-music.html` with separate saves. Publish only this test HTML and evidence, not canonical/latest or RUN. Native iPhone musical taste/mix/battery acceptance remains Stef's playtest. No audio claim derives from silent VM alone.
