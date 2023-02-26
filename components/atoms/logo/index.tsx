import Link from "next/link"
import Logo from "../nav/logo"

export const LogoImage = () => {
    return <Link href={"/"}>
                <span className='flex justify-center'>
                    <Logo width={80} height={80}/>
                    <p className='font-sans hidden sm:block sm:text-lg sm:font-bold self-center'>OMERALD DIAGNOSTICS</p>
                </span>
            </Link>
}