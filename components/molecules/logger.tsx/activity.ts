import { successAlert, warningAlert } from "@components/atoms/alerts/alert";
import { UserDetails, getDiagnosticUserApi } from "@utils";
import { useQueryClient } from "react-query";
import { useAuthContext } from "utils/context/auth.context";
import { updateUserDetails } from "utils/hook/userDetail";


export async function  ActivityLogger(activity:string,diagnosticDetails:any,operator:any,activeBranch:any){

    let act = diagnosticDetails?.activities || [];
    act.push( 
        {
        "user": operator,
        "activity": activity,
        "branchId": activeBranch?._id
    })
    let resp = await updateUserDetails({"phoneNumber":diagnosticDetails?.phoneNumber},{"activities":act})
    if(resp.status==200){
        warningAlert("Activity logged")
    }

}