import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import { PageTemplate } from "@components/templates/pageTemplate";
import { notFound } from "@utils";
import Link from "next/link";
import styles from "@styles/signIn.module.css"

export function Error() {
	return (
        <PageTemplate>
            <div className={`pt-[1vh] ${styles["signInContainer"]}`}>
                <Navbar/>
                    <section className="max-w-[100%] h-auto my-32 sm:my-20 my-8 2xl:my-4 xl:min-h-[60vh] text-center">
                        <img src={notFound} className="w-[80vw] sm:w-[60vw] md:w-[30vw] mb-20 mt-20 m-auto" alt="" />
                        <Link href={"/"}>
                            <button className="my-[2vh] md:w-[10vw] bg-orange-300 px-2 py-2 text-gray-900 font-bold rounded-md">Visit Home</button>
                        </Link>
                    </section>
                <Footer />
            </div>
        </PageTemplate>
    )
}

