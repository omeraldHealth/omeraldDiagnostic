import { UserLayout } from '@components/templates/pageTemplate';
import { Support } from '@components/organism/settingsTabs/support';

interface ContactProps {}

// Contact component for handling contact information
const Contact: React.FC<ContactProps> = () => {
  return (
    <UserLayout tabName="Admin Omerald | Contact">
      {/* Section containing the contact information */}
      <section className="max-w-[60%] m-auto h-auto my-40 sm:my-20 2xl:my-0 xl:h-[60vh] text-center">
        {/* Render the Support component for contact details */}
        <div className='my-10 mx-auto pt-16 border border-green '>
          <Support />
        </div>
      </section>
    </UserLayout>
  );
};

export default Contact;
