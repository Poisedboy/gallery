import AdminSettings from "@/components/AdminSettings";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const SettingPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="mx-7 sm:mx-12 my-5 flex flex-col justify-center items-center">
      {session?.user.role === "USER" ? <AdminSettings /> : "USER"}
    </div>
  );
};

export default SettingPage;
