import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './contact.css';

const Contact = () => {
  const { t } = useTranslation();
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
      newErrors.name = t('contact.form.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.emailInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.form.subjectRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.form.messageMinLength');
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
      icon: 'fa-brands fa-x-twitter',
      label: 'X',
      url: 'https://x.com/SoufianeHammagi',
      color: '#000000'
    },
    {
      icon: 'fa-brands fa-instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/soufiane.64/',
      color: '#E4405F'
    }
  ];

  return (
    <section className="contact-us">
      <h1 className="title">
        <span className="fa-solid fa-envelope" />
        {t('contact.title')}
      </h1>
      <p className="sub-title">
        {t('contact.subtitle')}
      </p>

      <div className="contact-container">
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">{t('contact.form.fullName')} {t('contact.form.required')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder={t('contact.form.fullNamePlaceholder')}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.form.email')} {t('contact.form.required')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder={t('contact.form.emailPlaceholder')}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">{t('contact.form.subject')} {t('contact.form.required')}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={errors.subject ? 'error' : ''}
                placeholder={t('contact.form.subjectPlaceholder')}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')} {t('contact.form.required')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'error' : ''}
                placeholder={t('contact.form.messagePlaceholder')}
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
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" />
                  {t('contact.form.sendMessage')}
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">
                <i className="fa-solid fa-check-circle" />
                {t('contact.form.successTitle')}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-message-general">
                <i className="fa-solid fa-exclamation-triangle" />
                {t('contact.form.errorTitle')}
              </div>
            )}
          </form>
        </div>

        <div className="contact-info-section">
          <div className="contact-info">
            <h3>{t('contact.info.getInTouch')}</h3>
            <p>{t('contact.info.description')}</p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <i className={info.icon} />
                  <div className="contact-item-content">
                    <span className="contact-label">{(() => {
                      const map = { Email: 'email', Phone: 'phone', Location: 'location', LinkedIn: 'linkedin' };
                      const key = map[info.label] || 'email';
                      return t(`contact.info.${key}`);
                    })()}</span>
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
              <h4>{t('contact.info.followMe')}</h4>
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
          <h4>{t('contact.map.title')}</h4>
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
                <h5>{t('contact.map.locationTitle')}</h5>
                <p>{t('contact.map.locationAddress')}</p>
              </div>
            </div>
            <div className="timezone-info">
              <i className="fa-solid fa-clock" />
              <div>
                <h5>{t('contact.map.timezoneTitle')}</h5>
                <p>{t('contact.map.timezoneValue')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
