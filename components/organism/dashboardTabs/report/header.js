
import { PhoneFilled } from '@ant-design/icons';
import { MailIcon } from '@heroicons/react/solid';
import { Image } from "antd";
import { EnvelopeIcon } from '@heroicons/react/20/solid';
const logo = "https://res.cloudinary.com/drjut62wv/image/upload/v1677945620/omerald/diagnosticCenter/onlyOmeraldLogo_kwbcj8.png"

const Header = ({record}) => {

    return (
      <div className='border-b pb-4 p-8 text-left'>
        <div className="header flex text-left justify-between items-center">
          <div className='flex'>
            <section className='mr-4'>
              <Image src={logo} alt="logo" width={80} height={80} />
            </section>
            <section>
              <h1 className="text-3xl font-bold">OMERALD DIAGNOSTIC </h1>
              <p className="text-md">Accurate | Caring | Instant</p>
            </section>
          </div>
          <div className="text-right">
            <p><PhoneFilled className='w-6 text-sm text-orange-500'/> Phone: +91 86886 31831</p>
            <p className='flex'><EnvelopeIcon className='w-5 text-sm text-orange-500 mr-2'/>Email: support@omerald.com</p>
          </div>
        </div>
        <p className='text-lg ml-[9%]'>#001, 3rd Floor, Hustle Hub HSR Layout, Opposite Acko Bengaluru 560084</p>
      </div>
    );
  };
  
  export default Header;
  