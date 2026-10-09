import json, pathlib, os, contextlib, io
os.environ["MPLBACKEND"] = "Agg"
root = pathlib.Path(__file__).resolve().parents[1]
lessons = json.loads((root / "data.js").read_text(encoding="utf-8").split(" = ",1)[1].rstrip(";\n"))
scope = {"display": lambda obj: None}
for lesson in lessons:
    with contextlib.redirect_stdout(io.StringIO()):
        exec(compile(lesson["code"], f"question_{lesson['id']}", "exec"), scope)
    if "plt" in scope:
        scope["plt"].close("all")
    print(f"Q{lesson['id']:02} OK")
for name in ["mse_essai","a","b","mse_train","mae","rmse","mae_reference","r2"]:
    print(name, scope[name])
assert len(lessons)==24
assert scope["mse_train"] < scope["mse_essai"]
assert scope["mae"] < scope["mae_reference"]
assert scope["rmse"] >= scope["mae"]
assert scope["sst"] > 0
assert set(scope["train"].index).isdisjoint(scope["test"].index)
assert (scope["residus_test"] > 0).all()
assert scope["r2"] > .95
nb=json.loads((root / "TP1_Regression_Lineaire.ipynb").read_text(encoding="utf-8"))
assert nb["nbformat"]==4
assert sum(c["cell_type"]=="code" for c in nb["cells"])==24
try:
    import nbformat
    nbformat.validate(nb)
    print("Notebook schema validated")
except ImportError:
    print("Notebook JSON checked; nbformat unavailable")
print("All Python examples and numerical invariants passed.")
