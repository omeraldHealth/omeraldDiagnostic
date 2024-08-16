import { usePersistedBranchState } from "@components/common/recoil/hooks/usePersistedState";
import { TEST_DETAILS_COLUMNS } from "../settingsTabs/utils/tabs";
import { CommonSettingTable } from "../settingsTabs/utils/table";
import { useDeleteTest, useGetDcBranch, useInvalidateQuery, useUpdateBranch } from "@utils/reactQuery";
import { warningAlert2 } from "@components/atoms/alerts/alert";
import { useEffect } from "react";

export const ViewTest: React.FC = () => {
    const [selectedBranch] = usePersistedBranchState()
    const updateBranch = useUpdateBranch({})
    const deleteTest = useDeleteTest({})
    const invalidateQuery = useInvalidateQuery()
    const { data: currentBranch, refetch } = useGetDcBranch({ selectedBranchId: selectedBranch })
    // @ts-ignore
    const tests = currentBranch?.data?.tests;

    useEffect(() => {refetch() },[])

    const handleEdit = () => { }

    const handleDelete = async (record) => {
        try {
            await deleteTest.mutateAsync({ recordId: record?._id });

            const updatedTests = tests?.filter((test) => test?._id !== record?._id);

            await updateBranch.mutateAsync({ data: updatedTests, recordId: selectedBranch });

            invalidateQuery("diagnosticCenter");
            refetch();
            warningAlert2("Deleted Test Successfully");
        } catch (err) {
            warningAlert2("Deleting Test Failed");
        }
    };

    const columns = TEST_DETAILS_COLUMNS({
        handleEdit,
        handleDelete,
    });
    
    return (
        <section>
             <CommonSettingTable data={tests} columns={columns}/>
        </section>
    );
};