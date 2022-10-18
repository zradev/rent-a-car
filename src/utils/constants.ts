import {
  FaFingerprint,
  FaShieldAlt,
  FaPhoneVolume,
  FaGem,
  FaMicroscope,
  FaFilter,
} from "react-icons/fa";

export const CAR_TYPES = [
  { image: require("../assets/images/ui/luxury.png"), name: "Luxury" },
  { image: require("../assets/images/ui/suv.png"), name: "SUV" },
  { image: require("../assets/images/ui/estate.png"), name: "Estate" },
  { image: require("../assets/images/ui/economy.png"), name: "Economy" },
  { image: require("../assets/images/ui/cargo.png"), name: "Cargo" },
];

export const CARDS = [
  {
    image: FaFingerprint,
    label: "Unique Features",
    text: "We believe that every customer should receive the best possible service. That's why we offer tailor made solutions, unique for each of our clients.",
  },
  {
    image: FaShieldAlt,
    label: "Safe & Sanitized Vehicles",
    text: "Experience world class safety with our unique 4 Point Safety program.",
  },
  {
    image: FaPhoneVolume,
    label: "Customer Support",
    text: "We are available 24/7. Do not hesitate to contact us.",
  },
  {
    image: FaFilter,
    label: "Extensive Options",
    text: "We are here to meet your most demanding requirements. We give you unlimited opportunities.",
  },
  {
    image: FaMicroscope,
    label: "Attention to Details",
    text: "We believe that attention to detail is important in every aspect. The whole process at M Rent-a-car is dedicated to you and your wishes.",
  },
  {
    image: FaGem,
    label: "Loyalty Benefits",
    text: "We offer exclusive offers and VIP bonuses to our loyal customers.",
  },
];
