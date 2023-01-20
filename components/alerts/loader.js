import { Dna } from "react-loader-spinner"

export const LoaderComp = ( ) => {
    return <div className="w-[100vw] h-[100vh] opacity-80 flex a    lign-baseline justify-center absolute bg-gray-400">
        <Dna visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
                wrapperStyle={{
                   alignSelf:"center"                
                }}
        />
    </div>
}