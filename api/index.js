import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth' //Authentication with firebase
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8100',  // Allow Ionic app
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyD-JYzcOHjaC1G7OoT30Xz7Bz6Y_Y7O0ZQ",
    authDomain: "task-manager-b8007.firebaseapp.com",
    projectId: "task-manager-b8007",
    storageBucket: "task-manager-b8007.appspot.com", // Corrected storage bucket
    messagingSenderId: "862064100771",
    appId: "1:862064100771:web:a48b6a4e143d9b334e0616"
};

// Initialize Firebase
const appinit = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(appinit);
const auth = getAuth()

// Collection reference
const colRef = collection(db, "tasks");

// API Routes
// Get Docs
app.get("/api/tasks", async (req, res) => {
    try {
        const snapshot = await getDocs(colRef);
        let tasks = [];
        snapshot.docs.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id });
        });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// FOR REALTIME FETCHING
// onSnapshot(colRef, (snapshot) => {
//     let tasks = [];
//         snapshot.docs.forEach((doc) => {
//             tasks.push({ ...doc.data(), id: doc.id });
//         });
//         res.json(tasks);
// })

// Add Docs
app.post("/api/tasks", async (req, res) => {
    try {
    //   console.log("Received request body:", req.body); for testing
      const { title, description, userid, status } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
      }
      const docRef = await addDoc(colRef, { title, description, userid, status });
      res.status(201).json({ id: docRef.id, title, description, userid, status });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Failed to add task", details: error.message });
    }
  });

  // Delete Docs
  app.delete("/api/tasks/:id", async (req, res) => {
    try {
    //   console.log("Received request body:", req.body); for testing
    const taskId = req.params.id; // Extract task ID from URL
      const docRef = await doc(db, 'tasks', taskId);
      deleteDoc(docRef);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Failed to add task", details: error.message });
    }
  });


  

//   UPDATE STATUS
// Update Task Status
app.put("/api/tasks/:id", async (req, res) => {
    try {
    //   console.log("Received request body:", req.body); for testing
    const taskId = req.params.id; // Extract task ID from URL
      const docRef = await doc(db, 'tasks', taskId);
      updateDoc(docRef, {
        status: req.body.status
      });
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Failed to add task", details: error.message });
    }
  });



//   UPDATE DOCUMENTS


// FIREBASE AUTHENTICATION - CREATE USER
app.post("/api/users/create", async (req, res) => {
    // const name = req.body.name;
    const email = req.body.semail;
    const password = req.body.spassword;
        console.log(req.body);
        const response = await createUserWithEmailAndPassword(auth, email, password) 
        .then((cred) => {
            console.log('User Created: ', cred.user);
            res.status(201).json({ message: "User Created Successfully!"});  
        })
        .catch((error) => {
            console.log('Error Creating user: ', error);
            res.status(500).json({ error: "Failed to create user. ", details: error.message });
        })

});


// FIREBASE AUTHENTICATION - SIGNIN USER 
app.post("/api/users/signin", async (req, res) => {
    try { 
        const email = req.body.email;
        const password = req.body.password;
        console.log(req.body);
        const response = await signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('User Signed In: ', cred.user);
            res.status(201).json({ message: "User Signed In Successfully!"});  
        })
    } catch(error) { 
            console.log('Error Signging in user: ', error);
            res.status(500).json({ error: "Failed to sign in user. ", details: error.message });
        } 
});



// SIGNOUT USER 
app.get("/api/users/signout", async (req, res) => {
    try {
        await signOut(auth);
        res.status(200).json({ message: "User signed out successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to sign out.", details: error.message });
    }
});



// CHECK USER SIGNIN STATUS
app.get("/api/users/check", async (req, res) => {
    try {
        const userid = await auth.currentUser;
        res.status(200).json({ message: "User exist", userid: auth.currentUser.uid, useremail: auth.currentUser.email, });
    } catch (error) {
        res.status(500).json({ error: "No User exist", details: error.message });
    }
});



// CHAATBOT API
app.post('/chat', (req, res) => {
    const content = req.body.content;
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
      const response = ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
      }).then((response) =>{
        res.json(response);
      }).catch((error) => {
        res.json(error);
      });
});



// Start the server
app.listen(4000, () => console.log("Listening on Port 4000"));
