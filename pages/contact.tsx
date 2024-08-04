import { UserLayout } from '@components/templates/pageTemplate';
import { Support } from '@components/organism/dashboardTabs/settingsTabs/support';
import DynamicFormGenerator from '@components/common/form/dynamicForm';
import { mailImage } from '@utils';

interface ContactProps {}

// Contact component for handling contact information
const Contact: React.FC<ContactProps> = () => {
  const contactForm = [
    {"name":"subject","type":"text","label":"Subject","required":true},
    {"name":"message","type":"text","label":"message","required":true},
    {"name":"description","type":"description","label":"description","required":true}
  ]

  return (
    <UserLayout tabDescription='Contact' tabName="Admin Diagnostic | Contact">
      <div className='min-h-[70vh] border-t-2'>
        <section className="max-w-[60%] border-2 m-auto my-20 text-center">
          {/* Render the Support component for contact details */}
          <section className='flex flex-col gap-20 lg:flex-row w-[100%] justify-start lg:justify-center my-10 py-2'>
              <section className='w-full md:w-[100%] lg:w-[40%] hidden md:flex'>
                <section>
                <span className='text-left'>
                  <p className='font-bold'>Avin Mednologies Private Limited</p>
                  <address><b>Address:</b> 3-1-325/2, 3rdFloor Near AK bhavan hall Kachiguda Nimboliadda, Hyderabad 500027 TELANGANA</address>
                  <p><b>Contact:</b> 9769105223</p>
                  <p><b>Email:</b> bod@omerald.com</p>
                </span>
                <img src={mailImage} className="w-[60%] lg:w-[65%] lg:m-auto"/>
                </section>
              </section>
              <section className='w-full md:w-[60%] text-left lg:w-[40%] mr-20'>
                <DynamicFormGenerator buttonText="Send Query" formProps={contactForm} handleSubmit={()=>{}}/>
              </section>    
          </section>  
        </section>
      </div>
    </UserLayout>
  );
};

export default Contact;
