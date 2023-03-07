
import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import { PageTemplate } from "@components/templates/pageTemplate";
import dynamic from "next/dynamic";

const OnboardComponent = dynamic(() => import('@components/molecules/onboard'))

export function OnboardComp() {
	return (
        <PageTemplate>
        <div>
            <Navbar/>
                <OnboardComponent/>
            <Footer />
        </div>
        </PageTemplate>
    )
}

