
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { successUpload } from '@utils';
import React from 'react'

export const SuccessTest = ({handleSucess,refetch}:any) => {
  return (
    <div>
         <section className="w-[40vh] h-auto xl:h-[40vh]  m-auto xl:mt-4">
                 <img src={successUpload} alt="success-upload" className="w-40 xl:my-4 mx-auto mt-8" />
                 <span className="my-8 text-gray-500 flex justify-center"><CheckBadgeIcon className="w-10 text-green-800" /> 
                 <span className="mt-2 text-sm sm:text-md">Customised Test Added successfully</span></span>

                 <button onClick={handleSucess} name="Upload Report"
                 className="block w-[220px] m-auto bg-green-800 text-white p-2 text-sm rounded-md my-4">View All Tests
                 </button>
        </section>
    </div>
  )
}
