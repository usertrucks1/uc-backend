# 🧠 UC Backend

A modular, scalable backend API built using **NestJS** and **TypeORM**, designed for managing service categories, providers, booking slots, and user interactions — inspired by platforms like **Urban Company**.

This backend supports the frontend repo: [uc-frontend](https://github.com/usertrucks1/uc-frontend)
Deployed at : [https://uc-backend-production.up.railway.app/]

---
## 🧠 System Overview
The backend system is a Node.js-based service built with Express.js, designed to support a modern Vite-powered frontend and operate seamlessly in both local and containerized (Docker) environments. It acts as the core API and business logic layer for the application, handling all data processing, authentication, and integration tasks.

## 🎯 Purpose
- Provide RESTful APIs to serve the frontend application.
- Handle user authentication and authorization.
- Manage core business logic and data validation.
- Interface with a PostgreSQL database for persistent storage.
- Support scalable development and deployment using Docker.

---
## 🔧 Features

- 🧩 Modular NestJS architecture
- 📅 Provider-based slot availability system
- 🗂️ Modules for categories, services, providers, bookings
- 🔒 Input validation with class-validator
- 🌐 RESTful API
- 🛠️ Config-based environment setup for dev & prod
- Containerised with docker and docker compose

---
## System Flow

- Basic requirement for a user to perform a booking is - 1. Slot 2. Provider 3. Category
- Category and Provider are added using seeder, since we do not have scope for Provider registration, Category CRUD etc.
- Slots are added with a cronjob that make sure to add slots for next 7 days and runs at 00:00:00
- User select a cetegory, then select a provider.
- Provider has slots for next 7 days with statuses -  Available, Hold, Booked, Unavailabe
- Slots are generated by cron using working_days, work_start_time, work_end_time , slot_duration of provider.
- For concurrent users trying to book a given slot, Slot Hold request is performed to avoid conflicts.
- When a slot is booked, a booking is created in bookings table with status - confirmed, user detail is added to users table.
- A booking can be cancelled as well and marked status - Cancelled, then slot is marked as Available again.

---

## 📦 Tech Stack

| Layer       | Tech                                |
|------------|--------------------------------------|
| Framework   | [NestJS](https://nestjs.com)        |
| ORM         | [TypeORM](https://typeorm.io)       |
| DB          | Postgres                            |
| Validation  | class-validator / class-transformer |
| Dev Tools   | Docker, .env config, Nodemon        |

---

## 📁 Project Structure

uc-backend/
├── src/
│   ├── bookings/           # Booking logic & slot system
│   ├── category/           # Service categories (e.g., cleaning, repair)
│   ├── providers/          # Service providers & their slots
│   ├── database/           # TypeORM config & entities
│   ├── common/             # DTOs, utils, and shared logic
│   └── main.ts             # App entry point
├── .env                    # Environment variables
├── docker-compose.yml
├── package.json
└── README.md

🧪 Getting Started

1. Clone the repository
   
git clone https://github.com/usertrucks1/uc-backend.git
cd uc-backend

3. Create and configure .env

PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=uc_db

3. Install dependencies
npm install

4. Run the backend
npm run start:dev

Docker (Recommended for full stack)
docker-compose up --build


✅ Sample Endpoints
GET	  /categories	      Get all service categories
POST	/providers	      Get all service providers
GET	  /slots/available	Get available slots by date
POST	/bookings	        Get all Booking

✍️ Author
Made with 💻 by Alok Kumar Singh
