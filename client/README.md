# Collaborative Whiteboard 

**A real-time, room-based collaborative whiteboard application built with the MERN stack (MongoDB, Express, React, Node.js) where multiple users can draw on the same canvas simultaneously. The project uses Socket.IO for real-time communication and features a clean, intuitive user interface styled with Tailwind CSS.**

**(I've used a screenshot from our conversation. You can replace this with your own final screenshot if you'd like.)**

---

## Features

* **Real-Time Collaboration:** **Changes made by one user are instantly broadcast to all other users in the same room using WebSockets.**
* **Room-Based Sessions:** **Users can create new, unique rooms or join existing ones using a room code.**
* **Drawing Tools:**

  * **Pen Tool** **with adjustable color and stroke width.**
  * **Eraser Tool** **with adjustable size.**
* **State Persistence:** **The state of the whiteboard canvas is automatically saved to the backend database, so it can be reloaded when a user rejoins the room.**
* **Intuitive UI:** **A clean and modern user interface built with floating toolbars that don't obstruct the drawing area.**
* **Responsive Design:** **The layout is designed to be functional and look good across different screen sizes.**

---

## Tech Stack

**This project is a full-stack application with a separate client and server.**

#### Frontend (Client)

* **Framework:** [React](https://www.google.com/url?sa=E&q=https%3A%2F%2Freactjs.org%2F)
* **Bundler:** [Vite](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvitejs.dev%2F)
* **Styling:** [Tailwind CSS](https://www.google.com/url?sa=E&q=https%3A%2F%2Ftailwindcss.com%2F)
* **Routing:** [React Router](https://www.google.com/url?sa=E&q=https%3A%2F%2Freactrouter.com%2F)
* **Real-Time Communication:** [Socket.IO Client](https://www.google.com/url?sa=E&q=https%3A%2F%2Fsocket.io%2Fdocs%2Fv4%2Fclient-api%2F)
* **Icons:** [React Icons](https://www.google.com/url?sa=E&q=https%3A%2F%2Freact-icons.github.io%2Freact-icons%2F)

#### Backend (Server)

* **Framework:** [Node.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnodejs.org%2F) **with** [Express](https://www.google.com/url?sa=E&q=https%3A%2F%2Fexpressjs.com%2F)
* **Database:** [SQLite](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.sqlite.org%2Findex.html)
* **ORM:** [Sequelize](https://www.google.com/url?sa=E&q=https%3A%2F%2Fsequelize.org%2F)
* **Real-Time Communication:** [Socket.IO](https://www.google.com/url?sa=E&q=https%3A%2F%2Fsocket.io%2F)
* **Middleware:** [CORS](https://www.google.com/url?sa=E&q=https%3A%2F%2Fexpressjs.com%2Fen%2Fresources%2Fmiddleware%2Fcors.html)

---

## Getting Started

**To run this project locally, please follow these steps.**

### Prerequisites

* [Node.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnodejs.org%2Fen%2F) **(version 18.x or higher is recommended)**
* [npm](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.npmjs.com%2F) **(usually comes with Node.js)**

### Installation & Setup

* **Clone the repository:**

  ```
  git clone <your-repository-url>
  cd Assignment
  ```
* **Setup the Backend Server:**

  * **Navigate to the server directory:**

    ```
    cd server
    ```
  * **Install the required dependencies:**

    ```
    npm install
    ```
  * **Start the server (it will use** **nodemon** **to watch for changes):**

    ```
    npm start
    ```
  * **The server will be running on** **http://localhost:3001**.
* **Setup the Frontend Client:**

  * **Open a** **new terminal window** **and navigate to the client directory:**

    ```
    cd client
    ```
  * **Install the required dependencies:**

    ```
    npm install
    ```
  * **Start the Vite development server:**

    ```
    npm run dev
    ```
  * **The client application will be running on** **http://localhost:5173** **(or another port if 5173 is busy).**
* **Access the Application:**

  * **Open your web browser and go to** **http://localhost:5173**.
  * **You can now create a new room or join an existing one. To test the real-time collaboration, open the application in two different browser tabs or windows and join the same room.**

---

## Project Structure

**The project is organized into two main parts:** **client** **and** **server**.

```
Assignment/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable React components (Board, Toolbar, OptionsBar)
│   │   ├── pages/           # Page components (HomePage, RoomPage)
│   │   ├── App.jsx          # Main application component with routing
│   │   ├── index.css        # Global CSS and Tailwind directives
│   │   └── main.jsx         # Entry point for the React application
│   ├── package.json
│   └── vite.config.js
│
└── server/
    ├── index.js             # Main server file (Express and Socket.IO setup)
    ├── database.js          # Sequelize connection and Model definition
    └── package.json
```

---

## How It Works

 **The application's real-time functionality is powered by** **Socket.IO**.

* **When a user joins a room, their client establishes a WebSocket connection with the server and joins a Socket.IO room corresponding to the** **roomId**.
* **When a user draws on the canvas (**onMouseMove**), the** **Board** **component emits a** **drawing** **event to the server with the coordinates, color, and stroke width.**
* **The server receives this** **drawing** **event and immediately** **broadcasts** **it to all other clients connected to the same room.**
* **The other clients listen for the incoming** **drawing** **event and draw the received path on their own canvases, creating the illusion of real-time shared drawing.**
* **Saving and loading the board state are handled via standard REST API calls to the Express server, which interacts with the SQLite database through the Sequelize ORM.**
