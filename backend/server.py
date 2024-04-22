from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pymongo
import jwt  # Import the jwt module
from config import SECRET_KEY  # Import the SECRET_KEY from config.py

# MongoDB connection for user credentials
user_client = pymongo.MongoClient("mongodb://localhost:27017/")
user_db = user_client["LoginCreds"]
user_collection = user_db["users"]

# MongoDB connection for feedback data
feedback_client = pymongo.MongoClient("mongodb://localhost:27017/")
feedback_db = feedback_client["Feedback"]
feedback_collection = feedback_db["CE_23-24"]

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# API Endpoint: Login
@app.route('/api/login', methods=['POST'])
def login():
    # Get login credentials from the request
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Check if user exists in the database
    user = user_collection.find_one({'email': email, 'password': password})
    
    if user:
        # Return success response with user data and token
        user_data = {
            'email': user['email'],
            'access': user['access_level']
        }
        return jsonify({'success': True, 'user': user_data, 'token': 'dummy_token'}), 200
    else:
        # Return error response
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

# API Endpoint: Verify Token
@app.route('/api/verify-token', methods=['POST'])
def verify_token():
    token = request.get_json().get('token')
    try:
        # Verify token
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        # Token is valid
        response = jsonify({'valid': True})
        return response, 200
    except jwt.ExpiredSignatureError:
        # Token has expired
        response = jsonify({'valid': False, 'error': 'Token has expired'})
        return response, 401
    except jwt.InvalidTokenError:
        # Invalid token
        response = jsonify({'valid': False, 'error': 'Invalid token'})
        return response, 401


# API Endpoint: Fetch All Feedback
@app.route('/api/feedback-data')
def get_feedback_data():
    all_feedback = list(feedback_collection.find())
    return jsonify(all_feedback) 

# If this is your main file to run the server
if __name__ == '__main__':
    app.run(debug=True)
