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
    "Firebase",
    "Admob",
    "Git",
    "Google Play Console",
    "App Store Connect",
    "Payment Gateway",
    "WordPress",
    "Layout Design",
    "UI/UX",
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
      href: "https://oxinos.id/",
      badges: [],
      location: "On site",
      title: "Mobile Developer",
      logoUrl: "/oxinos.jpeg",
      start: "April 2024",
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
      title: "Ojekfood - Food Delivery",
      slug: "ojekfood",
      href: "/projects/ojekfood",
      dates: "Nov 2025 - Mar 2026",
      active: true,
      description:
        "A comprehensive food delivery ecosystem comprising three distinct applications: Customer, Merchant, and Driver. The platform facilitates seamless online food ordering, merchant inventory management, and real-time delivery tracking for drivers.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Customer",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.ojekfood.customer&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Merchant",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.ojekfood.merchant&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Driver",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.ojekfood.driver&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Official Website",
          href: "https://ojekfood.web.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/ojekfood/ojekfood.png",
      video: "",
      screenshotDir: "ojekfood/screenshoot",
      screenshots: [],
    },
    {
      title: "JemputAja - Travel App",
      slug: "jemputaja",
      href: "/projects/jemputaja",
      dates: "Jan 2025 - Mar 2026",
      active: true,
      description:
        "A comprehensive shuttle and intercity travel booking platform consisting of Customer and Driver applications. It enables users to easily schedule trips, choose specific routes, select their preferred seats, and track their assigned fleet in real-time.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Customer",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.jemputaja.passenger&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Driver",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.jemputaja.partner&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Official Website",
          href: "https://jemputaja.web.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/jemputaja/jemputaja.png",
      video: "",
      screenshotDir: "jemputaja/screenshoot",
      screenshots: [],
    },
    {
      title: "Tovio - E-Commerce",
      slug: "tovio",
      href: "/projects/tovio",
      dates: "Nov 2025 - Jan 2026",
      active: true,
      description:
        "A trusted secondhand marketplace platform focused on safe and verified transactions. The ecosystem consists of a Customer app for seamless buying and selling, and a dedicated Inspector app used for professional quality control and item verification.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Customer",
          href: "https://play.google.com/store/apps/details?id=id.tovio.customer&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Inspection",
          href: "https://play.google.com/store/apps/details?id=id.tovio.inspector&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Official Website",
          href: "https://tovio.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/tovio/tovio.png",
      video: "",
      screenshotDir: "tovio/screenshoot",
      screenshots: [],
    },
    {
      title: "Neokids - Children's Storybook",
      slug: "neokids",
      href: "/projects/neokids",
      dates: "Aug 2025 - Nov 2025",
      active: true,
      description:
        "An interactive, child-friendly mobile learning application. It provides engaging educational content with colorful layouts, fluid animations, and intuitive navigation specifically designed to enhance children's digital learning experiences.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Apps",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.neokids&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Official Website",
          href: "https://neokids.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/neokids/neokids.png",
      video: "",
      screenshotDir: "neokids/screenshoot",
      screenshots: [],
    },
    {
      title: "TJSL Klik By Jasamarga",
      slug: "tjsl-klik",
      href: "/projects/tjsl-klik",
      dates: "Jul 2025",
      active: true,
      description:
        "An internal corporate platform for Jasa Marga to manage and monitor Social and Environmental Responsibility (TJSL) programs. Responsible for the end-to-end publishing process on both Google Play Store and Apple App Store, ensuring full compliance with platform-specific standards.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Play Store",
          href: "https://play.google.com/store/apps/details?id=id.co.jasamarga.tjslklik&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "App Store",
          href: "https://apps.apple.com/us/app/tjsl-klik/id6755711880",
          icon: <Icons.appstore className="size-3" />,
        },
      ],
      image: "/tjsl-klik/tjsl-klik.png",
      video: "",
      screenshotDir: "tjsl-klik/screenshoot",
      screenshots: [],
    },
    {
      title: "Shareform - Form Builder",
      slug: "shareform",
      href: "/projects/shareform",
      dates: "Jun 2025 - Jul 2025",
      active: true,
      description:
        "A dynamic mobile platform for creating custom digital forms, questionnaires, and surveys. It streamlines data collection and sharing processes across mobile devices, enabling users to effortlessly gather and analyze responses.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Apps",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.shareform&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Official Website",
          href: "https://shareform.web.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/shareform/shareform.png",
      video: "",
      screenshotDir: "shareform/screenshoot",
      screenshots: [],
    },
    {
      title: "Profilix - Digital Profile",
      slug: "profilix",
      href: "/projects/profilix",
      dates: "May 2025 - Jun 2025",
      active: true,
      description:
        "An interactive digital presence and profile management application. It equips users with tools to build, personalize, and share their professional profiles, providing a streamlined way to manage personal branding and networking.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Apps",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.profilix&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Official Website",
          href: "https://profilix.id/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/profilix/profilix.png",
      video: "",
      screenshotDir: "profilix/screenshoot",
      screenshots: [],
    },
    {
      title: "Cashfio - Money Management",
      slug: "cashfio",
      href: "/projects/cashfio",
      dates: "May 2025",
      active: true,
      description:
        "A modern financial management and tracking application. It helps users monitor their income and expenses through an intuitive dashboard, providing clear financial insights, budgeting tools, and secure transaction tracking.",
      technologies: ["Flutter", "Dart"],
      links: [
        {
          type: "Apps",
          href: "https://play.google.com/store/apps/details?id=com.oxinos.cashfio&pcampaignid=web_share",
          icon: <Icons.playstore className="size-3" />,
        },
        {
          type: "Official Website",
          href: "https://cashfio.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/cashfio/cashfio.png",
      video: "",
      screenshotDir: "cashfio/screenshoot",
      screenshots: [],
    },
    {
      title: "Marvelous Tours",
      slug: "marvelous-tours",
      href: "/projects/marvelous-tours",
      dates: "Apr 2025 - Aug 2025",
      active: true,
      description:
        "A comprehensive travel booking platform supporting reservations for tours, flights, and hotels. It simplifies travel planning by offering unified search, seamless booking flows, and real-time availability updates all within a single application.",
      technologies: ["Flutter", "Dart"],
      links: [
        // {
        //   type: "Apps",
        //   href: "https://play.google.com/store/apps/details?id=id.marvelous&pcampaignid=web_share",
        //   icon: <Icons.playstore className="size-3" />,
        // },
        // {
        //   type: "Official Website",
        //   href: "https://marveloustours.id/",
        //   icon: <Icons.globe className="size-3" />,
        // },
      ],
      image: "/marvelous-tours/marvelous-tours.png",
      video: "",
      screenshotDir: "marvelous-tours/screenshoot",
      screenshots: [],
    },
    {
      title: "Fatwa Plus",
      slug: "fatwa-plus",
      href: "/projects/fatwa-plus",
      dates: "Feb 2025 - Apr 2025",
      active: true,
      description:
        "A dedicated mobile video platform focused on Islamic learning and inspiration. It serves as an educational hub where users can discover, stream, and bookmark high-quality religious lectures, inspirational content, and customized user feeds.",
      technologies: ["Flutter", "Dart"],
      links: [
        // {
        //   type: "Apps",
        //   href: "https://play.google.com/store/apps/details?id=id.fatwaplus&pcampaignid=web_share",
        //   icon: <Icons.playstore className="size-3" />,
        // },
        // {
        //   type: "Official Website",
        //   href: "https://fatwaplus.id/",
        //   icon: <Icons.globe className="size-3" />,
        // },
      ],
      image: "/fatwa-plus/fatwa-plus.png",
      video: "",
      screenshotDir: "fatwa-plus/screenshoot",
      screenshots: [],
    },
    {
      title: "Partai Persatuan Pembangunan Jabar",
      slug: "ppp-jabar",
      href: "/projects/ppp-jabar",
      dates: "Jan 2025 - Feb 2025",
      active: true,
      description:
        "The official responsive website for a regional political organization in West Java. It serves as the primary digital portal for public relations, highlighting organizational news, community programs, official statements, and event schedules.",
      technologies: ["WordPress"],
      links: [
        // {
        //   type: "Website",
        //   href: "https://pppjabar.or.id/",
        //   icon: <Icons.globe className="size-3" />,
        // },
      ],
      image: "/ppp-jabar/ppp-jabar.png",
      video: "",
      screenshotDir: "ppp-jabar/screenshoot",
      screenshots: [],
    },
    {
      title: "Point of Sale",
      slug: "pos",
      href: "/projects/pos",
      dates: "Nov 2024 - Jan 2025",
      active: true,
      description:
        "A suite of three distinct Point of Sale (POS) applications custom-built to support different business models: retail toys, restaurants, and snack shops. The apps streamline daily operations by managing digital product catalogs, tracking active inventory, and generating real-time sales reports.",
      technologies: ["Flutter", "Dart"],
      links: [],
      image: "/pos/pos.png",
      video: "",
      screenshotDir: "pos/screenshoot",
      screenshots: [],
    },
    {
      title: "Goolink - Link in Bio",
      slug: "goolink",
      href: "/projects/goolink",
      dates: "May 2024 - Aug 2024",
      active: true,
      description:
        "A versatile link-in-bio platform that empowers users to consolidate multiple content links into a single, shareable URL. It offers extensive profile personalization, centralized link management, and comprehensive engagement tracking.",
      technologies: ["Flutter", "Dart"],
      links: [],
      image: "/goolink/goolink.png",
      video: "",
      screenshotDir: "goolink/screenshoot",
      screenshots: [],
    },
  ],
} as const;
