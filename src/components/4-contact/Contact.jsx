import { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, we'll simulate success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'fa-solid fa-envelope',
      label: 'Email',
      value: 'hammagisoufiane@gmail.com',
      link: 'mailto:hammagisoufiane@gmail.com'
    },
    {
      icon: 'fa-solid fa-phone',
      label: 'Phone',
      value: '+49 176 2450 7804',
      link: 'tel:+4917624507804'
    },
    {
      icon: 'fa-solid fa-location-dot',
      label: 'Location',
      value: 'Bremen, Germany',
      link: null
    },
    {
      icon: 'fa-brands fa-linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/soufiane-hammagi',
      link: 'https://linkedin.com/in/soufiane-hammagi'
    }
  ];

  const socialLinks = [
    {
      icon: 'fa-brands fa-github',
      label: 'GitHub',
      url: 'https://github.com/Soufiane-64',
      color: '#181717'
    },
    {
      icon: 'fa-brands fa-linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/soufiane-hammagi',
      color: '#0077B5'
    },
    {
      icon: 'fa-brands fa-twitter',
      label: 'Twitter',
      url: 'https://twitter.com/soufiane_dev',
      color: '#1DA1F2'
    },
    {
      icon: 'fa-brands fa-instagram',
      label: 'Instagram',
      url: 'https://instagram.com/soufiane_dev',
      color: '#E4405F'
    }
  ];

  return (
    <section className="contact-us">
      <h1 className="title">
        <span className="fa-solid fa-envelope" />
        Contact Me
      </h1>
      <p className="sub-title">
        Feel free to reach out for more information. I&apos;m always interested in new opportunities and collaborations.
      </p>

      <div className="contact-container">
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={errors.subject ? 'error' : ''}
                placeholder="What's this about?"
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell me about your project or question..."
                rows={5}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">
                <i className="fa-solid fa-check-circle" />
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-message-general">
                <i className="fa-solid fa-exclamation-triangle" />
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </form>
        </div>

        <div className="contact-info-section">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
               Based in Bremen, Germany, but available for remote work worldwide.</p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <i className={info.icon} />
                  <div className="contact-item-content">
                    <span className="contact-label">{info.label}</span>
                    {info.link ? (
                      <a href={info.link} className="contact-value">
                        {info.value}
                      </a>
                    ) : (
                      <span className="contact-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h4>Follow Me</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    data-color={social.color}
                    title={social.label}
                  >
                    <i className={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-map-section">
        <div className="contact-map">
          <h4>Find Me Here</h4>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2425.5!2d8.8078!3d53.0793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b1028b4c4b4b4b%3A0x4b4b4b4b4b4b4b4b!2sAnsbacher%20Stra%C3%9Fe%2038%2C%2028215%20Bremen%2C%20Germany!5e0!3m2!1sen!2sde!4v1234567890"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Soufiane's Location Map"
            />
          </div>
          <div className="map-info">
            <div className="location-details">
              <i className="fa-solid fa-map-marker-alt" />
              <div>
                <h5>Bremen, Germany</h5>
                <p>Ansbacher Straße 38, 28215 Bremen</p>
              </div>
            </div>
            <div className="timezone-info">
              <i className="fa-solid fa-clock" />
              <div>
                <h5>Timezone</h5>
                <p>GMT+1 (CET/CEST)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
