export const siteConfig = {
  name: "Mohamed Suhaib",
  title: "Mohamed Suhaib — AI Developer & Embedded Engineer",
  description:
    "Portfolio of Mohamed Suhaib — AI Developer, Embedded Engineer, Full Stack Developer, and Computer Vision Enthusiast.",
  url: "https://suhaib.dev",
  ogImage: "https://suhaib.dev/og.png",
  links: {
    github: "https://github.com/MohamedSuhaib",
    linkedin: "https://linkedin.com/in/MohamedSuhaib27",
    email: "mailto:mohamedsuhaib167@gmail.com",
    leetcode: "https://leetcode.com/u/Mohamed_Suhaib27",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],
};

export const personalInfo = {
  name: "Mohamed Suhaib",
  greeting: "Hi, I'm Mohamed Suhaib",
  roles: [
    "AI Developer",
    "Embedded Engineer",
    "Full Stack Developer",
    "Computer Vision Enthusiast",
  ],
  bio: "🚨🚨         Everything below is a placeholder text. Original details will will be provided by the user When he is Free. you can submit ur quires in the form or u can mail me.......",
  location: "Hosur, India",
  resumeUrl: "/resume.pdf",
};

export const stats = {
  projects: 8,
  certifications: 2,
  technologies: 20,
  problemsSolved: 150,
};

export const skills = {
  Programming: ["Python", "TypeScript", "JavaScript", "C", "C++", "Rust"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
  Backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
  "AI & ML": [
    "TensorFlow",
    "PyTorch",
    "OpenCV",
    "YOLO",
    "Scikit-learn",
    "LangChain",
  ],
  "Embedded Systems": [
    "Arduino",
    "Raspberry Pi",
    "ESP32",
    "ARM Cortex",
    "RTOS",
    "Embedded C",
  ],
  Tools: [
    "Git",
    "Docker",
    "Linux",
    "VS Code",
    "Figma",
    "Postman",
    "Jupyter",
  ],
};

export const projects = [
  {
    slug: "ai-smart-cctv",
    title: "AI Smart CCTV Surveillance System",
    description:
      "Intelligent surveillance system using computer vision and deep learning for real-time threat detection and alerting.",
    image: "/projects/cctv.jpg",
    technologies: ["Python", "YOLO", "OpenCV", "TensorFlow", "Flask"],
    github: "https://github.com/MohamedSuhaib/ai-cctv",
    demo: "https://ai-cctv-demo.vercel.app",
    features: [
      "Real-time object detection and tracking",
      "Facial recognition for authorized personnel",
      "Motion detection with zone configuration",
      "Instant alerts via email and SMS",
      "Cloud storage with 30-day retention",
    ],
    architecture:
      "Uses YOLOv8 for detection, DeepSort for tracking, Flask backend, React dashboard.",
  },
  {
    slug: "water-quality-monitoring",
    title: "Water Quality Monitoring System Using AI",
    description:
      "AI-powered IoT system that monitors water quality parameters in real-time using ML predictions.",
    image: "/projects/water.jpg",
    technologies: [
      "Python",
      "TensorFlow",
      "Arduino",
      "IoT",
      "FastAPI",
      "React",
    ],
    github: "https://github.com/MohamedSuhaib/water-quality",
    demo: "https://water-quality-demo.vercel.app",
    features: [
      "Real-time pH, turbidity, TDS monitoring",
      "ML-based anomaly detection",
      "Automated alerts for contamination",
      "Historical data analytics dashboard",
      "Solar-powered sensor deployment",
    ],
    architecture:
      "ESP32 sensors feed data to FastAPI, ML model predicts anomalies, React dashboard visualizes.",
  },
  {
    slug: "computer-vision-projects",
    title: "Computer Vision Projects",
    description:
      "Collection of computer vision projects including object detection, segmentation, and OCR systems.",
    image: "/projects/vision.jpg",
    technologies: ["Python", "OpenCV", "YOLO", "PyTorch", "MediaPipe"],
    github: "https://github.com/MohamedSuhaib/computer-vision",
    demo: "https://cv-projects-demo.vercel.app",
    features: [
      "Real-time object detection and segmentation",
      "Hand gesture recognition system",
      "OCR for document digitization",
      "License plate recognition",
      "Face mask detection system",
    ],
    architecture:
      "Modular CV pipelines using OpenCV, PyTorch models, FastAPI serving.",
  },
  {
    slug: "iot-projects",
    title: "IoT Projects",
    description:
      "Embedded IoT solutions for smart home automation, environmental monitoring, and industrial control.",
    image: "/projects/iot.jpg",
    technologies: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "Node.js"],
    github: "https://github.com/MohamedSuhaib/iot-projects",
    demo: "https://iot-demo.vercel.app",
    features: [
      "Smart home automation with voice control",
      "Environmental monitoring dashboard",
      "Industrial equipment predictive maintenance",
      "Wireless sensor network implementation",
      "Cloud-based device management",
    ],
    architecture:
      "ESP32/Arduino nodes communicate via MQTT, Node.js backend, React dashboard.",
  },
];

export const experience = [
  {
    title: "AI Developer",
    company: "Tech Corp",
    period: "2024 - Present",
    description:
      "Developing AI-powered solutions for real-world problems. Building computer vision systems and LLM-based applications.",
  },
  {
    title: "Embedded Systems Engineer",
    company: "Embedded Solutions Ltd",
    period: "2023 - 2024",
    description:
      "Designed and implemented firmware for ARM Cortex-M microcontrollers. Developed IoT sensor networks.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "WebDev Studio",
    period: "2022 - 2023",
    description:
      "Built full-stack web applications using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines.",
  },
];

export const certifications = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
    image: "/certs/dl.jpg",
    link: "https://coursera.org/verify/specialization/xxx",
  },
  {
    title: "Embedded Systems Professional",
    issuer: "UT Austin",
    date: "2024",
    image: "/certs/embedded.jpg",
    link: "https://edx.org/verify/xxx",
  },
  {
    title: "AWS Machine Learning",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "/certs/aws.jpg",
    link: "https://aws.amazon.com/verify/xxx",
  },
  {
    title: "TensorFlow Developer",
    issuer: "Google",
    date: "2023",
    image: "/certs/tf.jpg",
    link: "https://tensorflow.org/verify/xxx",
  },
  {
    title: "Computer Vision Nanodegree",
    issuer: "Udacity",
    date: "2023",
    image: "/certs/cv.jpg",
    link: "https://udacity.com/verify/xxx",
  },
  {
    title: "IoT Specialization",
    issuer: "UC Irvine",
    date: "2022",
    image: "/certs/iot.jpg",
    link: "https://coursera.org/verify/xxx",
  },
];

export const education = [
  {
    degree: "B.Tech Electronics and Communication",
    school: "SRM University AP",
    year: "2023 - 2027",
    description: "Focus on embedded systems, signal processing, and AI.",
  },
];

export const loaderWords = [
  "AI",
  "Developer",
  "Embedded",
  "Engineer",
  "Future",
  "Portfolio",
  "Python",
  "Vision",
  "Machine Learning",
  "IoT",
  "NextJS",
  "Innovation",
  "Algorithms",
  "Electronics",
  "Neural",
  "System",
  "DEVELOPER",
  "DREAMER",
  "DESIGNER",
  "INNOVATOR",
];

export const blogPosts = [
  {
    slug: "building-ai-surveillance",
    title: "Building AI-Powered Surveillance Systems",
    excerpt: "A deep dive into creating intelligent CCTV systems with YOLO and DeepSort.",
    date: "2024-03-15",
    readingTime: "8 min",
    tags: ["AI", "Computer Vision", "Python"],
  },
  {
    slug: "embedded-ml-guide",
    title: "Getting Started with Embedded Machine Learning",
    excerpt: "How to deploy ML models on microcontrollers using TensorFlow Lite.",
    date: "2024-02-20",
    readingTime: "10 min",
    tags: ["Embedded", "ML", "TFLite"],
  },
  {
    slug: "iot-water-quality",
    title: "IoT Water Quality Monitoring with AI",
    excerpt: "Building a complete IoT system for real-time water quality analysis.",
    date: "2024-01-10",
    readingTime: "12 min",
    tags: ["IoT", "AI", "Embedded"],
  },
];

export const matrixChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオ";
