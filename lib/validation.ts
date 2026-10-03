export const patterns = {
  mobile: /^[6-9]\d{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  pan: /^[A-Z]{5}\d{4}[A-Z]$/,
  aadhaar: /^\d{12}$/,
  pincode: /^[1-9]\d{5}$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  otp: /^\d{6}$/,
};

export function isValidMobile(value: string) {
  return patterns.mobile.test(value);
}

export function isValidEmail(value: string) {
  return patterns.email.test(value.trim());
}

/** Returns an error message for a required field, or undefined when valid. */
export function required(value: string | undefined, label: string) {
  return value && value.trim() ? undefined : `${label} is required`;
}

export function ageFromDob(dob: string, today: Date) {
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}
