import json
import requests

def invoke(action, params={}):
    request_json = {
        "action": action,
        "version": 6,
        "params": params
    }
    response = requests.post("http://127.0.0.1:8765", json=request_json)
    return response.json()

# Example: Get a list of all decks
print(invoke("deckNames"))

# Example: Add a flashcard
invoke("addNote", {
    "note": {
        "deckName": "Default",
        "modelName": "Basic",
        "fields": {
            "Front": "What is the capital of France?",
            "Back": "Paris"
        },
        "tags": ["geography"],
        "options": {"allowDuplicate": False}
    }
})

def get_flashcards():
    try:
        response = invoke("findNotes", {"query": "deck:Default"})
        if "error" in response and response["error"]:
            print("Error:", response["error"])
        else:
            print("Flashcards:", response["result"])
    except requests.exceptions.RequestException as e:
        print("Failed to connect to Anki:", e)

get_flashcards()
