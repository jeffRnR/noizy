import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  benefitCard1,
  benefitCard2,
  benefitCard3,
  benefitCard4,
  benefitCard5,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
  noizy_3,
  noizy_2,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "#",
    //feautres
  },
  {
    id: "1",
    title: "Events",
    url: "#events",
    //feautres
  },
  {
    id: "2",
    title: "Terms",
    url: "#terms",
    //how-to-use
  },
  {
    id: "3",
    title: "Album",
    url: "#album",
    //roadmap
  },
  {
    id: "4",
    title: "Playlist",
    url: "#playlist",
    //roadmap
  },
  {
    id: "5",
    title: "Membership",
    url: "#membership",
    //roadmap
  },
  {
    id: "6",
    title: "Contact",
    url: "#contact",
    //onlyMobile: true,
    //sign-up
  },
  {
    id: "7",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Membership",
    description:
      "The membership fee includes a one off payment of KES 7500 and a monthly subscription of 150",
    oneOffPrice: "7500",
    monthlyPrice: "150",
    features: [
      "Exclussive merch",
      "Exclussive events",
      "Free VIP passes for all events with VIP slots",
      "Discounted tickets on some events",
    ],
  },
];

export const events = [
  {
    id: "0",
    title: "Noizy Night 1.1",
    date: "Sat 30th November, 2024 8pm - Sun 1st December, 2024 5am",
    venue: "Undecided",
    backgroundUrl: "./src/assets/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: noizy_3,
    light: true,
  },
  {
    id: "1",
    title: "Noizy Night 1.2",
    venue: "Undecided",
    date: "Sat 30th November, 2024 8pm - Sun 1st December, 2024 5am",
    backgroundUrl: benefitCard3,
    iconUrl: benefitIcon3,
    imageUrl: noizy_3,
    light: true,
  },
];

export const socials = [
  {
    id: "0",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "2",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
];
