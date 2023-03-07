import { UserDetails } from "@utils";
import { updateUserDetails } from "utils/hook/userDetail";

export async function  ActivityLogger(activity:string,diagnosticDetail:UserDetails){
    let act = diagnosticDetail?.activities || [];
    act.push( {
        "user": diagnosticDetail?.managersDetail[0],
        "activity": activity,
    })

    let resp = await updateUserDetails({"phoneNumber":diagnosticDetail.phoneNumber},{"activities":act})
    if(resp.status==200){
        // console.log("action")
    }

}