import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import { ReactElement } from "react";

export default function PageLayout({children,}: {children: ReactElement}) {
  return (
    <div className="w-[100vw] min-h-[100vh] pt-6">
      <Navbar />
        <main >{children}</main>
      <Footer />
    </div>
  )
}   