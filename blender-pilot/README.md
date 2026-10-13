# Burntwoods Wilds Blender character pilot

Jackson is a scripted 3D cat model. The model, camera, materials and poses are recreated by `jackson.py`; no paid generation service is required.

Render with Blender 4.0:

```sh
blender -b --python blender-pilot/jackson.py -- --out blender-pilot/renders
python blender-pilot/build_pilot.py
```

The renderer exports eight directions, six poses and eight states. The packer creates one 1024 by 6144 transparent WebP atlas embedded in `wilds-v9-1-blender-pilot.html`. The game uses source rectangles from the shared image instead of allocating a canvas for every Jackson frame. Existing art remains the fallback while the atlas loads. Gameplay and save compatibility are inherited from V9.0.

The generated `.blend` file is a local editing convenience; the authoritative reusable model is the Python script. Animation currently uses parented parts, not a skeletal rig. This pilot upgrades Jackson only.
