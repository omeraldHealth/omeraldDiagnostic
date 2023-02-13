import { useAuth } from "@/lib/auth";
import { getReportTypes } from "@/lib/db";
import { ReportTypes } from "middleware/models.interface";
import React, { useEffect, useReducer, useState }  from "react";
import SelectComponent from "../core/SelectComponent/SelectComponent";
import CustomFormComponent from "../CustomForm/CustomForm.component";
import UploadInput from "../UploadReport/UploadReport.component";
import { ReportUserDetails } from "./BasicReportDetailsForm.interface";


interface stateType {
  loading: boolean;
  success: boolean;
  error: string;
  reportUserDetails: ReportUserDetails | null;
  reportTypes: ReportTypes[];
}
interface actionType {
  type: string;
  value?: any;
}

//TODO: Update Types
function UserReportReducer(state: stateType, action: actionType): stateType {
  if (action.type === "success") {
    return {
      ...state,
      loading: false,
      success: true, //can be change to something like report successfully created.
      error: "",
      reportUserDetails: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: action.value as string,
    };
  } else if (action.type === "loading") {
    return {
      ...state,
      loading: true,
      error: "",
    };
  } else if (action.type === "addReportUserDetails") {
    return {
      ...state,
      reportUserDetails: action.value as ReportUserDetails,
      loading: false,
      error: "",
    };
  } else if (action.type === "addReportTypes") {
    return {
      ...state,
      reportTypes: action.value,
      loading: false,
      error: "",
    };
  } else if (action.type === "reset") {
    return {
      ...intialState,
      reportTypes: state.reportTypes,
    };
  } else {
    return state;
  }
}
const intialState: stateType = {
  loading: false,
  success: false,
  error: "",
  reportUserDetails: null,
  reportTypes: [],
};
const AddTestDetailsForm = ({handleNext}:any) => {
  const { user } = useAuth();
  const [isUploadReportSelected, setIsUploadReportSelected] = useState<string | null>(null);
  const [state, dispatch] = useReducer(UserReportReducer, intialState);
  const [selectedType, setSelectedType] = useState<{
    id: number;
    name: string;
  }>({ id: -1, name: "Select report type" });
  let [tests,setTests] = useState(state.reportTypes)

  useEffect(() => {
    (async () => {
      const token = await user?.getIdToken();
      if (token) {
        const resp = await getReportTypes(token);
        if (resp.status == 200) {
          dispatch({ type: "addReportTypes", value: resp.data });
        }
      }
    })();
  }, [user]);

  const handleAddTest = (obj:any) =>{
    setTests(tests)
  }

  const handleUploadReportChange = (e: any) => {
    setIsUploadReportSelected(e.target.value);
  };

  return (
    <div className="w-[100%] h-[40vh]">
        <div className="p-8 md:gap-10">
                    <div className="col-span-1">
                      <div id="" className="pb-8">
                        <label
                          htmlFor="query1"
                          className="block text-sm font-medium text-gray-700 pb-3"
                        >
                          You want to choose from existing reports
                        </label>
                        <div className="-mt-1 ml-2">
                          <span className="mr-8">
                            <input
                              className=""
                              type="radio"
                              value="yes"
                              id="yes"
                              name="query1"
                              onChange={handleUploadReportChange}
                            />{" "}
                            <label className=" text-xs font-medium " htmlFor="yes">
                              Yes
                            </label>
                          </span>
                          <span>
                            <input
                              type="radio"
                              value="no"
                              id="no"
                              name="query1"
                              onChange={handleUploadReportChange}
                            />{" "}
                            <label className=" text-xs font-medium " htmlFor="no">
                              No
                            </label>
                          </span>
                        </div>
                      </div>
                    </div>
                    {isUploadReportSelected === "yes" && (
                          <div className=" pb-8 w-[90%] sm:w-[40%]">
                                   <SelectComponent
                                     labelName="Please select the type of test"
                                     selected={selectedType}
                                     setSelected={setSelectedType}
                                     data={state.reportTypes.map((val, index) => {
                                       return {
                                         id: index,
                                         name: val.testName,
                                       };
                                     })}
                                   />
                          </div>
                    )}
                    {isUploadReportSelected === "no" && (
                      <div >
                          <button className="bg-gray-200 rounded-md border-2 px-2 py-1 text-sm">Add test</button>
                      </div>
                    )}
                    {selectedType?.id > -1 &&
                      <section className="flex justify-end">
                            <button onClick={handleNext} className="bg-indigo-700 text-white px-4 py-2 text-sm rounded-md">Next</button>
                      </section>
                    }
        </div>
    </div>
  );
};

export default AddTestDetailsForm;
