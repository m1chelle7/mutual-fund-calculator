# Backend Setup and Running Instructions

## Prerequisites

- Python
- pip (Python package installer)

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

3. **Create and activate the virtual environment**:
   - On macOS/Linux:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

4. **Install required dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Backend

1. **Start the backend server**:
   ```bash
   python app.py
   ```

   The server should now be running locally. You can access the APIs and start testing.

## Troubleshooting

- If you encounter any issues related to missing dependencies, make sure your virtual environment is activated and that you've run `pip install -r requirements.txt`.
