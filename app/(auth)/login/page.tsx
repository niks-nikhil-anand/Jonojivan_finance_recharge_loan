import type { Metadata } from "next";
import { LoginForm } from "@/components/features/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Jonojivan with your mobile number and OTP.",
};

export default function LoginPage() {
  return <LoginForm />;
}
