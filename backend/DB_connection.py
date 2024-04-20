from flask import Flask, jsonify
import pymongo

# MongoDB connection (Reuse your existing code)
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["Feedback"]
collection = db["CE_23-24"]

# Initialize Flask App
app = Flask(__name__)

# API Endpoint: Fetch All Feedback
@app.route('/api/feedback-data')
def get_feedback_data():
    all_feedback = list(collection.find())
    return jsonify(all_feedback) 


# If this is your main file to run the server
if __name__ == '__main__':
    app.run(debug=True) 
