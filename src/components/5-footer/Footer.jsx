import './footer.css';
import { useTranslation } from 'react-i18next';
import { contactInfo as sharedContactInfo, socialLinks } from '../../constants/profile';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('header.about', { defaultValue: 'About' }), href: '#about' },
    { name: t('header.projects'), href: '#projects' },
    { name: t('header.resume'), href: '#resume' },
    { name: t('header.contact'), href: '#contact' }
  ];

  const contactInfo = sharedContactInfo
    .filter((info) => info.label !== 'LinkedIn')
    .map((info) => ({ icon: info.icon, text: info.value, link: info.link }));

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
                    <a href={info.link} rel="noopener noreferrer">{info.text}</a>
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
