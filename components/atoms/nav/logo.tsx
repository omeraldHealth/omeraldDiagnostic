import Link from "next/link"

export const LogoImage = () => {
    return <Link href={"/"}>
                <span className='flex justify-center'>
                    <Logo width={80} height={80}/>
                    <p className='font-sans hidden sm:block sm:text-lg sm:font-bold self-center'>OMERALD DIAGNOSTICS</p>
                </span>
            </Link>
}

export const DashboardLogo = () => {
    return  <div className="pt-5 pb-4 overflow-y-auto">
    <Link href="/" >
    <div className="flex items-center flex-shrink-0 px-4">
        <img
            src={"https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png"}
            className="w-[50px] sm:w-[40px] rounded-full"
        />
      <span className="text-white font-semibold text-xl ml-4 tracking-wider">
        Omerald
      </span>
    </div>
    </Link>
  </div>
}

export const Logo = () => (
	<img
        src={"https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png"}
        className="w-[50px] sm:w-[70px]"
    />
)