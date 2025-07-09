# Collaborative Whiteboard

**A real-time, room-based collaborative whiteboard application built with the MERN stack (MongoDB, Express, React, Node.js) where multiple users can draw on the same canvas simultaneously. The project uses Socket.IO for all real-time communication and data persistence, creating an efficient and responsive user experience.**

![Screenshot 2025-07-09 at 8 46 22 PM](https://github.com/user-attachments/assets/12886c0d-ec2f-4869-9c8e-d2830d5f20f6)
## Features

* **Real-Time Collaboration:** **Changes made by one user are instantly broadcast to all other users in the same room using WebSockets.**
* **Room-Based Sessions:** **Users can create new, unique rooms or join existing ones using a room code.**
* **Complete Drawing Toolset:**

  * **Pen Tool** **for freehand drawing.**
  * **Shape Tools** **including Line, Rectangle, Circle, and Triangle.**
  * **Eraser Tool** **with adjustable size.**
  * **Color Picker** **to select any stroke color.**
  * **Adjustable Stroke Size** **for all drawing tools.**
* **State Persistence with MongoDB:** **The entire state of the whiteboard canvas is saved to a cloud-hosted MongoDB Atlas database. The board state is automatically loaded when a user joins a room.**
* **Intuitive UI:** **A clean and modern user interface styled with Tailwind CSS, featuring a persistent toolbar and contextual header controls that don't obstruct the drawing area.**
* **Deployed and Live:** **Fully deployed on Render, with a CI/CD pipeline for automatic updates on code changes.**

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
* **Database:** [MongoDB](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.mongodb.com%2F) **(with MongoDB Atlas for cloud hosting)**
* **ODM:** [Mongoose](https://www.google.com/url?sa=E&q=https%3A%2F%2Fmongoosejs.com%2F)
* **Real-Time Communication & Data Handling:** [Socket.IO](https://www.google.com/url?sa=E&q=https%3A%2F%2Fsocket.io%2F)
* **Middleware:** [CORS](https://www.google.com/url?sa=E&q=https%3A%2F%2Fexpressjs.com%2Fen%2Fresources%2Fmiddleware%2Fcors.html)
* **Environment Variables:** [dotenv](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fdotenv)

---

## Getting Started

**To run this project locally, please follow these steps.**

### Prerequisites

* [Node.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnodejs.org%2Fen%2F) **(version 18.x or higher is recommended)**
* [npm](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.npmjs.com%2F) **(usually comes with Node.js)**
* **A** **MongoDB Atlas** **account and a free cluster.**

### Installation & Setup

* **Clone the repository:**

  Generated bash

  ```
  git clone <your-repository-url>
  cd your-project-folder/
  ```

  **content_copy**download

  Use code [with caution](https://support.google.com/legal/answer/13505487).**Bash**
* **Setup the Backend Server:**

  * **Navigate to the server directory:**

    ```
    cd server
    ```
  * **Install the required dependencies:**

    ```
    npm install
    ```
  * **Create a** **.env** **file in the** **server/** **directory and add your MongoDB Atlas connection string:**

    Generated code

    ```
    MONGO_URI=mongodb+srv://<user>:<password>@cluster.../whiteboardDB?retryWrites=true&w=majority
    FRONTEND_URL=http://localhost:5173
    ```
  * **Start the server (it will use** **nodemon** **to watch for changes):**

    ```
    npm start
    ```
  * **The server will be running on** [http://localhost:3001](https://www.google.com/url?sa=E&q=http%3A%2F%2Flocalhost%3A3001).
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
  * **The client application will be running on** [http://localhost:5173](https://www.google.com/url?sa=E&q=http%3A%2F%2Flocalhost%3A5173).
* **Access the Application:**

  * **Open your web browser and go to** [http://localhost:5173](https://www.google.com/url?sa=E&q=http%3A%2F%2Flocalhost%3A5173).
  * **To test collaboration, open the application in two different browser tabs and join the same room.**

---

## Project Structure

**The project is organized into a** **client** **and** **server** **monorepo structure.**

```
your-project-folder/
├── client/
│   ├── public/              # Static assets and _redirects file for deployment
│   ├── src/
│   │   ├── components/      # Reusable React components (Board, Toolbar, etc.)
│   │   ├── pages/           # Page components (HomePage, RoomPage)
│   │   ├── App.jsx
│   │   └── main.jsx            
│   └── package.json
│
└── server/
    ├── index.js             # Main server file with Express, Mongoose, and Socket.IO logic
    ├── .env                 # Local environment variables (MONGO_URI)
    └── package.json
```


---

## How It Works

**The application's core functionality is entirely driven by** **Socket.IO** **for a seamless, real-time experience.**

* **Joining a Room:** **When a user navigates to a room, the React client emits a** **join_room** **event to the server. The server finds or creates a new board document in MongoDB for that** **roomId** **and sends the saved canvas content back to the client via a** **load_content** **event.**
* **Drawing:** **When a user draws, the** **Board** **component emits** **drawing** **events to the server with the path data. The server then broadcasts this event to all other clients in the same room, who render the path on their own canvases.**
* **Saving:** **When a user clicks "Save", the client emits a** **save_board** **event containing the entire canvas state as a Base64 string. The server receives this and updates the corresponding document in MongoDB. The server then sends back a** **save_success** **confirmation.**
* **No REST API for Core Actions:** **All primary user actions (loading, drawing, saving, clearing) are handled through socket events, not traditional HTTP requests, which simplifies state management and reduces overhead.**

---

## Features

* **Real-Time Collaboration:** **Changes made by one user are instantly broadcast to all other users in the same room using WebSockets.**
* **Room-Based Sessions:** **Users can create new, unique rooms or join existing ones using a room code.**
* **Complete Drawing Toolset:**

  * **Pen Tool** **for freehand drawing.**
  * **Shape Tools** **including Line, Rectangle, Circle, and Triangle.**
  * **Eraser Tool** **with adjustable size.**
  * **Color Picker** **to select any stroke color.**
  * **Adjustable Stroke Size** **for all drawing tools.**
* **State Persistence with MongoDB:** **The entire state of the whiteboard canvas is saved to a cloud-hosted MongoDB Atlas database. The board state is automatically loaded when a user joins a room.**
* **Intuitive UI:** **A clean and modern user interface styled with Tailwind CSS, featuring a persistent toolbar and contextual header controls that don't obstruct the drawing area.**
* **Deployed and Live:** **Fully deployed on Render, with a CI/CD pipeline for automatic updates on code changes.**

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
* **Database:** [MongoDB](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.mongodb.com%2F) **(with MongoDB Atlas for cloud hosting)**
* **ODM:** [Mongoose](https://www.google.com/url?sa=E&q=https%3A%2F%2Fmongoosejs.com%2F)
* **Real-Time Communication & Data Handling:** [Socket.IO](https://www.google.com/url?sa=E&q=https%3A%2F%2Fsocket.io%2F)
* **Middleware:** [CORS](https://www.google.com/url?sa=E&q=https%3A%2F%2Fexpressjs.com%2Fen%2Fresources%2Fmiddleware%2Fcors.html)
* **Environment Variables:** [dotenv](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fdotenv)

---

## Getting Started

**To run this project locally, please follow these steps.**

### Prerequisites

* [Node.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnodejs.org%2Fen%2F) **(version 18.x or higher is recommended)**
* [npm](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.npmjs.com%2F) **(usually comes with Node.js)**
* **A** **MongoDB Atlas** **account and a free cluster.**

### Installation & Setup

* **Clone the repository:**

  Generated bash

  ```
  git clone <your-repository-url>
  cd your-project-folder/
  ```

  **content_copy**download

  Use code [with caution](https://support.google.com/legal/answer/13505487).**Bash**
* **Setup the Backend Server:**

  * **Navigate to the server directory:**

    ```
    cd server
    ```
  * **Install the required dependencies:**

    ```
    npm install
    ```
  * **Create a** **.env** **file in the** **server/** **directory and add your MongoDB Atlas connection string:**

    Generated code

    ```
    MONGO_URI=mongodb+srv://<user>:<password>@cluster.../whiteboardDB?retryWrites=true&w=majority
    FRONTEND_URL=http://localhost:5173
    ```
  * **Start the server (it will use** **nodemon** **to watch for changes):**

    ```
    npm start
    ```
  * **The server will be running on** [http://localhost:3001](https://www.google.com/url?sa=E&q=http%3A%2F%2Flocalhost%3A3001).
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
  * **The client application will be running on** [http://localhost:5173](https://www.google.com/url?sa=E&q=http%3A%2F%2Flocalhost%3A5173).
* **Access the Application:**

  * **Open your web browser and go to** [http://localhost:5173](https://www.google.com/url?sa=E&q=http%3A%2F%2Flocalhost%3A5173).
  * **To test collaboration, open the application in two different browser tabs and join the same room.**

---

## Project Structure

**The project is organized into a** **client** **and** **server** **monorepo structure.**

```
your-project-folder/
├── client/
│   ├── public/              # Static assets and _redirects file for deployment
│   ├── src/
│   │   ├── components/      # Reusable React components (Board, Toolbar, etc.)
│   │   ├── pages/           # Page components (HomePage, RoomPage)
│   │   ├── App.jsx
│   │   └── main.jsx            
│   └── package.json
│
└── server/
    ├── index.js             # Main server file with Express, Mongoose, and Socket.IO logic
    ├── .env                 # Local environment variables (MONGO_URI)
    └── package.json
```


---

## How It Works

**The application's core functionality is entirely driven by** **Socket.IO** **for a seamless, real-time experience.**

* **Joining a Room:** **When a user navigates to a room, the React client emits a** **join_room** **event to the server. The server finds or creates a new board document in MongoDB for that** **roomId** **and sends the saved canvas content back to the client via a** **load_content** **event.**
* **Drawing:** **When a user draws, the** **Board** **component emits** **drawing** **events to the server with the path data. The server then broadcasts this event to all other clients in the same room, who render the path on their own canvases.**
* **Saving:** **When a user clicks "Save", the client emits a** **save_board** **event containing the entire canvas state as a Base64 string. The server receives this and updates the corresponding document in MongoDB. The server then sends back a** **save_success** **confirmation.**
* **No REST API for Core Actions:** **All primary user actions (loading, drawing, saving, clearing) are handled through socket events, not traditional HTTP requests, which simplifies state management and reduces overhead.**
