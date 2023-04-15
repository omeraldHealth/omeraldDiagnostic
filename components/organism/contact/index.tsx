import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import { PageTemplate } from "@components/templates/pageTemplate";
import { notFound } from "@utils";
import Link from "next/link";
import styles from "@styles/signIn.module.css"
import { Support } from "../settingsTabs/support";

export function ContactPage() {
	return (
        <PageTemplate>
            <div className={`pt-[1vh] ${styles["signInContainer"]}`}>
                <Navbar/>
                    <section className="max-w-[60%] m-auto h-auto my-40 sm:my-20 2xl:my-0 xl:h-[60vh] text-center">
                        <p className="underline font-bold text-md my-10">Contact Us With Your Query</p>
                        <Support/>
                    </section>
                <Footer />
            </div>
        </PageTemplate>
    )
}

