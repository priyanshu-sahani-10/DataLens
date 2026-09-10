# 🚀 DataLens AI

<div align="center">

<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi" />
<img src="https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/Python-3.12-yellow?style=for-the-badge&logo=python" />
<img src="https://img.shields.io/badge/Pandas-Data%20Analysis-150458?style=for-the-badge&logo=pandas" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

### 📊 Intelligent CSV Data Analysis Platform

*Upload your dataset → Get automated EDA → Visualize insights → Make better decisions*

</div>

---

## 📖 Overview

**DataLens AI** is a modern web-based platform that transforms raw CSV datasets into interactive dashboards, statistical reports, and actionable insights.

Instead of manually writing exploratory data analysis (EDA) code, users can simply upload a dataset and receive comprehensive analysis within seconds.

The platform is designed for:

- 🎓 Students
- 📈 Data Analysts
- 💼 Business Analysts
- 👨‍💻 Developers
- 🚀 Startups

---

# ✨ Features

## 📤 Dataset Upload

- Upload CSV datasets
- File validation
- Secure authenticated uploads
- Large dataset support

---

## 📊 Dataset Overview

- Number of rows
- Number of columns
- Column names
- Data types
- Missing values
- Duplicate rows

---

## 📈 Data Quality Analysis

- Missing value count
- Missing percentage
- Duplicate detection
- Dataset completeness

---

## 📉 Numerical Analysis

For every numeric column:

- Mean
- Median
- Standard Deviation
- Minimum
- Maximum
- Distribution
- Skewness

---

## 📑 Categorical Analysis

- Value counts
- Cardinality
- Top categories
- Frequency percentage

---

## 🔥 Outlier Detection

Automatically identifies outliers using statistical methods.

---

## 🔗 Correlation Analysis

- Correlation Matrix
- Strong Feature Relationships
- Heatmaps
- Scatter Plots

---

## 📊 Interactive Charts

Includes:

- Histograms
- Bar Charts
- Scatter Plots
- Heatmaps
- Box Plots
- Feature Importance Charts

---

## 🧠 Smart Insights Engine

Automatically generates insights such as:

- Highly correlated features
- Columns with excessive missing values
- Skewed distributions
- Outlier-heavy columns
- Data quality warnings

---

## 🔐 Authentication

- User Registration
- Login
- JWT Authentication
- Protected Routes
- Password Hashing

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- Shadcn UI
- Recharts
- Axios

---

## Backend

- FastAPI
- SQLAlchemy 2.0
- PostgreSQL
- Pydantic
- JWT Authentication

---

## Data Processing

- Pandas
- NumPy

---

# 📂 Project Structure

```
DataLens-AI/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── public/
│
├── backend/
│   ├── app/
│   │
│   ├── api/
│   ├── analyzers/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/datalens-ai.git

cd datalens-ai
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Configure Environment

Create a `.env` file

```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost/datalens

JWT_SECRET_KEY=your_secret_key

JWT_ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## 4. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

## 5. Frontend Setup

```bash
cd frontend

npm install
```

Run

```bash
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/auth/signup` | Register User |
| POST | `/api/v1/auth/login` | Login User |
| GET | `/api/v1/auth/me` | Current User |

---

## Dataset Analysis

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/analysis/upload` | Upload CSV |
| GET | `/api/v1/dataset/{id}/overview` | Dataset Overview |
| GET | `/api/v1/dataset/{id}/missing` | Missing Values |
| GET | `/api/v1/dataset/{id}/correlation` | Correlation Analysis |
| GET | `/api/v1/dataset/{id}/insights` | Generated Insights |

---

# 📸 Application Workflow

```text
User Login
      │
      ▼
Upload CSV Dataset
      │
      ▼
Dataset Validation
      │
      ▼
EDA Processing
      │
      ▼
Statistical Analysis
      │
      ▼
Visualization Generation
      │
      ▼
Smart Insights
      │
      ▼
Interactive Dashboard
```

---

# 📊 Analysis Pipeline

The backend automatically performs:

- Dataset Overview
- Data Quality Analysis
- Basic Summary
- Numerical Statistics
- Categorical Statistics
- Distribution Analysis
- Outlier Detection
- Correlation Analysis
- Feature Importance
- Trend Analysis
- Insight Generation
- Chart Data Preparation

---

# 🔮 Roadmap

### Phase 1 (Current)

- ✅ Authentication
- ✅ CSV Upload
- ✅ Automated EDA
- ✅ Interactive Dashboard
- ✅ Visualizations
- ✅ Smart Insights

---

### Phase 2

- AI-powered Dataset Chat
- Natural Language Queries
- Automated Data Cleaning
- Export Reports (PDF)
- Saved Analysis History
- User Dashboard

---

### Phase 3

- AutoML
- Predictive Analytics
- Team Collaboration
- Google Sheets Integration
- Database Connections
- Cloud Storage

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Sadiq Ali**

B.Tech Student | Full Stack Developer | AI & Machine Learning Enthusiast

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a Star!

**Made with ❤️ using Next.js, FastAPI, and Python**

</div>
