import { ColorRing } from "react-loader-spinner"

export const Spinner = () => {
    return <section className="fixed inset-0 flex justify-center items-center z-50">
            <section className="absolute text-center">
            <ColorRing visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
                wrapperStyle={{
                alignSelf:"center"                
                }}/>
        </section>
    </section>
}

