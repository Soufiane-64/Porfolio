import './footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('header.about', { defaultValue: 'About' }), href: '#about' },
    { name: t('header.projects'), href: '#projects' },
    { name: t('header.resume'), href: '#resume' },
    { name: t('header.contact'), href: '#contact' }
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
      url: '/twitter',
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      url: '/instagram',
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
              <h3>{t('footer.brand.name')}</h3>
              <p>{t('footer.brand.title')}</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.contactInfo')}</h4>
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
            <h4>{t('footer.followMe')}</h4>
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
              <p>© {currentYear} {t('footer.brand.name')}. {t('footer.copyright')} {t('footer.coffee')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
