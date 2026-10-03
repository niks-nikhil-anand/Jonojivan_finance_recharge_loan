export const issueCategories = [
  { id: "recharge", label: "Recharge Issue", icon: "📱", description: "Failed or delayed recharge" },
  { id: "payment", label: "Payment Issue", icon: "💳", description: "Money deducted, bill not updated" },
  { id: "loan", label: "Loan Issue", icon: "💰", description: "Application status & documents" },
  { id: "refund", label: "Refund Issue", icon: "↩️", description: "Refund not received" },
  { id: "account", label: "Account Issue", icon: "👤", description: "Login, OTP & profile" },
  { id: "other", label: "Other", icon: "💬", description: "Anything else" },
] as const;

export type IssueCategoryId = (typeof issueCategories)[number]["id"];
