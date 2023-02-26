import { SignInButton, SubscribeButton } from "@components/atoms/button/button"
import { Navbar } from "@components/molecules/navbar"
import { useState } from "react"
import {FaCheckCircle} from 'react-icons/fa'
import styles from "./landing.module.css"

export function LandingBanner() {
    const [phone,setPhone] = useState("")
    
	return (
        <div className={styles['landingBanner']}>
            <Navbar/>
            <section className="w-[70%] 2xl:w-[55%] px-[12%] my-[5%]">
                <p className="xl:font-[700] xl:text-[22px] xl:font-[700] xl:text-[22px]">Diagnostic Centre Solution in Single Platform.</p>
                <p className="xl:font-[700] xl:text-[50px]">Managing Diagnostic  Centre has never been easier</p>
                <p className="xl:font-[300] xl:text-[18px] pr-20 text-[#757095]">Omerald digitalises diagnostic centre's, offering website creation, test selection, report generation, and branding updates.</p>
                <section className='flex w-[90%] p-2 mt-6 bg-white shadow-xl'>
                    <span>
                        <label className="ml-2 font-light text-sm">Register with your phone number</label>
                        <input className='w-[100%] border-4 border-black bg-slate-50 text-slate-600 border-none focus:ring-0' type={"text"} placeholder="+917288292092" id="phone" name="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                    </span>
                      <SignInButton style={"bg-black text-white rounded-sm self-center w-[50%]"}>{"Subscribe"}</SignInButton>
                </section>
                <span className="flex my-8">
                    <p className="flex mr-4"><FaCheckCircle className="text-btnPrimary-600 self-center mr-2 "/> Free Register</p>
                    <p className="flex mx-4"><FaCheckCircle className="text-btnPrimary-600 self-center mr-2 "/>Great Service</p>
                </span>
            </section>
        </div>
        )
}

