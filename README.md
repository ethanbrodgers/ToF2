# Tongue of Fire 2

**The personalized language learning platform built on AI and your learning style.**

Tongue of Fire 2 (ToF2) is the sequel to [Tongue of Fire](https://tongueoffire.net)—a language learning site inspired by Pentecost, the biblical event of supernatural language learning. ToF2 amplifies the core principle that made its predecessor compelling: **radical personalizability**.

Unlike one-size-fits-all language apps, ToF2 puts *you* in control. Whether you learn through immersion, deep grammar study, or conversation with AI characters, ToF2 adapts to your learning paradigm, not the other way around.

---

## Key Features

### Track What Matters to You
- **Vocabulary Words** — build custom word lists at your own pace
- **Grammar Rules** — learn the mechanics that make speech correct
- **Style Norms** — master the subtleties that make speech natural

Pick them yourself, save them as they emerge, or let AI generate curated lists based on your preferences.

### Learning Paradigms
- **Flashcards & Drills** — traditional rote memorization for core material
- **Practice Passages** — AI-generated content tailored to your level and interests
- **Real-World Texts** — import book pages, YouTube transcripts, articles, and more
- **Interpreter Mode** — facilitate conversation between two AI characters (one English, one target language) by translating between them

### AI-Powered Tools
- Chat with AI about passages to dive as deep as you want
- Auto-generate vocabulary, grammar, and style lists
- Create translation questions from any text
- Adapt any feature to your learning style

---

## Getting Started

### Prerequisites

You'll need:
- **Python 3.8+** (recommended: use Anaconda for easy setup)
- **Node.js 16+** (for the frontend)
- **MongoDB Atlas** account (free tier works great) or local MongoDB instance
- **Git**

### Installation

#### 1. Clone the Repository
```bash
git clone <repo-url>
cd tof2
```

#### 2. Set Up the Backend

**Option A: Using Anaconda (Recommended)**
```bash
# Create a Python virtual environment
conda create -n tof2 python=3.10
conda activate tof2

# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt
```

**Option B: Using venv**
```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 3. Configure MongoDB

**Get your MongoDB connection string:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" and copy your connection string
4. It should look like: `mongodb+srv://username:password@cluster.mongodb.net/?appName=...`

**Create a `.env` file in the `backend/` folder:**
```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?appName=tof2
PORT=5000
```

**Important:** Never commit `.env` to git (it's already in `.gitignore`).

#### 4. Set Up the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend will typically start at `http://localhost:5173`.

#### 5. Run the Backend

```bash
cd backend
python app.py
```

The backend will start at `http://localhost:5000`.

---

## Project Structure

```
tof2/
├── backend/
│   ├── app.py              # Main Flask server
│   ├── connect.py          # Database utilities
│   ├── requirements.txt    # Python dependencies
│   └── .env               # (gitignored) MongoDB connection
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── data/           # Hardcoded data & API calls
│   │   └── assets/         # Images, icons, etc.
│   ├── package.json        # Node dependencies
│   ├── tsconfig.json       # TypeScript config
│   └── vite.config.js      # Vite build config
│
└── readme.md              # You are here!
```

---

## Development

### Backend
- **Framework:** Flask
- **Database:** MongoDB
- **Language:** Python

Start the server:
```bash
cd backend
python app.py
```

The Flask dev server supports hot-reload when you edit `app.py`.

### Frontend
- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS

Start the dev server:
```bash
cd frontend
npm run dev
```

Vite provides instant HMR (Hot Module Replacement) as you edit components.

---

## API Endpoints (Current)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Health check |
| `/greet` | POST | Test endpoint (expects JSON body with `name`) |
| `/greet/<name>` | GET | Test endpoint with URL parameter |
| `/vocab` | GET | Fetch vocabulary (all or by `en` query param) |

More endpoints coming soon!

---

## The Philosophy Behind ToF2

**Personalizability is the goal.** You shouldn't be forced into a single learning path. Whether you're:
- A visual learner who thrives on immersion
- A grammar perfectionist who needs rules clearly stated
- A conversationalist who learns by doing
- A mix of all three

...ToF2 has tools for you. The platform provides features, not a fixed curriculum. You choose your adventure.

---

## Contributing

This is an active learning project. Feel free to:
- Report bugs or missing features
- Suggest UI/UX improvements
- Contribute code (see development section above)

---

## License

(Add your license here — MIT, GPL, etc.)

---

## Questions?

Check out the [original Tongue of Fire](https://tongueoffire.net) for context, or open an issue on this repo.

Happy learning!
