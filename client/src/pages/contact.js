import React from "react";
import ContactForm from "../components/contactForm";

const Contact = () => {
  return (
    <div id="contact-page">
      <ContactForm />
      {/* Lesson 9: The ContactForm now posts to the Express backend created in this lesson. */}
    </div>
  );
};

export default Contact;
