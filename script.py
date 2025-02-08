from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

app = Flask(__name__)

# Securely provide API key (Never expose in frontend directly!)
@app.route("/get-api-key", methods=["GET"])
def get_api_key():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return jsonify({"error": "API key not found"}), 500
    return jsonify({"api_key": api_key})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)

