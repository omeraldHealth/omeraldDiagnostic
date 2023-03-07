
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import { successUpload } from '@utils';
import React from 'react'
import { useDispatch } from 'react-redux';
import { SET_DASHBOARD_ROUTE } from 'utils/store/types';

export const SuccessTest = ({handleSucess}:any) => {
  const dispatch = useDispatch()
  return (
    <div>
         <section className="w-[40vh] h-auto xl:h-[40vh] m-auto xl:mt-4">
                 <img src={successUpload} alt="success-upload" className="w-40 xl:my-4 mx-auto mt-8" />
                 <span className="my-8 text-gray-500 flex justify-center"><CheckBadgeIcon className="w-10 text-green-800" /> 
                 <span className="mt-2">Customised Test Added successfully</span></span>
                 <a onClick={()=>{ dispatch({ type: SET_DASHBOARD_ROUTE,payload: {name:"Tests Offered",href:"/test",loading:false} });}}>
                 <button onClick={handleSucess} name="Upload Report"
                 className="block w-[220px] m-auto bg-green-800 text-white p-2 text-sm rounded-md">View All Tests
                 </button>
                 </a>
        </section>
    </div>
  )
}
