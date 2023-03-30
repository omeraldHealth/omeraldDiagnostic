import { SignInButton } from '@components/atoms/buttons/button'
import { BodyText_1, BodyText_2, HeaderText_1, HeaderText_2, TitleText, TitleText_2 } from '@components/atoms/font'
import {FaTrophy,FaHandSparkles,FaSun} from 'react-icons/fa'
import styles from "./landing.module.css"


const helpBusiness = [
    {
        "title":"Streamlined Operations",
        "description":"Omerald's software simplifies the process of selecting tests, generating reports, and updating branding information, reducing overhead costs and improving productivity",
        "icon":  <FaTrophy className='text-btnPrimary-600' size={"40px"} />

    },
    {
        "title":"Enhanced Customer Experience",
        "description":"Omerald's efficient software solution provides a seamless experience for customers, with simplified test selection, report generation, and sharing.",
        "icon": <FaHandSparkles className='text-btnPrimary-600' size={"40px"} />

    },
    {
        "title":"Improved Business Growth",
        "description":"Omerald's  solution accelerates business growth for diagnostic centers, with branding updates and website creation to attract new customers and retain existing ones.",
        "icon":<FaSun className='text-btnPrimary-600' size={"40px"} />
    }
]

export function HelpYourBusiness() {
	return (
        <div className={`h-auto px-[4%] sm:px-[10%] py-40 sm:py-10 text-center ${styles['helpBusiness']}`}>
            <HeaderText_2 style='mt-10 sm:mt-0'>We help your business grow faster.</HeaderText_2>
            <BodyText_1 style='lg:w-[40%] m-auto my-6'>Omerald's efficient software solution accelerates business growth for diagnostic centre's.</BodyText_1>
            <section className="lg:flex gap-[2%] my-[7%] w-[100%] justify-around  ">
                {
                    helpBusiness.map((help,index) => {
                        return <section key={index} className="text-left bg-white my-10 lg:my-0 lg:w-[33%] h-auto p-10 rounded-lg shadow-md">
                        {help?.icon}
                        <TitleText_2 style='my-4'> {help?.title}</TitleText_2>
                        <BodyText_2 style='text-gray-400 my-4' > {help?.description}</BodyText_2>
                        <a className='absolute text-green-500'>Read More</a>
                    </section>
                    })
                }
            </section>
        </div>
        )
}

