import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAC-LGcLnKemat3RmBI1TLcSwpsJcFNsMU",
  authDomain: "my-portfolio-7d564.firebaseapp.com",
  projectId: "my-portfolio-7d564",
  storageBucket: "my-portfolio-7d564.firebasestorage.app",
  messagingSenderId: "542398948680",
  appId: "1:542398948680:web:a3cfe7a8fd1dfb103e3f7d"
};

// 2️⃣ Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3️⃣ Initialize Firestore database
const db = getFirestore(app);

export { db };
