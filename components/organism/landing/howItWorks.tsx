import { SignInButton } from '@components/atoms/button/button'
import styles from "./landing.module.css"

export function HowItWorks() {
	return (
        <div className='pt-[10vh]'>
        <div className={`w-[100vw] h-[100vh] px-[10%] text-center grid grid-rows-2 ${styles['howItWorks']}`}>
            <section className='grid grid-cols-3 justify-between h-[40vh]'>
                <section className='text-left'>
                    <p className='text-[#5D5FEF] uppercase font-bold text-sm'>How Omerald Helps You</p>
                    <p className='text-[37px] font-[600]'>Simplifying Diagnostic Center Operations</p>
                    <p className='text-[#64607D] font-light'>Omerald streamlines test selection, report generation, and branding updates for diagnostic centers</p>
                    <SignInButton style="rounded-full shodow-md my-4 mx-0">{"Get Started"}</SignInButton>
                </section>
                <section></section>
                <section className='text-left pl-[20%] pr-[20%] pt-[20%]'>
                    <p className='text-[16px] font-[600] my-2'>View Exciting Analytics</p>
                    <p className='text-[#64607D] font-light'>From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.</p>
                </section>
            </section>
            <section className='grid grid-cols-3 justify-between h-[40vh]'>
                <section className='text-left p-[20%] py-[30%]'>
                    <p className='text-[16px] font-[600] my-2'>Onboard Your Diagnostic centre</p>
                    <p className='text-[#64607D] font-light'>Party we years to order allow asked of. We so opinion friends me message as delight.</p>
                </section>
                    <section className='text-left px-[10%]'>
                        <p className='text-[16px] font-[600] my-2'>Generate & Share Reports</p>
                        <p className='text-[#64607D] font-light'>Generate accurate reports for your patients quickly and easily with Omerald Diagnostic Center. Simply select the report type, fill in the form with the necessary values, and download your report as a PDF. You can also share your report with your patients by entering their name and number.</p>
                    </section>
                <section></section>
            </section>
        </div>
        </div>
    )
}

