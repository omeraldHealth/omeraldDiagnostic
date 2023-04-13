import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner"
import ErrorComp from "../alerts/error";

export const Spinner = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [error,setError] = useState(false)

    useEffect(()=>{
        // Wait for 10 seconds before showing the message
        const timer = setTimeout(() => {
            setError(true)
        }, 30000);
    
        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
    },[])

    return <section className="fixed inset-0 flex justify-center items-center z-50">
            <section className="absolute text-center">
            {
                error?<ErrorComp/>: <ColorRing visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
                wrapperStyle={{
                alignSelf:"center"                
            }}/>
            }
           

        </section>
    </section>
}

