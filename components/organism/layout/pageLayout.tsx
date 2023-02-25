import { Navbar } from "@components/molecules/navbar";
import { ReactElement } from "react";

export default function PageLayout({children,}: {children: ReactElement}) {
  return (
    <div className="px-20 py-6">
      <Navbar />
        <main>{children}</main>
      {/* <Footer /> */}
    </div>
  )
}   