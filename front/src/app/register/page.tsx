"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import RegisterForm from "@/components/auth/RegisterForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (data: {
    userid: string;
    password: string;
    email: string;
  }) => {
    try {
      const response = await fetch(`${API_URL}/member/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "회원가입에 실패했습니다");
      }

      toast.success("회원가입 성공!", {
        description: "로그인 페이지로 이동합니다.",
      });
      router.push("/login");
    } catch (error) {
      toast.error("회원가입 실패", {
        description:
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          <RegisterForm onSubmit={handleRegister} />
        </div>
      </motion.div>
    </div>
  );
}
