import { Icons } from "@/components/icons";
import { CodeIcon, HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Rifki Gunawan",
  initials: "RG",
  url: "https://linkedin.com/in/rifkygnwanz",
  location: "Bandung, West Java",
  locationLink: "https://www.google.com/maps/place/bandung",
  description:
  "Mobile Developer focused on Flutter, expert in modern apps with responsive design, seamless API integration, and state management solutions.",
  summary:
    "Currently I'm very focused on developing mobile applications using Flutter. With a keen interest in creating smooth and efficient mobile apps, I have dedicated my time and efforts to mastering Flutter and honing my skills.",
  avatarUrl: "/me.png",
  skills: [
    "Flutter",
    "Dart",
    "Git",
    "HTML",
    "CSS",
    "PHP",
    "UI/UX",
    "Git Flow",
    "Slicing",
    "layouting"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/#projects", icon: CodeIcon, label: "Projects" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "rifkygnwanz@gmail.com",
    tel: "+6285759145398",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/rifkygnwanz",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rifkygnwanz/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "Instagram",
        url: "https://www.instagram.com/rifkygnwanz/",
        icon: Icons.instagram,

        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "https://dub.sh/dillion-youtube",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "rifkygnwanz@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "PT Gebra Kreativa Global",
      href: "https://oxinos.com/",
      badges: [],
      location: "On site",
      title: "Mobile Developer", 
      logoUrl: "/oxinos.png",
      start: "May 2024",
      end: "Now",
      description:
        "Contributed to the development of a mobile application project focused on creating customizable features for users. Responsibilities included debugging and resolving issues in the Flutter codebase to enhance app stability. Collaborated using the Gitflow workflow to ensure structured code management and smooth feature integration. Additionally, optimized app performance to improve responsiveness, efficiency, and user experience.",
    },
  ],
  education: [
    {
      school: "SMK LPPM RI 1 Bandung",
      href: "https://smklppmribdg.sch.id/",
      degree: "Software Engineering",
      logoUrl: "/lppm.png",
      start: "2021",
      end: "2024",
    }
  ],
  projects: [
    {
      title: "Goolink",
      href: "https://documenter.getpostman.com/view/32681373/2sAXjJ6CxP",
      dates: "May 2024 - August 2024",
      active: true,
      description:
        "Goolink is mobile apps project using Flutter, where I'm spearheading the slicing process and seamless API integration. Focused on creating a smooth, responsive UI while ensuring flawless connectivity with the backend for an intuitive user experience.",
      technologies: [
        "Flutter",
        "Dart",
      ],
      links: [
        {
          type: "Documentation",
          href: "https://documenter.getpostman.com/view/32681373/2sAXjJ6CxP",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/IqbalAnshr/Ticket_Yay-API",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ticketyay.png",
      video:
        "",
    },
    {
      title: "Do-Nors API (Mobile)",
      href: "",
      dates: "May 2024 - Juny 2024",
      active: true,
      description:
        "Developed an API using Node.js and Express.js to connect organ seekers with donors. Implemented JWT for secure authentication, real-time chat with Socket.io, and search features based on organ and location. Utilized MySQL with Sequelize ORM for data management and deployed the application on Alibaba Cloud with Nginx as a reverse proxy.",
      technologies: [
        "Node.js",
        "Express.js",
        "MySQL",
        "Sequelize",
        "JWT",
        "Socket.io",
        "Nginx",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/IqbalAnshr/Donors-Api",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/Do-Nors.png",
      video: "",
    },
    {
      title: "Website Penyedia Jasa Elektronik Tekku",
      href: "https://tekku.co.id",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Designed a comprehensive ERD for an efficient and well-organized database structure. Developed key website features from frontend to backend using Laravel, Inertia.js, Vue.js, and Tailwind for a dynamic, responsive user experience. Integrated secure authentication with Google and Facebook and implemented seamless payment processing with Midtrans.",
      technologies: [
        "Laravel",
        "Inertia.js",
        "Vue.js",
        "TailwindCSS",
        "Midtrans",
      ],
      links: [
        {
          type: "Website",
          href: "https://tekku.id",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/tekku.png",
      video: "",
    },
  ],
} as const;
