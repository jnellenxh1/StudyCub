from flask import Flask, jsonify
from flask_cors import CORS
import requests
import subprocess

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

subprocess.Popen(["anki"])  # Start Anki if it's not running

def invoke(action, params={}):
    """Communicates with AnkiConnect API"""
    request_json = {
        "action": action,
        "version": 6,
        "params": params
    }
    response = requests.post("http://127.0.0.1:8765", json=request_json)
    return response.json()

@app.route('/flashcards', methods=['GET'])
def get_flashcards():
    """Fetch flashcards from Anki"""
    notes = invoke("findNotes", {"query": "deck:Default"})
    
    if "error" in notes and notes["error"]:
        return jsonify({"error": notes["error"]})

    flashcards = []
    
    for note_id in notes["result"]:
        note_info = invoke("notesInfo", {"notes": [note_id]})
        if note_info["result"]:
            fields = note_info["result"][0]["fields"]
            flashcards.append({
                "front": fields["Front"]["value"],
                "back": fields["Back"]["value"]
            })

    return jsonify(flashcards)

if __name__ == '__main__':
    app.run(debug=True)
