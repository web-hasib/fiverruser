import { Footer } from "@/src/components/landingPage/(new components)/footer";
import Navbar from "@/src/components/landingPage/(new components)/Navber";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-black -mt-24">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
