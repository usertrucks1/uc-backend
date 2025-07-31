# 🧠 UC Backend

A modular, scalable backend API built using **NestJS** and **TypeORM**, designed for managing service categories, providers, booking slots, and user interactions — inspired by platforms like **Urban Company**.

This backend supports the frontend repo: [uc-frontend](https://github.com/usertrucks1/uc-frontend)
Deployed at : [https://uc-backend-production.up.railway.app/]

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
