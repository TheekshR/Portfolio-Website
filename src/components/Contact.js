import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css";

export default function Contact() {
  // Normal contact form
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  // Feedback form
  const [feedbackForm, setFeedbackForm] = useState({ reaction: "", suggestions: "" });
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Feedback counts
  const [feedbackCount, setFeedbackCount] = useState({ "👍": 0, "❤️": 0, "👎": 0 });

  // Contact form handlers
  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const sendContactForm = (e) => {
    e.preventDefault();
    emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID_CONTACT",
      contactForm,
      "YOUR_PUBLIC_KEY"
    ).then(() => {
      setContactSent(true);
      setContactForm({ name: "", email: "", message: "" });
    }).catch((err) => alert("Error sending message: " + err.text));
  };

  // Feedback handlers
  const selectReaction = (emoji) => {
    setFeedbackForm({ ...feedbackForm, reaction: emoji });
  };

  const sendFeedbackForm = (e) => {
    e.preventDefault();
    if (!feedbackForm.reaction) {
      alert("Please select an emoji!");
      return;
    }
    emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID_FEEDBACK",
      feedbackForm,
      "YOUR_PUBLIC_KEY"
    ).then(() => {
      setFeedbackSent(true);
      setFeedbackForm({ reaction: "", suggestions: "" });
      setFeedbackCount({
        ...feedbackCount,
        [feedbackForm.reaction]: feedbackCount[feedbackForm.reaction] + 1
      });
    }).catch((err) => alert("Error sending feedback: " + err.text));
  };

  return (
    <div className="contact-container">
      {/* Form 1 - Normal Contact */}
      <div className="form-contact">
        <h2>Contact Me ✨</h2>
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

      {/* Form 2 - Feedback */}
      <div className="form-feedback">
        <h2>Quick Feedback 😎</h2>
        {feedbackSent ? (
          <p className="success-message">Thanks for your feedback! 🌟</p>
        ) : (
          <form onSubmit={sendFeedbackForm}>
            <div className="emoji-buttons">
              {["👍", "❤️", "👎"].map((emoji) => (
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
              onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestions: e.target.value })}
            />
            <button type="submit">Send Feedback</button>
          </form>
        )}
      </div>
    </div>
  );
}
