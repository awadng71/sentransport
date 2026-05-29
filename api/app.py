import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger les donnees depuis le fichier JSON
with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)

@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport !",
        "endpoints": ["/lignes", "/lignes/<id>"]
    })

@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)

@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )
    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvee"}), 404
    return jsonify(ligne)

with open("arrets.json", "r") as f:
    arrets = json.load(f)

@app.route("/arrets")
def get_arrets():
    return jsonify(arrets)

@app.route("/stats")
def get_stats():
    nombreLignes = len(lignes)
    total_arrets = sum(len(l["listeArrets"]) for l in lignes)
    ligne_plus_arrets = max(lignes, key=lambda l: len(l["listeArrets"]))
    return jsonify({
        "nombre_lignes": nombreLignes,
        "nombre_total_arrets": total_arrets,
        "ligne_plus_arrets": {
            "id": ligne_plus_arrets["id"],
            "nom": ligne_plus_arrets.get("nom", ""),
            "nombre_arrets": len(ligne_plus_arrets["listeArrets"])
        }
    })

@app.route("/lignes/recherche")
def recherche_lignes():
    q = request.args.get("q", "").lower()
    resultats = [
        l for l in lignes
        if q in l.get("depart", "").lower()
        or q in l.get("arrivee", "").lower()
    ]
    return jsonify(resultats)


if __name__ == "__main__":
    app.run(debug=True, port=5000)