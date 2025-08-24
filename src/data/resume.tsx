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
  avatarUrl: "/meoxinos.png",
  skills: [
    "Flutter",
    "Dart",
    "Layout Design",
    "WordPress",
    "UI/UX",
    "PHP",
    "PhpMyAdmin",
    "Git",
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
      email: {
        name: "Send Email",
        url: "mailto:rifkygnwanz@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Oxinos",
      href: "https://oxinos.io/",
      badges: [],
      location: "On site",
      title: "Mobile Developer",
      logoUrl: "/oxinos.jpeg",
      start: "May 2024",
      end: "Now",
      description: "",
      // description:
      //   "Contributed to the development of a mobile application project focused on creating customizable features for users. Responsibilities included debugging and resolving issues in the Flutter codebase to enhance app stability. Collaborated using the Gitflow workflow to ensure structured code management and smooth feature integration. Additionally, optimized app performance to improve responsiveness, efficiency, and user experience.",
    },
  ],
  education: [
    {
      school: "SMK LPPM RI 1 Bandung",
      href: "https://smklppmribdg.sch.id/",
      degree: "Software Engineering",
      logoUrl: "/lppmri.jpg",
      start: "2021",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Marvelous Tours",
      href: "https://play.google.com/store/apps/details?id=id.marvelous&pcampaignid=web_share",
      dates: "Apr 2025 - August 2025",
      active: true,
      description:
        "Developed the mobile frontend for Marvelous Tours to support search, booking, and management across tours, flights, and hotels. Implemented pixel-perfect UI slicing, REST integrations with BLoC for Tours & Flights and NDJSON streaming for Hotels with real-time list rendering.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Apps",
          href: "https://play.google.com/store/apps/details?id=id.marvelous&pcampaignid=web_share",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Website",
          href: "https://marveloustours.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/marveloustours.png",
      video: "",
    },
    {
      title: "Fatwa Plus ",
      href: "https://fatwaplus.id/",
      dates: "Feb 2025 - Apr 2025",
      active: true,
      description:
        "Developed the mobile frontend for Fatwa Plus, a video platform for Islamic learning and inspiration. Implemented pixel-perfect UI slicing into modular, reusable components (dark mode–ready) and integrated REST APIs for feed, categories, video detail/streaming, bookmarking, and search.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Apps",
          href: "https://play.google.com/store/apps/details?id=id.fatwaplus&pcampaignid=web_share",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Website",
          href: "https://fatwaplus.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/fatwaplus.png",
      video: "",
    },
    {
      title: "Point of Sale",
      href: "https://www.mmshop.id/",
      dates: "Nov 2024 - Jan 2025",
      active: true,
      description:
        "UI slicing from design into modular, reusable Flutter components. REST API integrations; and performance optimizations (infinite scroll, lazy loading, skeleton states, response caching).\n\n- MM Toys: product catalog, cart/checkout, inventory management, sales analytics.\n- POS Padang: menu & orders, checkout, inventory/stock tracking, daily sales reports.\n- POS Snack: product catalog, cart/checkout, inventory sync, sales reports.",
      technologies: ["Flutter", "Dart"],
      links: [],
      image: "/allpos.png",
      video: "",
    },
    {
      title: "Goolink",
      href: "https://goolink.id/",
      dates: "May 2024 - August 2024",
      active: true,
      description:
        "Developed the mobile frontend for Goolink, a link-in-bio platform for managing and sharing multiple contents from a single link. Implemented pixel-perfect UI slicing into modular, reusable components and integrated REST APIs for link management, profile personalization (themes, bio, social icons), sharing (QR codes & deep links), and analytics (clicks, CTR, geo/device).",
      technologies: ["Flutter", "Dart"],
      links: [],
      image: "/goolink.png",
      video: "",
    },
    {
      title: "Partai Persatuan Pembangunan Jawa Barat",
      href: "https://pppjabar.or.id/",
      dates: "Jan 2025 - Feb 2025",
      active: true,
      description:
        "Design & development for PPP Jabar (WordPress). Implemented responsive page and listing layouts, customized templates and navigation, and fully populated site content with consistent metadata. Built a lightweight child theme with reusable blocks (news, events, statements), structured information architecture. Delivered an SEO-ready setup (permalinks, meta/Open Graph, sitemap) and Added accessibility checks and security hardening (roles/permissions, backups).",
      technologies: ["WordPress"],
      links: [
        {
          type: "Website",
          href: "https://pppjabar.or.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/pppjabarnew.png",
      video: "",
    },
  ],
} as const;
