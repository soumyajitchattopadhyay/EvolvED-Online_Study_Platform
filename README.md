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
```
project-root/
├── EvolvEDStudy/     # EvolvED platform main folder
├── discussions/      # Discussions module
├── frontend/         # React Frontend Code
├── groups/           # Groups module
├── meetings/         # Meetings module
├── staticfiles/      # Static files (CSS, JS, images)
├── users/            # User management module
├── LICENSE           # License file
├── README.md         # This README file
├── manage.py         # Django management script
└── requirements.txt  # Python dependencies
```
---

## ⚙️ **Backend Setup (Django)**

### Step 1: Environment Setup

```bash
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
```
### Step 2: Apply Migrations & Run Server
Make sure your terminal is pointed at the root directory where `manage.py` is located before running these commands.
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
Backend will run at:
👉 http://127.0.0.1:8000/

🌐 Frontend Setup (React.js)
Step 1: Navigate to Frontend
```bash

cd frontend
npm install
```
Step 2: Start the React Dev Server

```bash
npm start
```
Frontend will run at:
👉 http://localhost:3000/

🔐 Authentication & Roles
JWT-based login system

Secure token storage

Role-based rendering and route protection

Admin panel access for moderators

| 📚 Core Modules | Description                                       |
| --------------- | ------------------------------------------------- |
| Auth            | JWT login, registration, and role assignment      |
| Zoom            | Schedule/manage recurring meetings via Zoom API   |
| Groups          | Create/join study groups with real-time updates   |
| Forums          | Threaded discussions with report/moderation tools |

🧪 **Testing & Evaluation**

- ✅ Manual & automated testing for core features  
- 📊 Performance tested under mock load  
- 🔐 Secure token flow and database constraints validation  
- 🧠 Usability tests with student testers (informal)  

✅ **Key Wins**

- 🔄 Smooth integration of third-party APIs (Zoom)  
- 🔐 Secure and scalable auth architecture  
- 💬 Collaborative tools built with real-world classroom needs in mind  
- 📱 Fully responsive across devices  
- 🧹 Stopping & Cleanup

```bash
# Stop servers
CTRL + C  # for both Django and React
# Deactivate virtual environment
deactivate
```
🔥 Troubleshooting
| Issue                | Solution                                                       |
| -------------------- | -------------------------------------------------------------- |
| Zoom API not working | Check credentials in `.env` and Zoom API rate limits           |
| CORS errors          | Ensure `corsheaders` is installed and middleware is configured |
| Login failing        | Verify JWT settings and user role assignments                  |
| UI layout broken     | Check Bootstrap setup and screen responsiveness                |

🧭 **Future Improvements**

- 📆 Calendar view for upcoming Zoom sessions  
- 📹 Video archive for recorded meetings  
- 📌 Pinning threads and group announcements  
- 🔔 Real-time notifications via WebSockets  
- 📈 Analytics dashboard for tutors and admins

💡 Thanks for checking out EvolvED!
Feel free to fork, contribute, or reach out with questions.
🚀 Built with passion for collaborative learning.
