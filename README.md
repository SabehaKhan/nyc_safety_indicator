# PROJECT SET UP INSTRUCTIONS
```bash
# Clone the repository
git clone <repository-url>
cd NYC-Safety-Indicator
```

```bash
# Set up the backend
cd backend
python -m venv venv #create virtual env
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

```bash
# Set up the frontend
cd ../frontend
npm install
npm start
```
