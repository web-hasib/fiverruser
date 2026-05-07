// "use client";
// import { Button } from "@/src/components/ui/button";
// import LogoutModal from "@/src/components/ui/modals/logout";
// import { openLogoutModal } from "@/src/redux/features/logoutModalSlice";
// import { useAppDispatch } from "@/src/redux/hook";

// export default function DashboardFooter() {
//   const dispatch = useAppDispatch();
//   return (
//     <div className="py-12 flex flex-col gap-4 w-full">
//       {/* 🔴 OPEN MODAL BUTTON */}
//       <Button variant="destructive" onClick={() => dispatch(openLogoutModal())}>
//         Logout
//       </Button>

//       {/* 🧠 Modal always mounted */}
//       <LogoutModal />
//     </div>
//   );
// }



"use client";

import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/src/redux/features/authSlices";
import { useSidebar } from "./SidebarProvider";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

export default function DashboardLogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isExpanded } = useSidebar();

  const handleLogout = () => {
    // 1️⃣ Remove cookie
    Cookies.remove("accessToken");

    // 2️⃣ Clear redux auth
    dispatch(logout());

    // 3️⃣ Redirect
    router.push("/");
  };

  return (
    <motion.button
      title="Logout"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className={cn(
        "flex items-center text-red-500 cursor-pointer transition-all text-sm font-medium hover:bg-red-500/10 group",
        isExpanded ? "gap-8 px-4 py-3 rounded-lg w-full -ml-2" : "justify-center size-10 mx-auto rounded-lg"
      )}
    >
      <div className="shrink-0">
        <LogOut size={18} />
      </div>
      {isExpanded && <span>Logout</span>}
    </motion.button>
  );
}
