import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css";
import { db } from "../firebase/firebase";
import {
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  collection,
  serverTimestamp,
  increment,
  addDoc
} from "firebase/firestore";

export default function Contact() {
  // -----------------------------
  // CONTACT FORM
  // -----------------------------
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [contactSent, setContactSent] = useState(false);

  // -----------------------------
  // FEEDBACK FORM
  // -----------------------------
  const [feedbackForm, setFeedbackForm] = useState({
    reaction: "",
    suggestions: ""
  });
  const [feedbackSent, setFeedbackSent] = useState(false);

  const [feedbackCount, setFeedbackCount] = useState({
    "👍": 0,
    "❤️": 0,
    "👎": 0
  });

  // -----------------------------
  // FIRESTORE LIVE LISTENER FOR EMOJI COUNTS
  // -----------------------------
  useEffect(() => {
    const countsRef = doc(db, "feedbacks", "count");

    const unsubscribe = onSnapshot(countsRef, (snapshot) => {
      if (snapshot.exists()) {
        setFeedbackCount(snapshot.data());
      } else {
        // Initialize counts if missing
        setDoc(countsRef, {
          "👍": 0,
          "❤️": 0,
          "👎": 0
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // -----------------------------
  // CONTACT FORM HANDLERS
  // -----------------------------
  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const sendContactForm = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID_CONTACT",
        contactForm,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setContactSent(true);
        setContactForm({ name: "", email: "", message: "" });
      })
      .catch((err) => alert("Error sending message: " + err.text));
  };

  // -----------------------------
  // FEEDBACK FORM HANDLERS
  // -----------------------------
  const selectReaction = (emoji) => setFeedbackForm({ ...feedbackForm, reaction: emoji });

  const sendFeedbackForm = async (e) => {
  e.preventDefault();

  if (!feedbackForm.reaction) {
    alert("Please select an emoji 😅");
    return;
  }

  try {
    // 1️⃣ Increment emoji count (unchanged — this works)
    const countsRef = doc(db, "feedbacks", "count");
    await updateDoc(countsRef, { [feedbackForm.reaction]: increment(1) });

    // 2️⃣ Save feedback message (fixed path + use addDoc for auto-ID)
    const messagesRef = collection(db, "feedback_messages");  // ← Top-level collection (1 segment)
    await addDoc(messagesRef, {
      reaction: feedbackForm.reaction,
      suggestions: feedbackForm.suggestions,
      timestamp: serverTimestamp()
    });

    setFeedbackSent(true);
    setFeedbackForm({ reaction: "", suggestions: "" });
  } catch (err) {
    console.error("Error saving feedback:", err);
    alert("Error saving feedback: " + err.message);
  }
};



  return (
    <div className="contact-container" id="contact">

      {/* ----------------- CONTACT FORM ----------------- */}
      <div className="form-contact">
        <h2>CONTACT ME</h2>
        {contactSent ? (
          <p className="success-message">Message sent! 🎉</p>
        ) : (
          <form onSubmit={sendContactForm}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={handleContactChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={handleContactChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={contactForm.message}
              onChange={handleContactChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>

      {/* ----------------- FEEDBACK FORM ----------------- */}
      <div className="form-feedback">
        <h2>QUICK FEEDBACK</h2>
        {feedbackSent ? (
          <p className="success-message">Thanks for your feedback! 🌟</p>
        ) : (
          <form onSubmit={sendFeedbackForm}>
            <div className="emoji-buttons">
              {["👍","❤️","👎"].map((emoji) => (
                <div
                  key={emoji}
                  className={`emoji-btn ${feedbackForm.reaction === emoji ? "selected" : ""}`}
                  onClick={() => selectReaction(emoji)}
                >
                  {emoji} <span className="count">{feedbackCount[emoji]}</span>
                </div>
              ))}
            </div>
            <textarea
              name="suggestions"
              placeholder="Any suggestions to improve my portfolio?"
              rows="4"
              value={feedbackForm.suggestions}
              onChange={(e) =>
                setFeedbackForm({ ...feedbackForm, suggestions: e.target.value })
              }
            />
            <button type="submit">Send Feedback</button>
          </form>
        )}
      </div>
    </div>
  );
}
