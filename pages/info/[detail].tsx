import { Fragment } from 'react';
import { InfoPage } from '@components/organism/info';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Spinner } from '@components/atoms/loader';

// Dynamic import for Head component
const DynamicHead = dynamic(() => import('@components/atoms/head/head'));

// Define the InfoProps interface for type checking
interface InfoProps {
  detail: string | string[] | undefined;
}

const Info: React.FC<InfoProps> = ({ detail }) => {
  const router = useRouter();

  // Check if 'detail' is not available
  if (!detail) {
    // Handle the case when 'detail' is not available (Loading, error, or redirect)
    return <Spinner/>;
  }

  // Render the Info component with the provided 'detail'
  return (
    <Fragment>
      {/* Use dynamic Head component with the title */}
      <DynamicHead title={`Omerald Diagnostic | ${detail}`} />
      
      {/* Render the InfoPage component with the 'detail' prop */}
      <InfoPage detail={detail} />
    </Fragment>
  );
};

export default Info;
