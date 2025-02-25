# 📋 Laravel 12 To-Do List with Inertia & React

A simple and minimalistic To-Do List application built using **Laravel 12 React Starter Pack** with **Inertia.js**. This project demonstrates modern full-stack development with Laravel as the backend and React as the frontend.

## 🚀 Features
- ✅ **Task Management**: Add, edit, and delete tasks easily.
- 🎨 **Modern UI**: Styled with Tailwind CSS for a sleek design.
- ⚡ **Reactive UI**: Powered by Inertia.js for a smooth experience.

## 🖼️ Screenshots
![Dashboard View](https://ucarecdn.com/a7fa72d5-6cd2-4917-a030-28d89fae0c75/Screenshot20250225145928ideapadlocal.png)
![Todo Management](https://ucarecdn.com/2eea4d9b-809f-431d-b18b-d8f4ae3a7453/Screenshot20250225114759ideapadlocal.png)

## 🛠️ Tech Stack
- **Backend:** Laravel 12
- **Frontend:** React + Inertia.js
- **UI Framework:** Tailwind CSS
- **Database:** MySQL / SQLite

## ⚙️ Installation & Setup
Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository
```
git clone https://github.com/handikatriarlan/laravel12-todolist.git
cd laravel12-todolist
```

### 2️⃣ Install Dependencies
```
composer install
npm install
```
### 3️⃣ Configure Environment
```
cp .env.example .env
php artisan key:generate
```

Set up your database credentials inside .env file.

### 4️⃣ Run Migrations & Seeders
```
php artisan migrate --seed
```

### 5️⃣ Start the Development Server
```
composer run dev
```
The app should now be running at `http://localhost:8000`.

