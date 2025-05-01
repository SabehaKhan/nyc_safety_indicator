import joblib
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')  # Replace 'server' with your project name
django.setup()
# Load the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "random_forest_model.pkl")

def load_model():
    return joblib.load(MODEL_PATH)