import React from 'react';

const Contact = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', // Centers everything horizontally
      justifyContent: 'center', 
      minHeight: '80vh', 
      padding: '20px' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '500px', // Prevents the content from stretching too far
        backgroundColor: '#f9f9f9', 
        padding: '40px', 
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Contact Us</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Have questions? We'd love to hear from you.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Name" 
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
          <textarea 
            placeholder="Message" 
            rows="5" 
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
          <button 
            type="submit" 
            style={{ 
              padding: '12px', 
              backgroundColor: '#333', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;