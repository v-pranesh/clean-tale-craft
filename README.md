# **📖 Clean Tale Craft - AI Story Generator**  

A **random story generator** powered by **React (Vite + TypeScript)** for the frontend and **Python (Flask + Transformers)** for AI-powered story creation.  

---

## **✨ Key Features**  
- **AI-Generated Stories**: Uses NLP models to create unique, random stories.  
- **Customizable Prompts**: Influence story genres, characters, and themes.  
- **Responsive UI**: Built with **Tailwind CSS** for a clean, modern design.  
- **Fast & Scalable**: Vite for quick development, Flask for backend logic.  

---

## **🚀 How to Run the Project**  

### **1️⃣ Clone & Setup**  
```bash
git clone https://github.com/v-pranesh/clean-tale-craft.git
cd clean-tale-craft
```

### **2️⃣ Install Dependencies**  
#### **Frontend (React App)**  
```bash
cd client
npm install
```

#### **Backend (Python AI Server)**  
```bash
cd ../server
pip install -r requirements.txt  # Installs Flask + HuggingFace Transformers
```

### **3️⃣ Configure Environment**  
- **For React**: Create `.env` in `/client`:  
  ```env
  VITE_FLASK_URL=http://localhost:5000  # Backend API URL
  ```
- **For Flask**: Create `.env` in `/server`:  
  ```env
  SECRET_KEY=your_random_key_ # Optional for sessions
  ```

### **4️⃣ Run the App**  
#### **Start AI Backend (Flask)**  
*(In `/server`)*  
```bash
python app.py
```
↳ **API runs at:** `http://localhost:5000`  

#### **Start React Frontend**  
*(In `/client`)*  
```bash
npm run dev
```
↳ **App runs at:** `http://localhost:5173`  

---

## **📜 How It Works**  
1. **User Input**: Select genre/theme (e.g., Fantasy, Sci-Fi).  
2. **AI Processing**: Python backend uses **HuggingFace Transformers** to generate stories.  
3. **Display**: React frontend renders the AI-generated story dynamically.  

---

## **🛠 Troubleshooting**  
| Issue | Fix |
|-------|-----|
| `npm install` fails | Run `rm -rf node_modules package-lock.json` then retry |
| Flask server errors | Ensure Python ≥3.8 & run `pip install --upgrade -r requirements.txt` |
| API connection fails | Check `.env` files and CORS settings in `app.py` |

---

## **🌍 Deployment Options**  
- **Vercel/Netlify**: Deploy frontend (React) statically.  
- **Render/Railway**: Host Flask backend.  
- **Lovable.dev**: One-click publish via [Lovable Dashboard](https://lovable.dev).  

---

**Enjoy generating random stories!** 🎭📖  
Let me know if you need help. 🚀
