import React, { useState } from "react";

const ContactForm = () => {
  // Lesson 9: Step 1 – Store each contact field in state so the values can be
  // packaged and sent to the Express API when the form is submitted.
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL?.trim();
  const submitFormUrl = apiBaseUrl
    ? `${apiBaseUrl.replace(/\/$/, "")}/submit-form`
    : "/submit-form";

  // Lesson 9: Step 2 – Post the collected form data to the Express endpoint we
  // configured in server/index.js, and Step 3 – provide clear success or error
  // feedback to the learner based on the server response.
  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    fetch(submitFormUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unexpected response from the server.");
        }

        setStatus({ type: "success", message: data.message });
        setFormData({ firstname: "", lastname: "", email: "", subject: "" });
      })
      .catch((error) => {
        console.error(error);
        setStatus({
          type: "error",
          message: error.message || "We were unable to send your message. Please try again.",
        });
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div id="contact">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          className="name"
          id="fname"
          name="firstname"
          placeholder="Your name.."
          value={formData.firstname}
          onChange={handleInputChange}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          className="name"
          id="lname"
          name="lastname"
          placeholder="Your last name.."
          value={formData.lastname}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          className="name"
          id="email"
          name="email"
          placeholder="Please leave an email address where we can reach you"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="subject">Subject</label>
        <textarea
          id="subject"
          name="subject"
          placeholder="Write something.."
          value={formData.subject}
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
        {status.message && (
          <p className={`form-status ${status.type}`}>{status.message}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
