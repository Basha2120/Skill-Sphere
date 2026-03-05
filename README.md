# SkillSphere 
**Full-Stack Intelligent Skill & Task Management Platform**

SkillSphere is a robust full-stack learning management application that helps users track skills at a granular topic level and plan daily learning tasks using a date-aware planner. It features a secure Spring Boot backend with JWT authentication and persistent MySQL storage.

---
## Features :

### 🔹 User Authentication & Security
- Secure Login and Registration with JWT (JSON Web Tokens)
- Protected routes and persistent user sessions
- Environment-based secure configuration for production

### 🔹 Skill Management
- Add, edit, and delete skills
- Organize skills by category
- Track progress dynamically based on topic completion
- Inline edit and delete for topics
- Persistent storage in MySQL database

### 🔹 Dashboard
- Category-wise skill overview
- Aggregated progress per category
- Clear separation between analytics and management views

### 🔹 Task Planner
- Date-based task planning
- Separate views for **Today’s Tasks** and **All Tasks**
- Full CRUD operations on tasks
- Overdue task detection and highlighting
- Inline task editing

---
## Tech Stack

**Frontend:**
- React (Vite)
- React Context API (State Management)
- Tailwind CSS (Styling)
- Axios (API Communication)
- Vercel (Hosting)

**Backend:**
- Java 17 / Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA (ORM)
- MySQL (Database)
- Docker (Containerization)
- Render (Deployment)
- Aiven (Managed MySQL Hosting)

## Getting Started

1. **Frontend:**
   - `cd skill_sphere`
   - `npm install`
   - `npm run dev`

2. **Backend:**
   - Configure environment variables in `application.properties` or system env
   - `mvn clean install`
   - Run `SkillSphereApplication`

## Deployment Links

- **Live Demo (Frontend):** [https://skillsphere-ten.vercel.app/](https://skillsphere-ten.vercel.app/)
- **Backend API:** [https://skillsphere-backend-odmw.onrender.com](https://skillsphere-backend-odmw.onrender.com)

- Live Demo: https://skillsphere-ten.vercel.app/
 

**👤 Author**

Basharathullah M

Final Year CSE Student | Java Developer
