import type { Metadata } from "next";
import { RegisterForm } from "@/components/features/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your Jonojivan account in under a minute.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
