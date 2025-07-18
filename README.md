# 🎓 EvolvED – Scalable Learning & Collaboration Platform

A full-stack educational platform enabling **tutors, students, and admins** to collaborate, learn, and manage virtual sessions effectively. Built with **Django REST Framework**, **React.js**, and **PostgreSQL**, EvolvED integrates with the **Zoom API** and features **JWT-based authentication** and **Role-Based Access Control (RBAC)**.

---

## 🛠 Tech Stack & Highlights

- **Frontend (React.js + Bootstrap):** Responsive UI, forum interactions, group creation
- **Backend (Django + DRF):** APIs, secure auth, Zoom scheduling
- **Database:** PostgreSQL
- **Auth & Access:** JWT tokens, Role-Based Access Control (RBAC)
- **API Integration:** Zoom API for virtual class scheduling

---

## 📌 Features

- 🔐 **JWT-based Authentication**  
- 🛂 **Role-Based Access Control (RBAC)** for Admins, Tutors, and Students  
- 🎥 **Zoom Meeting Integration** for recurring session management  
- 🗨️ **Study Groups & Forums** with moderation controls  
- 📱 **Responsive Design** for mobile and desktop users  
- 🔄 **Django ORM** for relational data modeling and queries  

---

## 📁 **Project Structure**

evolved/
├── backend/ # Django Backend Code
├── frontend/ # React Frontend Code
├── .env # Environment Variables
├── .gitignore
├── manage.py
├── package.json
└── README.md

---

## ⚙️ **Backend Setup (Django)**

### Step 1: Environment Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
```
### Step 2: Apply Migrations & Run Server

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
