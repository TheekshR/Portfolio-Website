import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css";
import { db } from "../firebase/firebase";
import {
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  collection
} from "firebase/firestore";

export default function Contact() {
  // Normal contact form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [contactSent, setContactSent] = useState(false);

  // Feedback form
  const [feedbackForm, setFeedbackForm] = useState({
    reaction: "",
    suggestions: ""
  });
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Live feedback counts from Firebase
  const [feedbackCount, setFeedbackCount] = useState({
    "👍": 0,
    "❤️": 0,
    "👎": 0
  });

  // ---------------------------
  // 🚀 Real-time Firestore Listener
  // ---------------------------
  useEffect(() => {
    const countsRef = doc(db, "feedback", "counts");

    const unsubscribe = onSnapshot(countsRef, (snapshot) => {
      if (snapshot.exists()) {
        setFeedbackCount(snapshot.data());
      } else {
        // Auto-create if missing
        setDoc(countsRef, {
          "👍": 0,
          "❤️": 0,
          "👎": 0
        });
      }
    });

    return () => unsubscribe();
  }, []);


//NORMAL CONTACT FORM

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const sendContactForm = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_83em2qf",
        "template_1g3fiai",
        contactForm,
        "4aaLUcaPg7z96YEvS"
      )
      .then(() => {
        setContactSent(true);
        setContactForm({ name: "", email: "", message: "" });
      })
      .catch((err) => alert("Error sending message: " + err.text));
  };


  //FEEDBACK FORM
  const selectReaction = (emoji) => {
    setFeedbackForm({ ...feedbackForm, reaction: emoji });
  };

const sendFeedbackForm = async (e) => {
  e.preventDefault();

  if (!feedbackForm.reaction) {
    alert("Please select an emoji 😅");
    return;
  }

  try {
    // 1️⃣ Update counter in Firestore
    const countsRef = doc(db, "feedback", "counts");
    await updateDoc(countsRef, {
      [feedbackForm.reaction]: feedbackCount[feedbackForm.reaction] + 1
    });

    // 2️⃣ Save the feedback message in Firestore
    const newFeedbackRef = doc(collection(db, "feedback", "messages", "entries"));
    await setDoc(newFeedbackRef, {
      reaction: feedbackForm.reaction,
      suggestions: feedbackForm.suggestions,
      timestamp: new Date(),
    });

    // Reset form & show success
    setFeedbackSent(true);
    setFeedbackForm({ reaction: "", suggestions: "" });

  } catch (err) {
    alert("Error saving feedback: " + err);
  }
};


  return (
    <div className="contact-container">

      {/* LEFT SIDE: Contact Me */}

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

      {/* RIGHT SIDE: Feedback  */}

      <div className="form-feedback">
        <h2>QUICK FEEDBACK</h2>

        {feedbackSent ? (
          <p className="success-message">Thanks for your feedback! 🌟</p>
        ) : (
          <form onSubmit={sendFeedbackForm}>
            <div className="emoji-buttons">
              {["👍", "❤️", "👎"].map((emoji) => (
                <div
                  key={emoji}
                  className={`emoji-btn ${
                    feedbackForm.reaction === emoji ? "selected" : ""
                  }`}
                  onClick={() => selectReaction(emoji)}
                >
                  {emoji}
                  <span className="count">{feedbackCount[emoji]}</span>
                </div>
              ))}
            </div>

            <textarea
              name="suggestions"
              placeholder="Any suggestions to improve my portfolio?"
              rows="4"
              value={feedbackForm.suggestions}
              onChange={(e) =>
                setFeedbackForm({
                  ...feedbackForm,
                  suggestions: e.target.value
                })
              }
            />

            <button type="submit">Send Feedback</button>
          </form>
        )}
      </div>
    </div>
  );
}
