import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD-JYzcOHjaC1G7OoT30Xz7Bz6Y_Y7O0ZQ",
    authDomain: "task-manager-b8007.firebaseapp.com",
    projectId: "task-manager-b8007",
    storageBucket: "task-manager-b8007.firebasestorage.app",
    messagingSenderId: "862064100771",
    appId: "1:862064100771:web:a48b6a4e143d9b334e0616"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);


// init services
const db = getFirestore()


// collection ref
const colRef = collection(db, 'tasks')

// get collection data

getDocs(colRef)
  .then((snapshot) => {
    let tasks = []
    snapshot.docs.forEach((doc) => {
        tasks.push({...doc.data(), id: doc.id})
    }) 
    console.log(tasks)
  })
