import { AddReportComponent } from '@components/molecules/addReport/addReport';
import { Fragment } from 'react';

export default function AddReportsTab() {
  return (
    <Fragment>
      <div className="p-4 sm:p-6 xl:p-8 h-[112vh] sm:h-[92vh] bg-signBanner flex w-100 justify-center">
        <div className="w-[50vw] bg-white shadow-lg mt-10 h-[70vh] rounded-lg">
          <AddReportComponent />
        </div>
      </div>
    </Fragment>
  );
}
