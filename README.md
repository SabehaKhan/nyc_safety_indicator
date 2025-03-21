# PROJECT SET UP INSTRUCTIONS
```bash
# Clone the repository
git clone <repository-url>
cd NYC-Safety-Indicator
```

python version: Python 3.9.6
```bash
# Set up the backend
cd backend
python3 -m venv venv #create virtual env
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
```

```bash
# Set up the frontend
cd ../frontend
cd geosafe-hub
npm install
npm run dev
```
