import os,base64,json,shutil
from pathlib import Path
from gradio_client import Client,handle_file
out=Path("character-generation/output").resolve()
out.mkdir(parents=True,exist_ok=True)
token=os.environ.get("HF_TOKEN")
if not token:
    raise RuntimeError("HF_TOKEN repository secret is missing")
print("HF_TOKEN is configured; value is never printed",flush=True)
image=out/"jackson-concept.jpg"
image.write_bytes(base64.b64decode(Path("character-generation/jackson-concept.b64").read_text()))
client=Client("https://trellis-community-trellis.hf.space",hf_token=token,verbose=False,download_files=str(out))
client.predict(api_name="/start_session")
info=client.view_api(return_format="dict",print_info=False)
endpoint=info["named_endpoints"]["/generate_and_extract_glb"]
print("Preprocessing approved generated cat concept",flush=True)
p=client.predict(handle_file(str(image)),api_name="/preprocess_image")
values={"image":handle_file(p),"multiimages":[],"seed":11,"ss_guidance_strength":7.5,"ss_sampling_steps":12,"slat_guidance_strength":3.0,"slat_sampling_steps":12,"multiimage_algo":"stochastic","mesh_simplify":.95,"texture_size":1024}
args=[values.get(param["parameter_name"],param.get("parameter_default")) for param in endpoint["parameters"]]
print("Requesting one 3D generation",flush=True)
result=client.submit(*args,api_name="/generate_and_extract_glb").result(timeout=600)
paths=[]
for item in result:
    if isinstance(item,str) and Path(item).is_file():
        paths.append(item)
        if item.endswith(".glb"):
            shutil.copyfile(item,out/"jackson.glb")
        elif item.endswith(".mp4"):
            shutil.copyfile(item,out/"jackson-turntable.mp4")
if not (out/"jackson.glb").is_file():
    raise RuntimeError("Service returned no GLB model")
print("GLB model retrieved successfully",flush=True)
