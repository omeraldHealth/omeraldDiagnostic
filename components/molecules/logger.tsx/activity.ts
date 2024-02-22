import { warningAlert } from "@components/atoms/alerts/alert"
import { updateUserDetails } from "utils/hook/userDetail"


export async function ActivityLogger(profile:any,activity:string,currentBranch:object,currentManage:any) {

    let data = {"id":profile._id, "activities": [...(profile?.activities || []), { user: currentManage, activity: activity, branchId: currentBranch?._id }]}
    let resp = await updateUserDetails(data)
    if(resp.status==200){
        warningAlert("Activity logged")
    }

}