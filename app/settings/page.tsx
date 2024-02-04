"use client";
import AdminSettings from "@/components/AdminSettings";
import { authOptions } from "@/lib/auth";
import { IUser } from "@/types/Common.type";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SettingPage = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    router.push("/sign-in");
  }

  return (
    <div className="mx-7 sm:mx-12 my-5 flex flex-col justify-center items-center">
      {session?.user?.role === "ADMIN" ? <AdminSettings /> : "USER"}
    </div>
  );
};

export default SettingPage;
