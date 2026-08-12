/**
 * Centralized personal data — import this everywhere instead of hardcoding
 * email, phone, address, or social links in individual components.
 */

export const personalInfo = {
  name: 'Soufiane Hammagi',
  title: 'Full-Stack Developer',
  email: 'hammagisoufiane@gmail.com',
  phone: '+49 176 2450 7804',
  location: 'Bremen, Germany',
  resumeUrl: '/SoufianeHammagiResume.pdf',
  githubUsername: 'Soufiane-64',
  website: 'https://soufianehammagi.dev'
};

export const socialLinks = [
  {
    name: 'GitHub',
    icon: 'fa-brands fa-github',
    url: 'https://github.com/Soufiane-64',
    color: '#181717'
  },
  {
    name: 'LinkedIn',
    icon: 'fa-brands fa-linkedin',
    url: 'https://www.linkedin.com/in/soufiane-hammagi/',
    color: '#0077B5'
  },
  {
    name: 'X (Twitter)',
    icon: 'fa-brands fa-x-twitter',
    url: 'https://x.com/SoufianeHammagi',
    color: '#1DA1F2'
  },
  {
    name: 'Instagram',
    icon: 'fa-brands fa-instagram',
    url: 'https://www.instagram.com/soufiane.64/',
    color: '#E4405F'
  }
];

export const contactInfo = [
  {
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    value: personalInfo.email,
    link: `mailto:${personalInfo.email}`
  },
  {
    icon: 'fa-solid fa-phone',
    label: 'Phone',
    value: personalInfo.phone,
    link: `tel:${personalInfo.phone.replace(/\s/g, '')}`
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Location',
    value: personalInfo.location,
    link: null
  },
  {
    icon: 'fa-brands fa-linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/soufiane-hammagi',
    link: 'https://linkedin.com/in/soufiane-hammagi'
  }
];
