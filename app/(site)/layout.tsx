import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <div className="pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Footer />
      </div>
      <MobileBottomNav />
    </>
  );
}
