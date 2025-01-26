from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle

csv_file = "borrowers.csv"
df = pd.read_csv(csv_file)
print(df["ID"])

app = Flask(__name__)
CORS(app)

@app.route('/get-risk', methods=['POST'])
def get_risk():
    data = request.json
    user_id = data.get("id")

    if not user_id:
        return jsonify({"error": "ID is required"}), 400
    
    # Simulated database lookup
    user = df[df["ID"] == int(user_id)]


    if user.empty:
        return jsonify({"error": "User ID not found"}), 404
    
    if (user["loan_status"].values == 1):
        risk_level = "Low"
    else:
        risk_level = "High"


    return jsonify({"id": user_id, "riskLevel": risk_level})

if __name__ == '__main__':
    app.run(debug=True)
