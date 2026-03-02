import { Footer } from "@/src/components/landingPage/footer";
import Navbar from "@/src/components/landingPage/Navber";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return <div className="p-4"><Navbar />{children}<Footer /></div>;
}
