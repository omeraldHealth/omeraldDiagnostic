
import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import SignInComponent from "@components/molecules/signIn";
import { PageTemplate } from "@components/templates/pageTemplate";
import styles from "./signIn.module.css"

export function SignIn() {
	return (
        <PageTemplate>
        <div className={`pt-[1vh] ${styles["signInContainer"]}`}>
            <Navbar/>
            <SignInComponent/>
            <Footer />
        </div>
        </PageTemplate>
        )
}

