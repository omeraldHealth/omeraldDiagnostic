//@ts-nocheck
import { CommonSettingTable } from "../../settingsTabs/utils/table";
import { PARAMETER_COLUMNS } from "../../settingsTabs/utils/tabs";
import { useRecoilState } from "recoil";
import { testDetailsState } from "@components/common/recoil/testDetails";

export const ViewParameters = () => {
    const [testDetails, setTestDetail] = useRecoilState(testDetailsState);
    const handleEdit = () => { }

    const handleDelete = (record) => { 
        const updatedParameters = testDetails?.parameters?.filter((param)=> param?.name !== record?.name)
        setTestDetail({ ...testDetails, parameters: updatedParameters })
    }

    const columns = PARAMETER_COLUMNS({ handleEdit, handleDelete })

    return (
        <section>
            <CommonSettingTable data={testDetails?.parameters} columns={columns}/>
        </section>
    );
};