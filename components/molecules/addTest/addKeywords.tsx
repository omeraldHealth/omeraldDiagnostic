import { errorAlert, successAlert } from '@components/atoms/alerts/alert'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { SET_TEST } from 'utils/store/types'
import { testForm } from 'utils/types/molecules/forms.interface'
import { AddKeyword } from './createdKeyword'
import { Popconfirm } from 'antd'
import { useUser } from '@clerk/clerk-react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { profileState } from '../../common/recoil/profile'
import { operatorState } from '../../common/recoil/operator'
import { branchState } from '../../common/recoil/blogs/branch'
import { testDetailsState } from '../../common/recoil/testDetails'
import DynamicFormGenerator from '../form/dynamicForm'

export const AddKeywords = ({handleSucess,handleBack,edit}:any) => {
  const [addKeyword,setAddKeyword] = useState(false)
  const [testDetailState,setTestDetail] = useRecoilState(testDetailsState)

  const handleAddKeyword = (value: any) => {
    // Assuming `testDetailState` has initial properties like sampleName and sampleType
    const updatedSampleType = {
      ...testDetailState?.sampleType,
      keywords: [...(testDetailState?.sampleType?.keywords || []), value],
    };
  
    setTestDetail({
      ...testDetailState,
      sampleType: updatedSampleType,
    });
  
    setAddKeyword(false);
    console.log(testDetailState);
  };
  

  return <section className="my-2 w-[100%] mx-0 sm:w-[70%] md:w-[100%] h-auto p-4">
    <AddKeyWordHeader addKeyword={addKeyword} setAddKeyword={setAddKeyword} />
    {addKeyword ? <AddParameter handleAddKeyword={handleAddKeyword} /> : <ViewParameter testDetailState={testDetailState}/>}
  </section>
}

export const AddParameter = ({handleAddKeyword}:any) => {
  return <section>
    <section className='w-[100%] sm:w-[60%] my-4'>
      <DynamicFormGenerator formProps={testForm} buttonText="Add Keyword" handleSubmit={handleAddKeyword} />
    </section>
  </section>
}

export const ViewParameter = ({testDetailState}:any) => {
  return <section>
    <AddKeyword selectedTest={testDetailState?.sampleType} action={true}/>
  </section>
}

// export const AddKeywords = ({handleSucess,handleBack,edit}:any) => {

//   const [addKeyword,setAddKeyword] = useState(false)
//   const queryClient = useQueryClient();

//   const {user} = useUser()
//   const operator = useRecoilValue(operatorState)
//   const currentBranch = useRecoilValue(branchState)
//   const [profile, setProfile] = useRecoilState(profileState)

//   const updateDiagnostic = useUpdateDiagnostic({
//     onSuccess: (data) => {
//       successAlert("Tests Added succesfully")
//       setProfile(data?.data)
//       queryClient.invalidateQueries('getDiagnostic');
  
//       handleSucess()
//     },
//     onError: (error) => {
//       successAlert("Error adding tests")
//     },
//   });

//   const handleAddKeyword = (value:any) => {
//         let count = 0
//         testDetails?.sampleType?.keywords.forEach((keyword:any) =>{ 
//           if(keyword.keyword == value.keyword){
//               ++count;
//           }
//         } )
//         if(count>1){
//             errorAlert("Keyword by name already exists")
//         }else{
//             let keywords = testDetails?.sampleType.keywords;
//             keywords?.push(value)
//             let sampleType = {
//                 testName:testDetails?.sampleType?.testName,
//                 keywords:keywords
//             }
//             dispatcher({type:SET_TEST,payload:{testDetails,"sampleType":sampleType}})
//             successAlert("Keyword Added succesfully")
//             setAddKeyword(false)
//         }
//   }

//   const handleAddTest =async() => {
  
//     if(testDetails?.sampleType?.keywords.length==0){
//       errorAlert("please add keywords to proceed")
//     }else{
//       if(testDetails ){
//         testDetails.branchId = currentBranch?._id
//         let updateTest = [...(profile?.tests || []), testDetails];

//         //@ts-ignore
//         updateDiagnostic?.mutate({data:{"tests":updateTest,"id":profile?._id}})
//         // ActivityLogger("Added Test "+testDetails?.sampleName,profile,operator,currentBranch)
//       }else{
//         // errorAlert("Test with name already exists")
//       }
//     }
//   }

//   const handleSuccessTest =async() => {
//       if(testDetails?.sampleType?.keywords.length==0){
//         errorAlert("please add keywords to proceed")
//       }
//       handleSucess()
//   }

//   return (
//          <div className="my-2 w-[100%] mx-0 sm:w-[70%] md:w-[100%] h-auto p-4">
//              <AddKeyWordHeader testDetails={testDetails} addKeyword={addKeyword} setAddKeyword={setAddKeyword}/>
//              {!addKeyword ?
//              <AddKeyword selectedTest={testDetails?.sampleType} action={true}/>:
//              <section className='w-[100%] sm:w-[60%] my-4'>
//                  <DynamicFormCreator button={true} buttonText="Add Keyword" handleSubmit={handleAddKeyword} formProps={testForm} />
//              </section>}
//              <section className='flex  my-10 sm:my-4'>
//              <Popconfirm
//               title="Go Back?"
//               description="Are you sure? the data will be lost"
//               onConfirm={handleBack}
//               okText="Yes"
//               cancelText="No"
//             >
//               <button className='bg-gray-400 mx-3 text-white px-2 py-2 rounded-lg'>Back</button>
//                </Popconfirm>
//               <button onClick={!edit ? handleAddTest : handleSuccessTest} className='bg-green-700 text-white px-2 py-2 rounded-lg'>Submit</button>
//              </section>
//         </div>
//   )
// }

const AddKeyWordHeader = ({ addKeyword, setAddKeyword }: any) => {

  const testDetails = useRecoilValue(testDetailsState);
  const toggleAddKeyword = () => {
    setAddKeyword(!addKeyword);
  };

  return (
    <section className="flex w-full mb-2 justify-between">
      <section className="flex">
        <p className="text-xs sm:text-sm sm:font-bold">
          Custom Report Name:
          <span className="font-light mx-2">{testDetails?.sampleName}</span>
        </p>
        <p className="text-xs sm:text-sm sm:font-bold">
          Test Name:
          <span className="font-light mx-2">{testDetails?.sampleType?.testName}</span>
        </p>
      </section>
      <button onClick={toggleAddKeyword} className="p-1 text-xs sm:text-md sm:px-2 bg-gray-200 text-black">
        {!addKeyword ? "Add Parameter" : "View Parameter"}
      </button>
    </section>
  );
};