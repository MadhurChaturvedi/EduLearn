import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus(null);
    if (!name || !email || !message) return setStatus({ type: 'error', msg: 'Please fill all fields' });
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) return setStatus({ type: 'error', msg: 'Enter a valid email' });

    // Simulate submit
    setTimeout(() => {
      setStatus({ type: 'success', msg: 'Thanks! Your message has been received.' });
      setName(''); setEmail(''); setMessage('');
    }, 600);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Contact Us</h2>
          <p className="text-muted">Have a question or need help? Send us a message and we'll reply shortly.</p>

          <form onSubmit={onSubmit} className="mt-4">
            {status && <div className={`alert ${status.type==='error' ? 'alert-danger' : 'alert-success'}`}>{status.msg}</div>}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows={6} value={message} onChange={e=>setMessage(e.target.value)} />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>

        <div className="col-md-6">
          <div className="p-4 bg-light rounded">
            <h5>Contact details</h5>
            <p className="mb-1"><strong>Email:</strong> support@edulearn.test</p>
            <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p className="mb-1"><strong>Address:</strong> 123 Learning Ave, Education City</p>

            <hr />
            <h6>Office hours</h6>
            <p className="small text-muted">Mon - Fri: 9am - 6pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
