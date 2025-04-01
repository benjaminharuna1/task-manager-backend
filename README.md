# Smart Task Management App - Frontend

## Overview
The **Smart Task Management App** is a feature-rich task management application built using **Ionic React**. This frontend connects to a backend powered by Firebase Functions and MongoDB, providing a seamless and interactive task management experience.

## Frontend Repo
https://github.com/benjaminharuna1/task-manager-frontend



## Features

### Authentication
- User registration, login, and logout.
- **Firebase Authentication**.

### Task Management
- Users can **create, view, update, and delete** tasks.
- Tasks have different statuses: **Pending, In Progress, Completed**.

### Real-Time Features
- Task updates in **real-time** using **Firebase **WebSockets**.

### AI Chatbot Integration
- Integrated **AI chatbot** to provide productivity tips and suggest reminders.

### Native Features
- Users can **upload images** to tasks using the device **camera** (via Capacitor's Camera API).

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **Ionic CLI**
- **Capacitor** (for native functionality)

### Steps to Run the Frontend

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure Firebase (if using Firebase Authentication and Firestore):
   - Create a `.env` file and add Firebase credentials.
4. Run the app in development mode:
   ```sh
   ionic serve
   ```

## Building the Application

### For Web Deployment
```sh
ionic build
```

### For Android (APK Generation)
1. Add Android platform:
   ```sh
   npx cap add android
   ```
2. Sync changes:
   ```sh
   npx cap sync android
   ```
3. Open the project in Android Studio:
   ```sh
   npx cap open android
   ```
4. Build APK inside Android Studio (**Build > Build Bundle/APK > Build APK**).

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the **MIT License**.

---
Developed with ❤️ using **Ionic React** 🚀



Authors
# - Innocent Matur https://github.com/bwesun (Team Lead)
# - BenJamin Haruna Bala https://github.com/benjaminharuna1/
