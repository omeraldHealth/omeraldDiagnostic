import React from 'react';
import parse from 'html-react-parser';
import { Footer } from '@components/molecules/footer';
import { Navbar } from '@components/molecules/navbar';
import { useQueryGetData } from 'utils/reactQuery';
import { Spinner } from '@components/atoms/loader';
import styles from '@styles/signIn.module.css';

interface InfoPageProps {
  detail: string;
}

const InfoPage: React.FC<InfoPageProps> = ({ detail }) => {
//   const { data: Info, isLoading } = useQueryGetData(['info', detail], getDiagnosticSetting + detail);
//   const parsedHtml = Info?.data?.value && parse(Info?.data?.value);

  return (
      <div className={`pt-[1vh] ${styles['signInContainer']}`}>
        <Navbar />
        {/* <section className="max-w-[80%] m-auto h-auto my-40 sm:my-20 2xl:my-0 xl:min-h-[60vh]">
          <p className="underline font-bold text-md my-10 uppercase">{detail}</p>
          {parsedHtml ? parsedHtml : <p className="text-red-400">No Data</p>}
        </section> */}
        {/* {isLoading && <Spinner />} */}
        <Footer />
      </div>
  );
};

export default InfoPage;
