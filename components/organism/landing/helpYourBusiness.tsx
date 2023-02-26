import {FaTrophy,FaHandSparkles,FaSun} from 'react-icons/fa'


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
        <div className='w-[100vw] h-[80vh] px-[10%] py-10 text-center'>
            <p className='font-[600] text-[40px]'>We help your business grow faster.</p>
            <p className='font-[400] text-[20px] text-[#64607D] w-[40%] m-auto my-6'>Omerald's efficient software solution accelerates business growth for diagnostic centre's.</p>
            <section className="flex gap-[2%] my-[7%] w-[100%] justify-around  ">
                {
                    helpBusiness.map(help => {
                        return <section  className="text-left bg-white w-[33%] h-[350px] p-10 rounded-lg shadow-md">
                        {help?.icon}
                        <p className="font-[500] text-[25px] my-4"> {help?.title}</p>
                        <p className="font-[400] text-[16px] text-gray-400 my-4"> {help?.description}</p>
                        <a className='absolute text-green-500'>Read More</a>
                    </section>
                    })
                }
               
            </section>
        </div>
        )
}

