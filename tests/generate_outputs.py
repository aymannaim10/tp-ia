import json, pathlib, os, io, contextlib
os.environ["MPLBACKEND"]="Agg"
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
root=pathlib.Path(__file__).resolve().parents[1]
lessons=json.loads((root/"data.js").read_text(encoding="utf-8").split(" = ",1)[1].rstrip(";\n"))
outdir=root/"figures"
outdir.mkdir(exist_ok=True)
outputs={}
scope={}
for l in lessons:
    tables=[];figures=[]
    def display(obj):
        tables.append(obj.to_html(border=0,classes="result-table"))
    def show():
        name=f"q{l['id']:02}.svg"
        plt.gcf().savefig(outdir/name,format="svg",bbox_inches="tight",metadata={"Date":None,"Creator":"Matplotlib — code du TP exécuté sans modification"})
        figures.append("figures/"+name)
    scope["display"]=display
    plt.show=show
    buf=io.StringIO()
    with contextlib.redirect_stdout(buf):
        exec(compile(l["code"],f"question_{l['id']}","exec"),scope)
    outputs[str(l["id"])]={"stdout":buf.getvalue(),"tables":tables,"figures":figures}
    plt.close("all")
(root/"outputs.js").write_text("window.OUTPUTS = "+json.dumps(outputs,ensure_ascii=False,indent=2)+";\n",encoding="utf-8")
print("24 sorties générées ; figures exactes Q7, Q15 et Q20.")
