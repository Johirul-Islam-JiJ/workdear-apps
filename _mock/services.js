import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";

export const services = [
  {
    id: 1,
    icon: MdWorkHistory,
    title: "Find Work",
    description:
      "Access thousands of high-quality projects from verified clients worldwide",
    features: [
      "Find jobs from verified clients",
      "Get paid securely through our platform",
      "Work from anywhere, at any time",
      "Secure payment protection",
      "Real-time notifications",
      "Advanced filtering system",
    ],
  },
  {
    id: 2,
    icon: FaCheck,
    title: "Post Jobs",
    description:
      "Connect with skilled professionals and get your projects completed efficiently",
    features: [
      "Post jobs with detailed requirements",
      "Receive applications from qualified freelancers",
      "Communicate with freelancers through our platform",
      "Talent matching algorithm",
      "Quality assurance",
      "Milestone-based payments",
    ],
  },
  {
    id: 3,
    icon: FaRegMoneyBillAlt,
    title: "Secure Payments",
    description:
      "Enjoy fast, secure, and reliable payment processing with multiple options",
    features: [
      "Multiple payment methods",
      "Secure payment processing",
      "Refund policy",
      "Fraud protection",
      "24/7 customer support",
      "Payment tracking",
    ],
  },
];
