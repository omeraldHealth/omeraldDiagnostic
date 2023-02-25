import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import { ReactElement } from "react";

export default function PageLayout({children,}: {children: ReactElement}) {
  return (
    <div className="h-[100vh] w-[100vw] px-[10%] pt-6">
      <Navbar />
        <main>{children}</main>
      <Footer />
    </div>
  )
}   