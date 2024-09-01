import { PageLoader } from '@/components/common/pageLoader';
import { PageLayout } from '@/components/layouts/pageLayout';
import { useUserVerification } from '@/hooks/user';
import { verifyUser } from 'src2/utils/urls/files';

const VerifyUser = () => {
  const { isLoading } = useUserVerification();

  return (
    <PageLayout
      tabDescription="Verify User"
      tabName="Admin Diagnostic | Verify User"
    >
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="h-[80vh] p-4 py-10 text-center m-auto flex justify-center">
          <section className="my-10">
            <div className="bg-container w-[45vw] m-auto">
              <img src={verifyUser} alt="Verification" />
            </div>
          </section>
        </div>
      )}
    </PageLayout>
  );
};

export default VerifyUser;
