# Burntwood town — 10.4.0

## Approved and implemented scope
- Unselected heroes occupy fixed, recognisable town positions. Existing approved playable renderers are reused; portraits are unchanged.
- Jackson by rugby, Ava at the garden, Stefan at the workshop corner, Jodie at cottage lane, Evie by Chasewater, Zak at Sankeys Corner. Small idle details for Jackson/Ava/Evie. Conversation systems remain future work.
- Mimi runs the existing shop for every playable hero except Mimi. When Mimi is selected, Jodie covers the shop and is omitted from her normal resident position. Selected hero never appears as a resident.
- Mimi greeting: “Okay human, you’re in my world now. Allow me to help you.”
- Jodie greeting when Mimi is selected: “Heyy Mimiiii… How can I help you save us all?”
- Tapping the shop or keeper opens the unchanged inventory/fusion system with the greeting visible above it. The nearby Talk action remains available.
- Gates are visually replaced by the actual four boss sprites. Tap a visible boss to enter its existing arena; nearby Challenge action remains available. Cleared bosses fade and cannot be challenged again within that run.
- Boss previews are pure display objects. They do not spawn combat enemies, attack, grant rewards or set bossSpawned. Actual final bosses still spawn at 2:00 in combat; heroic encounters remain at 1:00.

## Isolation
world/residents.js owns roster, town-only rendering and world-pointer hit tests. The player and selected character are restored with try/finally around reused renderers. Mimi uses her existing pure sprite renderer. Jodie's named Mimi companion is omitted only from hub rendering while Mimi is the distinct shopkeeper; combat companion behaviour is unchanged. No character module or arena combat code is changed.

Touch taps convert viewport coordinates through the current camera/scale. Drags, cancelled pointers, nonprimary touches, empty-ground taps, double taps during arena entry and taps outside the hub cannot trigger another entry. Existing joystick/actions remain available.

## Deferred design — do not implement without a future request
Opening scene: a spell turns Burntwood humans into cats; Mimi guides their escape. Future unselected-character conversations/services. Gold escape token for completing all levels; boss essence for future-run upgrades or a starting charm. Resource costs, unlock rules, exact full-route completion and cinematic details are not locked. No persistent progression, new currency, opening scene or town-building overhaul is included in 10.4.0.

## Verification
Seven roster/host combinations, exact dialogue, unique identities, renderer state restoration, purchases, all four boss taps and cleared/double-tap guards in test.cjs. Browser coverage taps actual canvas coordinates on mobile for both hosts and four bosses, screenshots shop dialogues, town residents and entrances. Existing full gameplay/charms regression remains required by CI.
