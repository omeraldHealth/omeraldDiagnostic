import { Footer } from "@components/molecules/footer";
import { Navbar } from "@components/molecules/navbar";
import { PageTemplate } from "@components/templates/pageTemplate";
import parse from 'html-react-parser';
import styles from "@styles/signIn.module.css"
import { getDiagnosticSetting } from "@utils";
import { useQueryGetData } from "utils/reactQuery";
import { Spinner } from "@components/atoms/loader";


export function InfoPage({detail}:any) {

    const {data:Info,isLoading} = useQueryGetData(["info",detail],getDiagnosticSetting+detail)
    const parsedHtml =Info?.data?.value && parse(Info?.data?.value);

	return (
        <PageTemplate>
            <div className={`pt-[1vh] ${styles["signInContainer"]}`}>
                <Navbar/>
                    <section className="max-w-[80%] m-auto h-auto my-40 sm:my-20 2xl:my-0 xl:min-h-[60vh]">
                        <p className="underline font-bold text-md my-10 uppercase">{detail}</p>
                        { parsedHtml ? parsedHtml:<p className="text-red-400">No Data</p>}
                    </section>
                    {isLoading && <Spinner/>}
                <Footer />
            </div>
        </PageTemplate>
    )
}

