import {
  BodyText_1,
  BodyText_2,
  HeaderText_1,
  TitleText,
} from "@components/atoms/font";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./landing.module.css";

const LandingBanner = () => {
  const [phone,setPhone] = useState("")
    
	return (
        <div className={styles['landingBanner']}>
                <section className="w-[96%] sm:w-[90%] xl:w-[70%] 2xl:w-[65%] px-6 sm:px-8 lg:px-[12%]  my-[10%] lg:my-[5%]">
                    <div className="my-4 lg:my-2"> <TitleText style={""}>Diagnostic Centre Solution in Single Platform.</TitleText></div>
                    <div className="my-4 lg:my-2"> <HeaderText_1 style={"my-2"}>Managing Diagnostic  Centre has never been easier</HeaderText_1></div>
                    <BodyText_1 style="xl:w-[80%]">Omerald digitalises diagnostic centre's, offering website creation, test selection, report generation, and branding updates.</BodyText_1>
                    <span className="flex my-8">
                        <span className="flex mr-4"><FaCheckCircle className="text-indigo-600 self-center mr-2 "/><BodyText_2 style="self-center">Free Register</BodyText_2></span>
                        <span className="flex"><FaCheckCircle className="text-indigo-600 self-center mr-2 "/><BodyText_2 style="self-center">Great Service</BodyText_2></span>
                    </span>
                </section>
        </div>
    )
}

export default LandingBanner;
