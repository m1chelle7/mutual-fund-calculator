from app import create_app
from flask_cors import CORS

app = create_app()
CORS(app, origins=["http://localhost:3001"])

if __name__ == "__main__":
    app.run(debug=True)
