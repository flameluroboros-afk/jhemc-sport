import Header from "@/components/Header";
import FooterJhemc from "@/components/FooterJhemc";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import Cursor from "@/components/Cursor";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Cursor />
      <Header />
      {children}
      <FooterJhemc />
      <WhatsAppFloating />
    </>
  );
}
