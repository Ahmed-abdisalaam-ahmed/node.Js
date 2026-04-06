# 🌐 **Lesson 2: Intro to Express.js – The Fast Way to Build APIs**

---

### 🎯 **Objectives**

By the end of this lesson, students will:

- Understand what Express.js is and why it’s used.
- Install and set up Express in a Node.js project.
- Create a basic HTTP server.
- Learn how to handle routes like GET and POST.
- Understand the role of middleware in Express.

---

### 🧠 **1. What is Express.js?**

> Express is a minimal and flexible web framework for Node.js. It makes building backend apps and APIs faster and cleaner.
> 

### Why use Express instead of just Node?

- Node.js can handle HTTP requests, but writing everything from scratch gets messy.
- Express simplifies things:
    - Easy routing
    - Cleaner structure
    - Built-in tools for handling requests and responses

> 🧾 Framework: A framework is a collection of tools and features that helps you build apps faster and more consistently.
> 

---

### 🔧 **2. Setting Up Express**

### Step-by-step:

1. Make sure you're inside your project folder:
    
    ```bash
    cd node-hello
    
    ```
    
2. Install Express:
    
    ```bash
    npm install express
    
    ```
    

> 🧾 This command adds Express to your project and saves it in your package.json.
> 

---

### 📄 **3. Create a Basic Server with Express**

Create a new file (if not already): `index.js`

```jsx
const express = require('express');     // Load express
const app = express();                 // Create express app
const PORT = 3000;                     // Choose a port

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

```

Now run the server:

```bash
node index.js

```

Or if using nodemon:

```bash
npm start

```

> 🧾 require(): A Node.js function to load modules (like libraries).
> 
> 
> 🧾 **app.get()**: Handles GET requests (like visiting a page).
> 
> 🧾 **res.send()**: Sends a response back to the browser.
> 
> 🧾 **app.listen()**: Starts the server and keeps it listening on a port.
> 

---

### 🌐 **4. What is a Route?**

> A route defines how your server responds to a specific URL and HTTP method.
> 

Examples:

```jsx
app.get('/about', (req, res) => {
  res.send('About page');
});

app.post('/contact', (req, res) => {
  res.send('Form submitted');
});

```

> 🧾 GET: Requesting data from the server (e.g., opening a page).
> 
> 
> 🧾 **POST**: Sending data to the server (e.g., submitting a form).
> 

---

### 🔄 **5. Using Middleware**

Add this line in your code:

```jsx
app.use(express.json());

```

> 🧾 Middleware: A function that runs before your route handlers. It can read, modify, or pass data (like request body).
> 
> 
> In this case, it lets Express **read JSON data** in POST requests.
> 

---