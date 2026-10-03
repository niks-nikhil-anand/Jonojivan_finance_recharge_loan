import { ageFromDob, isValidEmail, isValidMobile, patterns, required } from "@/lib/validation";

export const applicationFields = [
  // Personal
  "fullName",
  "mobile",
  "email",
  "dob",
  "gender",
  "pincode",
  "city",
  // Employment
  "employmentType",
  "monthlyIncome",
  "organisation",
  "experience",
  // Loan
  "loanType",
  "amount",
  "tenure",
  "purpose",
  // KYC
  "pan",
  "aadhaar",
  "address",
  "kycConsent",
  // Documents (file names only — nothing is uploaded)
  "idProof",
  "addressProof",
  "incomeProof",
  "photo",
  // Review
  "terms",
] as const;

export type FieldName = (typeof applicationFields)[number];
export type ApplicationValues = Record<FieldName, string>;
export type ApplicationErrors = Partial<Record<FieldName, string>>;

export interface StepProps {
  values: ApplicationValues;
  errors: ApplicationErrors;
  set: (field: FieldName, value: string) => void;
}

export const emptyApplication = Object.fromEntries(applicationFields.map((f) => [f, ""])) as ApplicationValues;

export const steps = ["Personal", "Employment", "Loan", "KYC", "Documents", "Review"] as const;

export const purposeOptions = {
  personal: ["Medical", "Wedding", "Travel", "Home renovation", "Education", "Debt consolidation", "Other"],
  business: ["Working capital", "Inventory purchase", "Equipment / machinery", "Business expansion", "Other"],
};

export const tenureOptions = [12, 18, 24, 36, 48, 60];

type Validator = (v: ApplicationValues) => ApplicationErrors;

function compact(errors: ApplicationErrors) {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v)) as ApplicationErrors;
}

function ageOn(dob: string) {
  return ageFromDob(dob, new Date());
}

export const validators: Validator[] = [
  (v) =>
    compact({
      fullName: v.fullName.trim().length < 3 ? "Enter your full name as per PAN" : undefined,
      mobile: isValidMobile(v.mobile) ? undefined : "Enter a valid 10-digit mobile number",
      email: isValidEmail(v.email) ? undefined : "Enter a valid email address",
      dob: !v.dob ? "Date of birth is required" : ageOn(v.dob) < 21 || ageOn(v.dob) > 65 ? "Applicants must be 21–65 years old" : undefined,
      gender: required(v.gender, "Gender"),
      pincode: patterns.pincode.test(v.pincode) ? undefined : "Enter a valid 6-digit PIN code",
      city: required(v.city, "City"),
    }),
  (v) =>
    compact({
      employmentType: required(v.employmentType, "Employment type"),
      monthlyIncome: Number(v.monthlyIncome) >= 10000 ? undefined : "Enter a monthly income of at least ₹10,000",
      organisation: required(v.organisation, v.employmentType === "salaried" ? "Company name" : "Business name"),
      experience: required(v.experience, "Experience"),
    }),
  (v) =>
    compact({
      loanType: required(v.loanType, "Loan type"),
      amount: Number(v.amount) >= 50000 && Number(v.amount) <= 5000000 ? undefined : "Enter an amount between ₹50,000 and ₹50,00,000",
      tenure: required(v.tenure, "Tenure"),
      purpose: required(v.purpose, "Purpose"),
    }),
  (v) =>
    compact({
      pan: patterns.pan.test(v.pan) ? undefined : "Enter a valid PAN, e.g. ABCDE1234F",
      aadhaar: patterns.aadhaar.test(v.aadhaar) ? undefined : "Enter your 12-digit Aadhaar number",
      address: v.address.trim().length < 10 ? "Enter your full current address" : undefined,
      kycConsent: v.kycConsent ? undefined : "Please provide consent to continue",
    }),
  (v) =>
    compact({
      idProof: required(v.idProof, "Identity proof"),
      addressProof: required(v.addressProof, "Address proof"),
      incomeProof: required(v.incomeProof, "Income proof"),
    }),
  (v) => compact({ terms: v.terms ? undefined : "Please accept the terms to submit" }),
];
