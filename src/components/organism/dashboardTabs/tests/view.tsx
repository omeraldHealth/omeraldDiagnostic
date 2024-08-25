import { usePersistedDCState } from "@components/common/recoil/hooks/usePersistedState";
import { TEST_DETAILS_COLUMNS } from "../settingsTabs/utils/tabs";
import { CommonSettingTable } from "../settingsTabs/utils/table";
import {
  useDeleteTest,
  useGetDcProfile,
  useInvalidateQuery,
  useUpdateBranch,
  useUpdateDiagnostic,
} from "@utils/reactQuery";
import { errorAlert, warningAlert2 } from "@components/atoms/alerts/alert";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { branchState } from "@components/common/recoil/branch/branch";
import { UpdateTest } from "./update";
import {
  editTestIdState,
  editTestState,
  testDetailsState,
} from "@components/common/recoil/testDetails";
import { Loader } from "@components/atoms/loader/loader";

export const ViewTest: React.FC = () => {
  const [showTest, setShowTest] = useState(false);
  const [selectedDc] = usePersistedDCState();
  const updatedDc = useUpdateDiagnostic({})
  const deleteTest = useDeleteTest({});
  const invalidateQuery = useInvalidateQuery();
  const setEditTest = useSetRecoilState(editTestState);
  const setCurrentBranch = useSetRecoilState(branchState);
  const { data: currentProfile, refetch, isLoading } = useGetDcProfile({
    selectedCenterId: selectedDc,
  });
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);
  const [testId, setTestId] = useRecoilState(editTestIdState);

  // @ts-ignore
  const tests = currentProfile?.data?.tests;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setTestDetail(null);
  }, []);

  const handleEdit = (record) => {
    if (record) {
      setTestDetail(record);
      setTestId(record?._id);
      setShowTest(true);
      setEditTest(true);
    }
  };

  const handleDelete = async (record) => {
    if (record) {
      deleteTest.mutateAsync(
        { recordId: record?._id },
        {
          onSuccess: (resp) => {
            if (resp.status === 200) {
              const updatedTestIds = tests
                ?.filter((test) => test?._id !== record?._id)
                ?.map((test) => test._id);
              updatedDc.mutateAsync(
                { data: {tests: updatedTestIds}, recordId: selectedDc },
                {
                  onSuccess: (resp) => {
                    invalidateQuery("diagnosticCenter");
                    setCurrentBranch(resp?.data);
                  },
                },
              );
              invalidateQuery("diagnosticCenter");
              warningAlert2("Deleted Test Successfully");
              refetch();
            }
          },
          onError: (err) => {
            errorAlert("Error deleting test");
          },
        },
      );
    }
  };

  const handleShowTest = (value) => {
    setShowTest(value);
  };

  const columns = TEST_DETAILS_COLUMNS({
    handleEdit,
    handleDelete,
  });

  return (
    <section>

      {isLoading && <Loader/>}

      {!showTest ? (
        <CommonSettingTable data={tests} columns={columns} />
      ) : (
        <UpdateTest handleShowTest={handleShowTest} />
      )}
    </section>
  );
};
