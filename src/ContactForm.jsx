import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      setFeedback('Completeaza toate campurile!');
    } else {
      setFeedback('Multumim, ' + name + '!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="modern-contact-form">
        <div className="form-group">
          <label>Nume:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Mesaj:</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
        </div>

        <button type="submit" className="btn-submit">Submit</button>
      </form>
      
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default ContactForm;