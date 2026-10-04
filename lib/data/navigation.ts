export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Loans", href: "/loans" },
  { label: "Recharge & Bills", href: "/recharge" },
  { label: "Offers", href: "/offers" },
  { label: "EMI Calculator", href: "/loans/emi-calculator" },
  { label: "Help", href: "/support" },
];

export const moreMenu: { title: string; items: NavItem[] }[] = [
  {
    title: "Loans",
    items: [
      { label: "Personal Loan", href: "/loans/personal-loan", icon: "💳" },
      { label: "Business Loan", href: "/loans/business-loan", icon: "🏪" },
      { label: "Check Eligibility", href: "/loans/eligibility", icon: "📄" },
      { label: "EMI Calculator", href: "/loans/emi-calculator", icon: "🧮" },
      { label: "Apply for Loan", href: "/loans/apply", icon: "💰" },
    ],
  },
  {
    title: "Your account",
    items: [
      { label: "Transactions", href: "/transactions", icon: "🧾" },
      { label: "Offers", href: "/offers", icon: "🎁" },
      { label: "Login", href: "/login", icon: "👤" },
      { label: "Register", href: "/register", icon: "✍️" },
    ],
  },
  {
    title: "Help & info",
    items: [
      { label: "Help & Support", href: "/support", icon: "💬" },
      { label: "FAQ", href: "/faq", icon: "❓" },
      { label: "About Us", href: "/about", icon: "🏢" },
      { label: "Contact", href: "/contact", icon: "📮" },
    ],
  },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Loans",
    items: [
      { label: "Personal Loan", href: "/loans/personal-loan" },
      { label: "Business Loan", href: "/loans/business-loan" },
      { label: "Loan Eligibility", href: "/loans/eligibility" },
      { label: "EMI Calculator", href: "/loans/emi-calculator" },
      { label: "Apply for Loan", href: "/loans/apply" },
    ],
  },
  {
    title: "Recharge & Bills",
    items: [
      { label: "Mobile Recharge", href: "/recharge/mobile" },
      { label: "DTH Recharge", href: "/recharge/dth" },
      { label: "Electricity", href: "/recharge/electricity" },
      { label: "FASTag", href: "/recharge/fastag" },
      { label: "All Services", href: "/recharge" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Offers", href: "/offers" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help & Support", href: "/support" },
      { label: "FAQ", href: "/faq" },
      { label: "Transactions", href: "/transactions" },
    ],
  },
];

export const contactInfo = {
  phone: "9435266783",
  phoneHref: "tel:9435266783",
  whatsapp: "+91 9435266783",
  whatsappHref: "https://wa.me/919435266783",
  email: "support@jonojivan.in",
  emailHref: "mailto:support@jonojivan.in",
  hours: "Mon–Sat, 9 AM – 8 PM",
  address: "Biswanath Cahariali District Biswanath Assam Pin 784176",
};
