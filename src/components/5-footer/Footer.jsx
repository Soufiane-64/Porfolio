import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'fa-brands fa-github',
      url: 'https://github.com/Soufiane-64',
      color: '#181717'
    },
    {
      name: 'LinkedIn',
      icon: 'fa-brands fa-linkedin',
      url: 'https://linkedin.com/in/soufiane-hammagi',
      color: '#0077B5'
    },
    {
      name: 'Twitter',
      icon: 'fa-brands fa-twitter',
      url: 'https://twitter.com/soufiane_dev',
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      url: 'https://instagram.com/soufiane_dev',
      color: '#E4405F'
    }
  ];

  const contactInfo = [
    {
      icon: 'fa-solid fa-envelope',
      text: 'hammagisoufiane@gmail.com',
      link: 'mailto:hammagisoufiane@gmail.com'
    },
    {
      icon: 'fa-solid fa-phone',
      text: '+49 176 2450 7804',
      link: 'tel:+4917624507804'
    },
    {
      icon: 'fa-solid fa-location-dot',
      text: 'Bremen, Germany',
      link: null
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-section">
            <div className="footer-brand">
              <h3>Soufiane Hammagi</h3>
              <p>Full-Stack Developer & Software Engineer</p>
              <a
                href="/SoufianeHammagiResume.pdf"
                download="Soufiane_Hammagi_CV.pdf"
                className="cv-download-btn"
                title="Download CV"
              >
                <i className="fa-solid fa-download" />
                Download CV
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <i className={info.icon} />
                  {info.link ? (
                    <a href={info.link}>{info.text}</a>
                  ) : (
                    <span>{info.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4>Follow Me</h4>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-color={social.color}
                  title={social.name}
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>© {currentYear} Soufiane Hammagi. All rights reserved. • Built with React & lots of ☕</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
