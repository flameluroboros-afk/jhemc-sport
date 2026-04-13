import Header from "@/components/Header";
import FooterJhemc from "@/components/FooterJhemc";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Header />
      {children}
      <FooterJhemc />
      <WhatsAppFloating />
    </>
  );
}
