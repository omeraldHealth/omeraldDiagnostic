import { warningAlert } from "@components/atoms/alerts/alert";
import { branchState } from "@components/common/recoil/blogs/branch";
import { operatorState } from "@components/common/recoil/operator";
import { profileState } from "@components/common/recoil/profile";
import { profile } from "console";
import { useRecoilValue } from "recoil";
import { updateUserDetails } from "utils/hook/userDetail";


export async function  ActivityLogger(activity:string){

    const profile = useRecoilValue(profileState);
    const operator = useRecoilValue(operatorState);
    const currentBranch = useRecoilValue(branchState);

    // let act = [...(diagnosticDetails?.activities || []), { user: operator, activity, branchId: activeBranch?._id }];
    // let data = {...diagnosticDetails, "activities":act}
    let resp = await updateUserDetails(profile)
    if(resp.status==200){
        warningAlert("Activity logged")
    }

}