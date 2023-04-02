import { successAlert } from "@components/atoms/alerts/alert";
import { UserDetails } from "@utils";
import { useAuthContext } from "utils/context/auth.context";
import { useUpdateDiagnostic } from "utils/reactQuery";

export async function  ActivityLogger(activity:string,diagnosticDetail:UserDetails){
    let act = diagnosticDetail?.activities || [];
    const {activeBranch} = useAuthContext()
    act.push( {
        "user": diagnosticDetail?.managersDetail[0],
        "activity": activity,
        "branchId": activeBranch?._id
    })

    const updateDiagnostic = useUpdateDiagnostic({
        onSuccess: (data) => {
        },
        onError: (error) => {
          successAlert("Error updating activity")
        },
    });

    updateDiagnostic.mutate({"phoneNumber":diagnosticDetail.phoneNumber,data:{"activities":act}})

}