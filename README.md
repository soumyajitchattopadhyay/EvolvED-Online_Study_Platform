# EvolvED-Online_Study_Platform
# 📚 Scalable Tutoring & Collaboration Platform

A full-stack web application built to support virtual learning environments, enabling seamless collaboration between students, tutors, and admins. Developed using modern frameworks and best practices in authentication, API integration, and scalable design.

---

## 🚀 Features

- 🔒 **JWT Authentication & RBAC**  
  Secure login and user access control based on roles (Admin, Tutor, Student) using JSON Web Tokens (JWT) and Role-Based Access Control.

- 🎥 **Zoom API Integration**  
  Tutors and Admins can schedule and manage **recurring Zoom meetings** directly from the platform.

- 💬 **Dynamic Study Groups & Forums**  
  Students can create and participate in study groups and discussion threads with **moderation tools** for a safe, structured environment.

- 📱 **Responsive UI**  
  Built with **React.js** and **Bootstrap**, optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Bootstrap  
- **Backend:** Django REST Framework (DRF)  
- **Database:** PostgreSQL  
- **Auth:** JWT (JSON Web Tokens)  
- **API Integration:** Zoom API  
- **ORM:** Django ORM

---

## 🧪 Setup Instructions

1. **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   
---
