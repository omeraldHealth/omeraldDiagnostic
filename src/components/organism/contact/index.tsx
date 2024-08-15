import React from "react";
import { Footer } from "@components/common/footer";
import { Navbar } from "@components/molecules/navbar";
import { Support } from "../dashboardTabs/settingsTabs/support";
import styles from "@styles/signIn.module.css";

const ContactPage: React.FC = () => {
  return (
    <div className={`pt-[1vh] ${styles["signInContainer"]}`}>
      <Navbar />
      <section className="max-w-[60%] m-auto h-auto my-40 sm:my-20 2xl:my-0 xl:h-[60vh] text-center">
        <p className="underline font-bold text-md my-10">
          Contact Us With Your Query
        </p>
        <Support />
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
