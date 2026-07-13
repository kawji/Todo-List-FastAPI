---

## 🛠️ Getting Started & Local Setup

Follow these steps to set up the project locally and connect it to your **Supabase** database.

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.10 or higher)
- A **Supabase** account and project

---

### 1. Database Setup (Supabase)
1. Go to [Supabase](https://supabase.com) and create a new project.
2. In your Supabase dashboard, navigate to **Project Settings** > **Database**.
3. Under **Connection string**, copy the **URI** (Make sure to replace `[YOUR-PASSWORD]` with your actual database password).

---

### 2. Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the root of the **backend** directory:
   ```env
   DATABASE_URL=postgresql+psycopg2://postgres.[your-project-ref]:[your-password]@://supabase.com
   ```
   *(Note: Adjust the driver name like `postgresql+psycopg2` or `postgresql+asyncpg` based on your SQLAlchemy setup).*

5. Run database migrations (if using Alembic):
   ```bash
   alembic upgrade head
   ```
   *Alternatively, if your app runs `Base.metadata.create_all(bind=engine)` on startup, you can skip this.*

6. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend API will be available at `http://localhost:8000`. You can view the API documentation at `http://localhost:8000/docs`.

---

### 3. Frontend Setup (Next.js)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root of the **frontend** directory to point to your FastAPI backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open `http://localhost:3000` in your browser to see the application running.

---

### 🧪 How to Test the Full-Stack Application
1. **Verify Backend Connection:** Open `http://localhost:8000/docs` and use the **POST** `/todos` endpoint to create a test todo item.
2. **Check Supabase:** Go to your Supabase Table Editor to confirm the item was successfully written to your PostgreSQL database.
3. **Test UI Workflow:** Open `http://localhost:3000`, try adding, completing, and deleting tasks. The UI should instantly reflect changes made in the Supabase database.
