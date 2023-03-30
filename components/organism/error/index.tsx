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
                    <div className="sm:h-[75vh] text-center">
                        <img src={notFound} className="sm:w-[30vw] w-[60vw] mb-10 mt-20 m-auto" alt="" />
                        <Link href={"/"}>
                            <button className="my-[2vh] md:w-[10vw] bg-orangeBg px-2 py-2 text-gray-700 font-bold rounded-md">Visit Home</button>
                        </Link>
                    </div>
                <Footer />
            </div>
        </PageTemplate>
    )
}

