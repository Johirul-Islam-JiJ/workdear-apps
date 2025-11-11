import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export type Service = {
  id: number;
  Icon: ({ color, size }: { color: string; size: number }) => React.JSX.Element;
  title: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    id: 1,
    Icon: ({ color, size }: { color: string; size: number }) => (
      <MaterialIcons name="work-history" size={size} color={color} />
    ),
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
    Icon: ({ color, size }: { color: string; size: number }) => (
      <FontAwesome6 name="check" size={size} color={color} />
    ),
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
    Icon: ({ color, size }: { color: string; size: number }) => (
      <MaterialCommunityIcons name="cash-lock-open" size={size} color={color} />
    ),
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
