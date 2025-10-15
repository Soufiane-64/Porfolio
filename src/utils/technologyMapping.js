// Technology mapping for GitHub languages to Font Awesome icons and brand colors
export const technologyMap = {
  // Web Technologies
  'HTML': { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26' },
  'CSS': { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6' },
  'JavaScript': { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
  'TypeScript': { name: 'TypeScript', icon: 'fab fa-js-square', color: '#3178C6' },
  'React': { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
  'Angular': { name: 'Angular', icon: 'fab fa-angular', color: '#DD0031' },
  'Vue': { name: 'Vue.js', icon: 'fab fa-vue', color: '#4FC08D' },
  'Sass': { name: 'Sass', icon: 'fab fa-sass', color: '#CC6699' },
  'SCSS': { name: 'SCSS', icon: 'fab fa-sass', color: '#CC6699' },
  'Less': { name: 'Less', icon: 'fab fa-less', color: '#1D365D' },
  'Stylus': { name: 'Stylus', icon: 'fab fa-stylus', color: '#FF6347' },
  'Bootstrap': { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952B3' },
  'Tailwind CSS': { name: 'Tailwind CSS', icon: 'fab fa-css3-alt', color: '#06B6D4' },

  // Backend Technologies
  'PHP': { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
  'Laravel': { name: 'Laravel', icon: 'fab fa-laravel', color: '#FF2D20' },
  'Symfony': { name: 'Symfony', icon: 'fas fa-code', color: '#000000' },
  'Python': { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
  'Django': { name: 'Django', icon: 'fab fa-python', color: '#092E20' },
  'Flask': { name: 'Flask', icon: 'fas fa-flask', color: '#000000' },
  'FastAPI': { name: 'FastAPI', icon: 'fab fa-python', color: '#009688' },
  'Java': { name: 'Java', icon: 'fab fa-java', color: '#007396' },
  'Spring': { name: 'Spring Boot', icon: 'fas fa-leaf', color: '#6DB33F' },
  'C#': { name: 'C#', icon: 'fab fa-microsoft', color: '#239120' },
  '.NET': { name: '.NET', icon: 'fab fa-microsoft', color: '#512BD4' },
  'ASP.NET': { name: 'ASP.NET', icon: 'fab fa-microsoft', color: '#512BD4' },
  'Node.js': { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
  'Express': { name: 'Express.js', icon: 'fab fa-node-js', color: '#000000' },
  'Ruby': { name: 'Ruby', icon: 'fab fa-ruby', color: '#CC342D' },
  'Rails': { name: 'Ruby on Rails', icon: 'fab fa-ruby', color: '#CC0000' },
  'Go': { name: 'Go', icon: 'fab fa-golang', color: '#00ADD8' },
  'Rust': { name: 'Rust', icon: 'fab fa-rust', color: '#000000' },

  // Databases
  'MySQL': { name: 'MySQL', icon: 'fab fa-mysql', color: '#4479A1' },
  'Mysql': { name: 'MySQL', icon: 'fab fa-mysql', color: '#4479A1' },
  'PostgreSQL': { name: 'PostgreSQL', icon: 'fab fa-postgresql', color: '#336791' },
  'Postgresql': { name: 'PostgreSQL', icon: 'fab fa-postgresql', color: '#336791' },
  'MongoDB': { name: 'MongoDB', icon: 'fab fa-mongodb', color: '#47A248' },
  'Mongodb': { name: 'MongoDB', icon: 'fab fa-mongodb', color: '#47A248' },
  'SQLite': { name: 'SQLite', icon: 'fas fa-database', color: '#003B57' },
  'Redis': { name: 'Redis', icon: 'fab fa-redis', color: '#DC382D' },
  'SQL Server': { name: 'SQL Server', icon: 'fas fa-database', color: '#CC2927' },

  // DevOps & Tools
  'Docker': { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED' },
  'Kubernetes': { name: 'Kubernetes', icon: 'fab fa-kubernetes', color: '#326CE5' },
  'AWS': { name: 'AWS', icon: 'fab fa-aws', color: '#FF9900' },
  'Azure': { name: 'Azure', icon: 'fab fa-microsoft', color: '#0078D4' },
  'Google Cloud': { name: 'Google Cloud', icon: 'fab fa-google', color: '#4285F4' },
  'Git': { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
  'GitHub': { name: 'GitHub', icon: 'fab fa-github', color: '#181717' },
  'GitLab': { name: 'GitLab', icon: 'fab fa-gitlab', color: '#FCA326' },
  'Bitbucket': { name: 'Bitbucket', icon: 'fab fa-bitbucket', color: '#0052CC' },
  'Jenkins': { name: 'Jenkins', icon: 'fab fa-jenkins', color: '#D24939' },
  'Terraform': { name: 'Terraform', icon: 'fab fa-hashicorp', color: '#7B42BC' },

  // Design & UI/UX
  'Figma': { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E' },
  'Adobe XD': { name: 'Adobe XD', icon: 'fab fa-adobe', color: '#FF61F6' },
  'Photoshop': { name: 'Photoshop', icon: 'fab fa-adobe', color: '#31A8FF' },
  'Illustrator': { name: 'Illustrator', icon: 'fab fa-adobe', color: '#FF9A00' },
  'Sketch': { name: 'Sketch', icon: 'fab fa-sketch', color: '#F7B500' },
  'InVision': { name: 'InVision', icon: 'fab fa-invision', color: '#FF3366' },

  // Mobile Development
  'React Native': { name: 'React Native', icon: 'fab fa-react', color: '#61DAFB' },
  'Flutter': { name: 'Flutter', icon: 'fab fa-flutter', color: '#02569B' },
  'Ionic': { name: 'Ionic', icon: 'fab fa-ionic', color: '#3880FF' },
  'Xamarin': { name: 'Xamarin', icon: 'fab fa-microsoft', color: '#3498DB' },

  // Testing & Quality
  'Jest': { name: 'Jest', icon: 'fab fa-js-square', color: '#C21325' },
  'Cypress': { name: 'Cypress', icon: 'fab fa-js-square', color: '#17202C' },
  'Selenium': { name: 'Selenium', icon: 'fab fa-selenium', color: '#43B02A' },
  'JUnit': { name: 'JUnit', icon: 'fab fa-java', color: '#25A162' },

  // Project Management
  'Jira': { name: 'Jira', icon: 'fab fa-jira', color: '#0052CC' },
  'Trello': { name: 'Trello', icon: 'fab fa-trello', color: '#0079BF' },
  'Asana': { name: 'Asana', icon: 'fab fa-asana', color: '#F06A6A' },
  'Slack': { name: 'Slack', icon: 'fab fa-slack', color: '#4A154B' },

  // Other Technologies
  'Webpack': { name: 'Webpack', icon: 'fab fa-js-square', color: '#8DD6F9' },
  'Vite': { name: 'Vite', icon: 'fab fa-js-square', color: '#646CFF' },
  'Parcel': { name: 'Parcel', icon: 'fab fa-js-square', color: '#F44A87' },
  'Rollup': { name: 'Rollup', icon: 'fab fa-js-square', color: '#EC4A3F' },
  'Babel': { name: 'Babel', icon: 'fab fa-js-square', color: '#F9DC3E' },
  'ESLint': { name: 'ESLint', icon: 'fab fa-js-square', color: '#4B32C3' },
  'Prettier': { name: 'Prettier', icon: 'fab fa-js-square', color: '#F7B93E' },
  'NPM': { name: 'NPM', icon: 'fab fa-npm', color: '#CB3837' },
  'Yarn': { name: 'Yarn', icon: 'fab fa-yarn', color: '#2C8EBB' },
  'Composer': { name: 'Composer', icon: 'fab fa-php', color: '#885630' },
  'Pip': { name: 'Pip', icon: 'fab fa-python', color: '#3776AB' },
  'Maven': { name: 'Maven', icon: 'fab fa-java', color: '#C71A36' },
  'Gradle': { name: 'Gradle', icon: 'fab fa-java', color: '#02303A' },

  // Fallback for unknown technologies
  'default': { name: 'Code', icon: 'fas fa-code', color: '#64748b' }
};

// Function to extract technologies from GitHub repositories
export const extractTechnologiesFromRepos = (repos) => {
  const technologies = new Set();

  repos.forEach(repo => {
    // Add primary language
    if (repo.language) {
      technologies.add(repo.language);
    }

    // Extract technologies from repository name and description
    const text = `${repo.name} ${repo.description || ''}`.toLowerCase();

    // Check for common technology patterns
    const techPatterns = [
      'react', 'angular', 'vue', 'svelte',
      'laravel', 'symfony', 'django', 'flask', 'fastapi',
      'spring', 'express', 'rails', 'asp.net',
      'mysql', 'postgresql', 'mongodb', 'redis',
      'docker', 'kubernetes', 'aws', 'azure',
      'figma', 'photoshop', 'illustrator',
      'jest', 'cypress', 'selenium',
      'webpack', 'vite', 'parcel', 'rollup',
      'babel', 'eslint', 'prettier'
    ];

    techPatterns.forEach(pattern => {
      if (text.includes(pattern)) {
        technologies.add(pattern.charAt(0).toUpperCase() + pattern.slice(1));
      }
    });
  });

  return Array.from(technologies);
};

// Function to get technology info with fallback
export const getTechnologyInfo = (techName) => {
  return technologyMap[techName] || {
    name: techName,
    icon: 'fas fa-code',
    color: '#64748b'
  };
};
