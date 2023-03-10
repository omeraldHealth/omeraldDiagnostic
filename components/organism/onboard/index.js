
import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import { PageTemplate } from "@components/templates/pageTemplate";
import dynamic from "next/dynamic";

const OnboardComponents = dynamic(() => import('@components/molecules/onboard/index'))

const OnboardTemplate = () => {
	return (
        <PageTemplate>
            <div>
                <Navbar/>
                    <OnboardComponents/>
                <Footer />
            </div>
        </PageTemplate>
    )
}

export default OnboardTemplate;