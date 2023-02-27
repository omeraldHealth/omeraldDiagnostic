
import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import OnboardComponent from "@components/molecules/onboard";
import { PageTemplate } from "@components/templates/pageTemplate";
import styles from "./onboard.module.css"

export function OnboardComp() {
	return (
        <PageTemplate>
        <div className={`pt-[1vh] ${styles["signInContainer"]}`}>
            <Navbar/>
                <OnboardComponent/>
            <Footer />
        </div>
        </PageTemplate>
    )
}

