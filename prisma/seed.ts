import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding portfolio data...');

  // 1. Seed Site Settings
  const settings = [
    { key: 'site_title', value: 'Ishan Yadav | Portfolio' },
    { key: 'site_description', value: 'Cybersecurity Analyst & Full Stack Software Developer Portfolio' },
    { key: 'theme_color', value: '#00ff88' },
    { key: 'resume_url', value: 'https://personal-portfolio-neon-one-70.vercel.app/resume.pdf' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }

  // 2. Seed Hero Section
  const heroCount = await prisma.heroSection.count();
  if (heroCount === 0) {
    await prisma.heroSection.create({
      data: {
        title: 'Ishan Yadav',
        subtitle: 'Cybersecurity Analyst & Developer',
        bio: "I'm a B.Tech Computer Science & Engineering student at Bennett University. I specialize in cybersecurity threat automation and software engineering, combining local artificial intelligence with practical security defenses.",
        roles: 'Cybersecurity Analyst,Software Developer,AI Enthusiast',
        avatarUrl: null,
      },
    });
  }

  // 3. Seed Contact Info
  const contactInfoCount = await prisma.contactInfo.count();
  if (contactInfoCount === 0) {
    await prisma.contactInfo.create({
      data: {
        email: 'ishanyadav09@outlook.com',
        phone: '+91 99999 99999',
        location: 'Gurgaon, Haryana, India',
      },
    });
  }

  // 4. Seed Social Links
  const socialLinks = [
    { platform: 'GitHub', url: 'https://github.com/DecryptorX', icon: 'github', order: 0 },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ishan-yadav-a22251325', icon: 'linkedin', order: 1 },
  ];

  for (const sl of socialLinks) {
    const existing = await prisma.socialLink.findFirst({ where: { platform: sl.platform } });
    if (!existing) {
      await prisma.socialLink.create({ data: sl });
    }
  }

  // 5. Seed SEO Metadata
  const seoData = [
    { page: 'home', title: 'Ishan Yadav | Portfolio', description: 'Personal portfolio website of Ishan Yadav - B.Tech CSE Student, Developer, and Security Researcher.', keywords: 'Ishan Yadav, cybersecurity, Bennett University, software developer, portfolio, Next.js' },
    { page: 'about', title: 'About | Ishan Yadav', description: 'Learn more about Ishan Yadav, B.Tech CSE student at Bennett University, his education, visual design interest, and visual logs.', keywords: 'about me, biography, education, Bennett University' },
    { page: 'projects', title: 'Projects | Ishan Yadav', description: 'Explore cybersecurity automation scripts, AI diagnostics tools, and full-stack software development projects.', keywords: 'projects, open source, GitHub, log analyzer, women safety' },
    { page: 'skills', title: 'Skills | Ishan Yadav', description: 'Core competencies including Python, JavaScript, Java, React, Next.js, and threat intelligence protocols.', keywords: 'programming, web development, cybersecurity, databases, tools' },
    { page: 'experience', title: 'Experience | Ishan Yadav', description: 'Professional history, academic research, and leadership initiatives of Ishan Yadav.', keywords: 'employment, history, ACM, freelance developer' },
    { page: 'journey', title: 'Journey | Ishan Yadav', description: 'Milestones and evolution in systems, software, and robotics engineering from 2006 to present.', keywords: 'milestones, timeline, career path, biography' }
  ];

  for (const seo of seoData) {
    await prisma.seoMetadata.upsert({
      where: { page: seo.page },
      update: { title: seo.title, description: seo.description, keywords: seo.keywords },
      create: seo,
    });
  }

  // 6. Seed Projects
  const projects = [
    {
      num: '01',
      title: 'SkinVision AI',
      tagline: 'AI-powered skin disease detection platform',
      role: 'Full Stack Developer, AI Integration',
      description: 'An intelligent web application that leverages deep learning to analyse skin images and detect potential skin conditions. Built with a Flask backend handling the ML inference pipeline and a Next.js frontend delivering a seamless, mobile-first experience.',
      features: 'AI-powered dermoscopic image analysis\nReal-time skin condition detection\nLocation-based dermatologist finder\nResponsive mobile-first UI\nSecure image upload pipeline',
      tech: 'Python, Flask, React, Next.js, Tailwind CSS, TensorFlow',
      highlights: 'Built the full ML pipeline from data preprocessing through model training to API serving. Integrated location services for dermatologist discovery.',
      github: 'https://github.com/DecryptorX/SkinVision',
      demo: 'https://skinvision.vercel.app/',
      status: 'live',
      color: '#00e5ff',
      accent: '#00e5ff',
      gradFrom: '#001f2e',
      gradTo: '#002a3d',
      order: 0,
    },
    {
      num: '02',
      title: 'Automated Log Analyzer',
      tagline: 'Security log analysis and automated incident reporting',
      role: 'Security Developer, Python Engineer',
      description: 'A professional-grade Python security tool that ingests Windows Event Logs and Linux syslog files, runs pattern-matching detection for common attack signatures — brute-force, privilege escalation, lateral movement — and produces structured incident reports.',
      features: 'Windows & Linux log parsing engine\nBrute-force and anomaly detection\nPrivilege escalation pattern matching\nStructured HTML & JSON report generation\nConfigurable detection rule sets',
      tech: 'Python, RegEx, Linux, Windows, JSON',
      highlights: 'Developed custom detection rules mapped to MITRE ATT&CK techniques, reducing manual log review time by automating pattern recognition across thousands of events.',
      github: 'https://github.com/DecryptorX/Automated-Log-Analyzer-and-Reporting-Script',
      demo: null,
      status: 'open-source',
      color: '#f59e0b',
      accent: '#f59e0b',
      gradFrom: '#1e1000',
      gradTo: '#2a1600',
      order: 1,
    },
    {
      num: '03',
      title: 'SAFEपथ',
      tagline: 'AI-assisted women safety and emergency response platform',
      role: 'Full Stack Developer, AI Integration',
      description: "A community-driven safety platform for women's security. Features real-time emergency SOS dispatch, AI-assisted threat monitoring, crowd-sourced safety heatmaps, and community engagement tools — all in a mobile-first progressive web app.",
      features: 'Real-time emergency SOS dispatch\nAI-assisted safety monitoring\nCommunity safety heatmaps\nSafe route recommendations\nIncident reporting & tracking',
      tech: 'React, Next.js, Node.js, MongoDB, AI/ML',
      highlights: 'Designed the AI safety scoring system and the emergency contact notification pipeline. Prioritised sub-second response times for SOS alerts.',
      github: 'https://github.com/DecryptorX/SafePath',
      demo: null,
      status: 'open-source',
      color: '#ec4899',
      accent: '#ec4899',
      gradFrom: '#1e0011',
      gradTo: '#2a0018',
      order: 2,
    },
    {
      num: '04',
      title: 'JARVIS AI Agent',
      tagline: 'Desktop AI assistant with local intelligence and voice interaction',
      role: 'AI Engineer, System Architect',
      description: 'A modular desktop AI assistant built around OpenRouter-hosted LLMs, persistent conversational memory, a local-first tool-calling framework, and a planned PC automation layer — designed for offline-capable, privacy-preserving everyday use.',
      features: 'Natural voice interaction pipeline\nPersistent conversational memory\nOpenRouter LLM integration\nModular tool-calling architecture\nPC automation capabilities (planned)',
      tech: 'Python, LLM APIs, Voice Recognition, Tool Calling, SQLite',
      highlights: 'Architecting a clean separation between the conversation manager, tool dispatcher, and response synthesiser to enable future multi-modal automation.',
      github: null,
      demo: null,
      status: 'in-development',
      color: '#6366f1',
      accent: '#6366f1',
      gradFrom: '#09081a',
      gradTo: '#100f2e',
      order: 3,
    },
  ];

  for (const p of projects) {
    const existing = await prisma.project.findFirst({ where: { title: p.title } });
    if (!existing) {
      await prisma.project.create({ data: p });
    }
  }

  // 7. Seed Experience
  const experiences = [
    {
      role: 'Social Media Sub Head',
      company: 'ACM Bennett University Student Chapter',
      logo: null,
      period: '2024 — Present',
      description: 'Leadership & Community',
      points: "Managed all digital channels and media assets for the university's ACM chapter, expanding community engagement by sharing security alerts and tech announcements.\nOrganized and captured promotional event photography and high-quality recap videography for technical workshops.\nSupervised, mentored, and assigned tasks to a junior content core team of 5 members, establishing consistent release schedules.",
      order: 0,
    },
    {
      role: 'Freelance Software Developer & Security Consultant',
      company: 'Independent / Self-Employed',
      logo: null,
      period: '2025 — Present',
      description: 'Freelance Engineering',
      points: 'Engineered and custom-configured security monitoring tools for clients using Python, automating Linux syslog audits and threat log matching.\nConstructed responsive full-stack dashboards using React, Next.js, and Flask backend APIs, ensuring proper environment configuration and validation.\nAdvised local clients on threat assessment protocols, secure session workflows, and credential handling best practices.',
      order: 1,
    },
    {
      role: 'Academic Projects & Security Researcher',
      company: 'Bennett University',
      logo: null,
      period: '2024 — Present',
      description: 'Academic & Development',
      points: 'Researched and integrated machine learning algorithms with web security protocols, deploying full-stack deep learning classifiers.\nDesigned safe notification dispatch structures and location services mapping for emergency emergency SOS setups (SAFEपथ platform).\nModeled systems networks parameters to simulate enterprise environments for SOC threat evaluation.',
      order: 2,
    },
    {
      role: 'SOC Analyst Intern / Software Developer Intern',
      company: 'Active Candidate',
      logo: null,
      period: 'Seeking Roles',
      description: 'Career Focus',
      points: 'Ready to contribute to enterprise operations centers, monitor network traffic, analyze security incidents, and write custom automation scripts.\nHighly familiar with log analytics, Python script creation, Next.js / TypeScript code bases, and OWASP security guidelines.\nCommitted to accelerating developer velocity while keeping defensive security controls tight.',
      order: 3,
    },
  ];

  for (const exp of experiences) {
    const existing = await prisma.experience.findFirst({ where: { role: exp.role, company: exp.company } });
    if (!existing) {
      await prisma.experience.create({ data: exp });
    }
  }

  // 8. Seed Skills & Categories
  const skillsData = [
    {
      name: 'Programming',
      color: '#f59e0b',
      order: 0,
      skills: [
        { name: 'Python', level: 'Proficient', exp: '3 Years', projects: 'SkinVision AI, Automated Log Analyzer, JARVIS AI Agent', desc: 'Used for backend API creation, deep learning classification pipeline builds, and raw logs regex parser script engineering.' },
        { name: 'Java', level: 'Amateur', exp: '2 Years', projects: 'Academic Algorithms, Object-Oriented structures', desc: 'Applied in college coursework to implement computational data structures, logical recursion, and algorithmic processes.' },
        { name: 'JavaScript', level: 'Amateur', exp: '3 Years', projects: 'SAFEपथ, Interactive Portfolio', desc: 'Underpins all interactive browser scripting, DOM tracking, cursor trailing interpolations, and animations.' }
      ],
    },
    {
      name: 'Web Development',
      color: '#00e5ff',
      order: 1,
      skills: [
        { name: 'React', level: 'Amateur', exp: '2.5 Years', projects: 'SAFEपथ, Portfolio', desc: 'Built modular component systems, interactive mapping grids, and responsive state handlers.' },
        { name: 'Next.js', level: 'Amateur', exp: '2 Years', projects: 'SkinVision AI, Portfolio App Router', desc: 'Leveraged Next.js App Router for layouts routing transitions, server-side dynamic analytics pipelines, and API hooks.' },
        { name: 'Flask', level: 'Amateur', exp: '2 Years', projects: 'SkinVision AI, JARVIS AI Agent', desc: 'Utilized as lightweight backend gateways to run Python inference classification scripts and process JSON client calls.' },
        { name: 'HTML5', level: 'Amateur', exp: '3 Years', projects: 'All Web Projects', desc: 'Document structure, accessibility semantics, and standard page templates.' },
        { name: 'CSS3', level: 'Amateur', exp: '3 Years', projects: 'All Web Projects', desc: 'Custom stylesheets layouts animations, responsive page view styles.' },
        { name: 'Tailwind CSS', level: 'Amateur', exp: '2.5 Years', projects: 'All Web Projects', desc: 'Used to write utility styling tokens, custom layouts responsive grids, and design system templates.' }
      ],
    },
    {
      name: 'Databases',
      color: '#10b981',
      order: 2,
      skills: [
        { name: 'MongoDB', level: 'Amateur', exp: '2 Years', projects: 'SAFEपथ', desc: 'Managed schema structures for geolocation heatmaps, user records, and threat reporting logs.' },
        { name: 'MySQL', level: 'Amateur', exp: '2.5 Years', projects: 'Academic Databases, Admin Analytics', desc: 'Constructed relational entity maps, transaction indexing, and optimized SQL procedures.' },
        { name: 'PostgreSQL', level: 'Amateur', exp: '1 Year', projects: 'Admin Analytics', desc: 'Set up database schemas, run migrations, and execute structured queries.' }
      ],
    },
    {
      name: 'Developer Tools',
      color: '#6366f1',
      order: 3,
      skills: [
        { name: 'Git & GitHub', level: 'Amateur', exp: '3 Years', projects: 'All Projects', desc: 'Controlled branches, semantic tags, release structures, actions automation workflows, and collaborative pull request audits.' },
        { name: 'VS Code', level: 'Amateur', exp: '3 Years', projects: 'All Projects', desc: 'Used as main local IDE environment.' },
        { name: 'Postman', level: 'Amateur', exp: '2 Years', projects: 'API Testing', desc: 'Tested REST backend APIs, endpoints headers, payloads formatting, and status responses.' }
      ],
    },
    {
      name: 'Operating Systems',
      color: '#ec4899',
      order: 4,
      skills: [
        { name: 'Windows', level: 'Amateur', exp: '4 Years', projects: 'All Projects', desc: 'Main operating system, local setups, administration scripts.' },
        { name: 'Linux', level: 'Amateur', exp: '3 Years', projects: 'Log Analytics, Scripting', desc: 'Configured servers, mapped syslog paths, script execution automation.' }
      ],
    },
  ];

  for (const cat of skillsData) {
    let category = await prisma.skillCategory.findFirst({ where: { name: cat.name } });
    if (!category) {
      category = await prisma.skillCategory.create({
        data: {
          name: cat.name,
          color: cat.color,
          order: cat.order,
        },
      });
    }

    for (let i = 0; i < cat.skills.length; i++) {
      const s = cat.skills[i];
      const existingSkill = await prisma.skill.findFirst({
        where: { name: s.name, categoryId: category.id },
      });
      if (!existingSkill) {
        await prisma.skill.create({
          data: {
            name: s.name,
            categoryId: category.id,
            level: s.level,
            exp: s.exp,
            projects: s.projects,
            desc: s.desc,
            order: i,
          },
        });
      }
    }
  }

  // 9. Seed Journey Milestones
  const milestones = [
    {
      year: '2006',
      title: 'Where It All Began',
      subtitle: 'Born in 2006',
      description: 'Every journey starts somewhere. Mine began with an endless curiosity about how things work and a fascination with technology that would eventually shape my career. Long before I wrote my first line of code, I was already drawn to computers, solving problems, and building things from scratch.',
      achievements: 'Discovered a natural affinity for puzzles, logical problems, and building mechanisms\nDeveloped an early curiosity about how software and hardware systems function under the hood\nEstablished a foundation of creative problem-solving and critical thinking',
      tech: 'Curiosity, Problem Solving, Logical Thinking',
      order: 0,
    },
    {
      year: '2017',
      title: 'The First Lines of Code',
      subtitle: 'Discovering Programming',
      description: 'This was the year I truly stepped into the world of programming. I began experimenting with Python, Java, and JavaScript, creating small games and simple applications. Each project taught me something new and fueled my passion for software development. What started as curiosity quickly became a hobby I wanted to pursue every day.',
      achievements: 'Wrote my very first scripts in Python and explored basic object-oriented concepts in Java\nCreated small custom text games, interactive scripts, and logical calculators\nCommitted to programming as a creative daily hobby outside school hours',
      tech: 'Python, Java, JavaScript, Logic Design',
      order: 1,
    },
    {
      year: '2020',
      title: 'Exploring Design',
      subtitle: 'UI/UX Design Journey',
      description: "As I became more comfortable with coding, I realized that great software isn't just about functionality—it's also about user experience. I started designing interfaces, experimenting with layouts, colors, and interactions, and learned how thoughtful UI/UX can transform an ordinary application into an enjoyable experience.",
      achievements: 'Studied visual hierarchy, typography alignments, and intuitive interface layouts\nExperimented with wireframing tools to sketch creative and clean interface pathways\nAligned visual empathy with codebase functions to build clean user flows',
      tech: 'Figma, UI/UX Design, Visual Hierarchy, Colors & Layouts',
      order: 2,
    },
    {
      year: '2021',
      title: 'Robotics & IoT',
      subtitle: 'Competition and Innovation',
      description: 'I participated in an IoT, Coding, and Robotics competition, where I collaborated on building technology-driven solutions. It was my first experience working on larger technical challenges under competitive conditions, strengthening my problem-solving skills and exposing me to hardware-software integration.',
      achievements: 'Collaborated in a team environment to map sensors, indicators, and microcontrollers to a working application\nProgrammed logic scripts to integrate hardware inputs dynamically under time pressure\nExposed to core robotics concepts, networking loops, and mechanical-software interfaces',
      tech: 'IoT Protocols, Robotics Systems, Arduino / C++, Team Collaboration',
      order: 3,
    },
    {
      year: '2024',
      title: 'A New Chapter',
      subtitle: 'Beginning My University Journey',
      description: "After graduating from school, I joined Bennett University to pursue a Bachelor's degree in Computer Science. University opened the door to larger-scale software development, collaboration with talented peers, and opportunities to transform ideas into real-world projects.",
      achievements: 'Admitted to Bennett University B.Tech CSE program to build technical foundations\nLearned version control processes with Git & GitHub and navigated Linux environments\nPartnered on collective developer tasks and projects with skilled peers',
      tech: 'Computer Science, Data Structures, Git & GitHub, Linux CLI',
      order: 4,
    },
    {
      year: '2025',
      title: 'Building, Leading & Securing',
      subtitle: 'Hackathons, Projects & Cybersecurity',
      description: "2025 became the year I accelerated my growth. I built SkinVision AI, Manifest, Jarvis, and several hackathon projects while diving deeper into backend engineering and cybersecurity. Alongside my technical journey, I served as the Social Media Sub Head of the ACM Student Chapter at Bennett University (2025–2026), managing the club's online presence, promoting events, and working with an incredible team to grow one of the university's most active technical communities.",
      achievements: 'Appointed Social Media Sub Head for the ACM Student Chapter at Bennett University (2025–2026)\nBuilt and shipped SkinVision AI, Manifest, Jarvis, and multiple hackathon prototypes\nAdvanced hands-on understanding of threat log intelligence and cybersecurity audits',
      tech: 'Cybersecurity, Web Security, Flask APIs, Next.js Frontend, ACM Leadership',
      order: 5,
    },
    {
      year: '2026',
      title: 'Startup & Scale',
      subtitle: 'Startup Journey',
      description: "Currently, I'm building a startup with a group of friends, leading backend development and cybersecurity. My focus has shifted from simply building applications to designing secure, scalable systems while continuing to explore AI, modern web technologies, and security-first software engineering.",
      achievements: 'Co-founded a tech startup alongside close friends\nArchitected reliable database structures, scalable APIs, and backend server codebases\nHardened cloud environments and established strict defensive credentials monitoring',
      tech: 'Backend Engineering, Startup Operations, API Scaling, Environment Security',
      order: 6,
    },
  ];

  for (const m of milestones) {
    const existing = await prisma.journeyMilestone.findFirst({ where: { year: m.year, title: m.title } });
    if (!existing) {
      await prisma.journeyMilestone.create({ data: m });
    } else {
      // update to make sure tech field gets filled on existing
      await prisma.journeyMilestone.update({
        where: { id: existing.id },
        data: { tech: m.tech }
      });
    }
  }

  // 10. Seed default Admin User if ADMIN_LINKEDIN_ID is configured
  const adminLinkedinId = process.env.ADMIN_LINKEDIN_ID;
  if (adminLinkedinId) {
    await prisma.user.upsert({
      where: { providerAccountId: adminLinkedinId },
      update: { role: 'ADMIN' },
      create: {
        provider: 'linkedin',
        providerAccountId: adminLinkedinId,
        name: 'Ishan Yadav',
        email: 'ishanyadav09@outlook.com',
        role: 'ADMIN',
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
