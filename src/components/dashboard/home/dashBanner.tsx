// @ts-nocheck
import { dashboardBanner } from '@/utils/constants/cloudinary';
import { useCurrentBranch, useUserRecoilValue } from '@/utils/recoil/values';

const DashBanner: React.FC = () => {
  const user = useUserRecoilValue();
  const currentBranch = useCurrentBranch();

  return (
    <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 p-8 rounded-lg shadow-lg text-white mb-8">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-lg opacity-50"
        style={{ backgroundImage: `url(${dashboardBanner})` }}
      ></div>
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-center">
        <div className="pl-20">
          <h1 className="text-2xl sm:text-2xl font-bold">
            Welcome, {user?.userName || 'User'}!
          </h1>
          <p className="mt-3 text-sm sm:text-md max-w-3xl leading-relaxed">
            You have uploaded{' '}
            <span className="text-yellow-400 font-semibold">
              {currentBranch?.reports?.length || 0} report
            </span>{' '}
            till date. Please use our add reports section to share more reports
            with your patients directly. Also, a total of{' '}
            <span className="text-yellow-400 font-semibold">
              {currentBranch?.tests?.length || 0} tests
            </span>{' '}
            are offered; please add more using the tests offered section.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashBanner;
