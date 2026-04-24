// ============================================================
//  PORTFOLIO CONFIG — Edit this file to update ALL content.
//  No need to touch any component or CSS file.
// ============================================================

// ─────────────────────────────────────────────
//  SITE META
// ─────────────────────────────────────────────
export const siteMeta = {
  title: "Your Name | Portfolio",
  description: "Personal portfolio showcasing projects, experience, and media work.",
  favicon: "/favicon.ico",
};

// ─────────────────────────────────────────────
//  PROFILE / ABOUT
// ─────────────────────────────────────────────
export const profile = {
  name: "Your Full Name",
  tagline: "Developer · Photographer · Drone Pilot",
  bio: `Hi! I'm a passionate developer and creative media professional.
I love building impactful digital experiences and capturing the world through my lens —
whether from the ground or thousands of feet in the air with my drone.
I'm always looking for opportunities to merge technology with creativity.`,
  avatar: "/images/avatar.png",  // Replace with your photo path
  location: "Dhaka, Bangladesh",
  email: "your.email@example.com",
  socials: [
    { label: "GitHub",    icon: "FaGithub",    url: "https://github.com/yourusername" },
    { label: "LinkedIn",  icon: "FaLinkedin",  url: "https://linkedin.com/in/yourprofile" },
    { label: "Facebook",  icon: "FaFacebook",  url: "https://facebook.com/yourprofile" },
    { label: "Instagram", icon: "FaInstagram", url: "https://instagram.com/yourhandle" },
    { label: "YouTube",   icon: "FaYoutube",   url: "https://youtube.com/@yourchannel" },
  ],
  skills: [
    "JavaScript", "React", "Node.js", "HTML & CSS",
    "Python", "Git & GitHub", "Figma", "Adobe Premiere Pro",
    "DaVinci Resolve", "Adobe Lightroom", "DJI Drones",
  ],
};

// ─────────────────────────────────────────────
//  EDUCATION
// ─────────────────────────────────────────────
export const education = [
  {
    id: "edu1",
    institution: "Daffodil International University",
    degree: "B.Sc. in Computer Science & Engineering",
    duration: "2021 – Present",
    location: "Dhaka, Bangladesh",
    logo: "", // Optional: "/images/diu-logo.png"
    description: "Studying core CS subjects including algorithms, data structures, networking, and software engineering.",
  },
  {
    id: "edu2",
    institution: "Your College Name",
    degree: "Higher Secondary Certificate (HSC) — Science",
    duration: "2018 – 2020",
    location: "City, Bangladesh",
    logo: "",
    description: "Completed HSC with focus on Physics, Chemistry, and Mathematics.",
  },
  {
    id: "edu3",
    institution: "Your School Name",
    degree: "Secondary School Certificate (SSC) — Science",
    duration: "2016 – 2018",
    location: "City, Bangladesh",
    logo: "",
    description: "Completed SSC with A+ grade in the science group.",
  },
];

// ─────────────────────────────────────────────
//  EXPERIENCE
// ─────────────────────────────────────────────
export const experience = [
  {
    id: "exp1",
    company: "Company / Organization Name",
    role: "Junior Software Developer",
    duration: "Jun 2024 – Present",
    type: "Full-time",        // Full-time | Part-time | Freelance | Internship
    location: "Dhaka, Bangladesh",
    logo: "",
    points: [
      "Developed and maintained web applications using React and Node.js.",
      "Collaborated with cross-functional teams to deliver product features.",
      "Optimized application performance reducing load time by 40%.",
    ],
  },
  {
    id: "exp2",
    company: "Freelance",
    role: "Media & Content Creator",
    duration: "2022 – Present",
    type: "Freelance",
    location: "Remote",
    logo: "",
    points: [
      "Provided photography and videography services for events and brands.",
      "Conducted aerial drone shoots for real-estate and travel clients.",
      "Edited and delivered professional video content with DaVinci Resolve.",
    ],
  },
];

// ─────────────────────────────────────────────
//  CERTIFICATES & ACHIEVEMENTS
// ─────────────────────────────────────────────
export const certificates = [
  {
    id: "cert1",
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "March 2024",
    category: "Development",
    image: "",   // Optional: "/images/certs/react-cert.png"
    link: "https://udemy.com/certificate/your-id",
  },
  {
    id: "cert2",
    title: "Google UX Design Professional Certificate",
    issuer: "Google / Coursera",
    date: "January 2024",
    category: "Design",
    image: "",
    link: "https://coursera.org/verify/your-id",
  },
  {
    id: "cert3",
    title: "Drone Pilot License",
    issuer: "Civil Aviation Authority of Bangladesh",
    date: "2023",
    category: "Aviation",
    image: "",
    link: "",
  },
  {
    id: "cert4",
    title: "National Science Olympiad — Silver Medal",
    issuer: "Bangladesh Science Olympiad",
    date: "2019",
    category: "Achievement",
    image: "",
    link: "",
  },
];

// ─────────────────────────────────────────────
//  PROJECTS
// ─────────────────────────────────────────────
export const projects = [
  {
    id: "proj1",
    title: "CGPA Calculator",
    description: "A web app for students to calculate their CGPA with multiple grading systems and a clean UI. Supports custom subjects and credits.",
    category: "Educational",   // Personal | Career | Educational
    tags: ["React", "JavaScript", "CSS"],
    image: "",    // "/images/projects/cgpa.png"
    liveUrl: "https://your-cgpa-app.vercel.app",
    repoUrl: "https://github.com/yourusername/cgpa-calculator",
    featured: true,
  },
  {
    id: "proj2",
    title: "Portfolio Website",
    description: "This very portfolio site — a template-driven React application with two major sections: Main Portfolio and Media Portfolio.",
    category: "Personal",
    tags: ["React", "Vite", "CSS"],
    image: "",
    liveUrl: "",
    repoUrl: "https://github.com/yourusername/myportfolio",
    featured: true,
  },
  {
    id: "proj3",
    title: "LensLink — Photography Management",
    description: "A service management platform for photographers and videographers to handle bookings, clients, and invoices.",
    category: "Career",
    tags: ["React", "Node.js", "MongoDB"],
    image: "",
    liveUrl: "",
    repoUrl: "https://github.com/yourusername/lenslink",
    featured: false,
  },
  {
    id: "proj4",
    title: "DIU Cover Page Generator",
    description: "A web tool for Daffodil International University students to generate formatted assignment cover pages instantly.",
    category: "Educational",
    tags: ["React", "HTML", "CSS"],
    image: "",
    liveUrl: "",
    repoUrl: "https://github.com/yourusername/diu-cover-page",
    featured: false,
  },
];

// ─────────────────────────────────────────────
//  MEDIA PORTFOLIO
// ─────────────────────────────────────────────

// HOW TO ADD PHOTOS:
//   1. Drop your image file into: public/media/photography/  (or /drone/)
//   2. Add an entry below with src: "/media/photography/your-file.jpg"

export const media = {

  photography: [
    {
      id: "ph1",
      title: "City Night Portrait",
      src: "/media/photography/photo1.png",
      description: "Street portrait with bokeh city lights.",
      date: "2024",
    },
    {
      id: "ph2",
      title: "Mountain Lake at Sunrise",
      src: "/media/photography/photo2.png",
      description: "Nature landscape captured at golden hour.",
      date: "2024",
    },
    {
      id: "ph3",
      title: "Urban Architecture",
      src: "/media/photography/photo3.png",
      description: "Looking up through a forest of glass and steel.",
      date: "2023",
    },
  ],

  // HOW TO ADD VIDEOS:
  //   Paste the YouTube embed URL:
  //   https://www.youtube.com/embed/VIDEO_ID
  videography: [
    {
      id: "vid1",
      title: "Travel Cinematic Reel 2024",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "A cinematic compilation of my travels across Bangladesh.",
      date: "2024",
    },
    {
      id: "vid2",
      title: "Product Video — Brand Shoot",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Commercial product video shot for a local lifestyle brand.",
      date: "2024",
    },
  ],

  drone: [
    {
      id: "dr1",
      title: "Valley at Golden Hour",
      src: "/media/drone/drone1.png",
      description: "Aerial shot over a misty mountain valley.",
      date: "2024",
    },
    {
      id: "dr2",
      title: "Coastal City Lights",
      src: "/media/drone/drone2.png",
      description: "Night aerial over a coastal cityscape.",
      date: "2023",
    },
  ],
};
