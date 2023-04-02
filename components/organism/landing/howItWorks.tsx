import { SignInButton } from '@components/atoms/buttons/button'
import styles from "./landing.module.css"

export function HowItWorks() {
	return (
        <div className='py-[3vh] lg:pt-[10vh]'>
        <div className={`h-auto px-[7%] lg:px-[10%] text-center lg:grid grid-rows-2 ${styles['howItWorks']}`}>
            <section className='flex lg:grid grid-cols-3 justify-between lg:h-[40vh]'>
                <section className='text-left'>
                    <p className='text-[#5D5FEF] my-6 lg:my-0 uppercase font-bold text-sm'>How Omerald Helps You</p>
                    <p className='sm:text-[37px] text-[24px] my-6 lg:my-0 font-[600]'>Simplifying Diagnostic Center Operations</p>
                    <p className='text-[#64607D] my-6 lg:my-0 font-light'>Omerald streamlines test selection, report generation, and branding updates for diagnostic centers</p>
                    <SignInButton style="hidden my-6 lg:my-4 lg:block rounded-full shodow-md my-4 mx-0">{"Get Started"}</SignInButton>
                </section>
                <section></section>
                <section className='hidden lg:block  text-left xl:pl-[20%] pr-[20%] pt-[20%]'>
                    <p className='text-[16px] font-[600] my-2'>View Exciting Analytics</p>
                    <p className='text-[#64607D] font-light'>From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.</p>
                </section>
            </section>
            <section className='lg:grid grid-cols-3 justify-between lg:h-[40vh]'>
                <section className='text-left my-6 lg:my-0 lg:p-[20%] lg:py-[30%]'>
                    <p className='text-[16px] font-[600] my-2'>Onboard Your Diagnostic centre</p>
                    <p className='text-[#64607D] font-light'>Party we years to order allow asked of. We so opinion friends me message as delight.</p>
                </section>
                <section className='text-left my-6 lg:my-0 lg:px-[10%]'>
                        <p className='text-[16px] font-[600] my-2'>Generate & Share Reports</p>
                        <p className='text-[#64607D] font-light'>Generate accurate reports for your patients quickly and easily with Omerald Diagnostic Center. Simply select the report type, fill in the form with the necessary values, and download your report as a PDF. You can also share your report with your patients by entering their name and number.</p>
                </section>
                <section className='block lg:hidden my-6 lg:my-0 text-left lg:pl-[20%] lg:pr-[20%] lg:pt-[20%]'>
                    <p className='text-[16px] font-[600] my-2'>View Exciting Analytics</p>
                    <p className='text-[#64607D] font-light'>From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.</p>
                </section>
                <section></section>
                <SignInButton style="block lg:hidden rounded-full shodow-md my-4 mx-0">{"Get Started"}</SignInButton>
            </section>

        </div>
        </div>
    )
}

