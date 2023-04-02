import { SignInButton } from "@components/atoms/buttons/button";
import {
  BodyText_1,
  BodyText_2,
  HeaderText_1,
  TitleText,
} from "@components/atoms/font";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "@components/atoms/loader";
import styles from "./landing.module.css";
import dynamic from "next/dynamic";

const Navbar = dynamic(
  () => import("@components/molecules/navbar/index").then((res) => res.Navbar),
  { loading: () => <Spinner /> }
);
const LandingBanner = () => {
    const [phone,setPhone] = useState("")
    
	return (
        <div className={styles['landingBanner']}>
            <Navbar/>
                <section className="w-[96%] sm:w-[90%] xl:w-[70%] 2xl:w-[65%] px-6 sm:px-8 lg:px-[12%]  my-[10%] lg:my-[5%]">
                   
                    <p className="my-4 lg:my-2"> <TitleText style={""}>Diagnostic Centre Solution in Single Platform.</TitleText></p>
                    <p className="my-4 lg:my-2"> <HeaderText_1 style={"my-2"}>Managing Diagnostic  Centre has never been easier</HeaderText_1></p>
                    <BodyText_1 style="xl:w-[80%]">Omerald digitalises diagnostic centre's, offering website creation, test selection, report generation, and branding updates.</BodyText_1>
                    <section className='flex sm:w-[90%] p-1 sm:p-2 mt-6 bg-white shadow-xl'>
                        <span>
                            <label className="sm:ml-2 font-light text-gray-500 text-xs sm:text-sm">Register with your phone number</label>
                            <input className='w-[100%] outline-none  px-3 focus:ring-offset-0 border-black bg-slate-50 text-slate-600 border-none focus:ring-0' type={"text"} placeholder="+917288292092" id="phone" name="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                        </span>
                        <SignInButton style={"bg-black text-white rounded-sm self-center w-[60%] sm:w-[50%]"}>{"Subscribe"}</SignInButton>
                    </section>
                    <span className="flex my-8">
                        <span className="flex mr-4"><FaCheckCircle className="text-btnPrimary-600 self-center mr-2 "/><BodyText_2 style="self-center">Free Register</BodyText_2></span>
                        <span className="flex"><FaCheckCircle className="text-btnPrimary-600 self-center mr-2 "/><BodyText_2 style="self-center">Great Service</BodyText_2></span>
                    </span>
                </section>
        </div>
    )
}

//   return (
//     <div className={styles["landingBanner"]}>
//       <Navbar />
//       <section className="w-[96%] sm:w-[90%] xl:w-[70%] 2xl:w-[65%] px-6 sm:px-8 lg:px-[12%]  my-[10%] lg:my-[5%]">
//         <TitleText style={"my-4"}>
//           Diagnostic Centre Solution in Single Platform.
//         </TitleText>
//         <HeaderText_1 style={"my-2"}>
//           Managing Diagnostic Centre has never been easier
//         </HeaderText_1>
//         <BodyText_1 style="xl:w-[80%]">
//           Omerald digitalises diagnostic centre's, offering website creation,
//           test selection, report generation, and branding updates.
//         </BodyText_1>
//         <section className="flex sm:w-[90%] p-1 sm:p-2 mt-6 bg-white shadow-xl">
//           <span>
//             <label className="sm:ml-2 font-light text-gray-500 text-xs sm:text-sm">
//               Register with your phone number
//             </label>
//             <input
//               className="w-[100%] border-4 border-black bg-slate-50 text-slate-600 border-none focus:ring-0"
//               type={"text"}
//               placeholder="+917288292092"
//               id="phone"
//               name="phone"
//               value={phone}
//               onChange={(e) => {
//                 setPhone(e.target.value);
//               }}
//             />
//           </span>
//           <SignInButton
//             style={
//               "bg-black text-white rounded-sm self-center w-[60%] sm:w-[50%]"
//             }
//           >
//             {"Subscribe"}
//           </SignInButton>
//         </section>
//         <span className="flex my-8">
//           <span className="flex mr-4">
//             <FaCheckCircle className="text-btnPrimary-600 self-center mr-2 " />
//             <BodyText_2 style="self-center">Free Register</BodyText_2>
//           </span>
//           <span className="flex">
//             <FaCheckCircle className="text-btnPrimary-600 self-center mr-2 " />
//             <BodyText_2 style="self-center">Great Service</BodyText_2>
//           </span>
//         </span>
//       </section>
//     </div>
//   );
// };

export default LandingBanner;
