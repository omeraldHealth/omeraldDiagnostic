
// import Navbar from './navbar'
// import Footer from './footer'

import { ReactElement } from "react";

export default function PageLayout({children,}: {children: ReactElement}) {
  return (
    <>
      {/* <Navbar /> */}
        <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}   