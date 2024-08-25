import {
  useEditTestIdValues,
  useEditTestValues,
  useTestDetailValue,
} from "@components/common/constants/recoilValues";
import React, { useEffect } from "react";
import { ViewParameters } from "./parameters/view";
import { Button } from "antd";
import {
  useCreateTest,
  useGetDcBranch,
  useInvalidateQuery,
  useUpdateBranch,
  useUpdateTest,
} from "@utils/reactQuery";
import {
  errorAlert,
  successAlert,
  warningAlert2,
} from "@components/atoms/alerts/alert";
import { usePersistedBranchState } from "@components/common/recoil/hooks/usePersistedState";
import { useSetRecoilState } from "recoil";
import { branchState } from "@components/common/recoil/branch/branch";
import {
  editTestIdState,
  editTestState,
  testDetailsState,
} from "@components/common/recoil/testDetails";
import { useActivityLogger } from "@components/common/logger.tsx/activity";

export default function TestSummary({ handlePrevious, handleShowTest }) {
  const testDetails = useTestDetailValue();
  const createTest = useCreateTest({});
  const updateTest = useUpdateTest({});
  const updateBranch = useUpdateBranch({});
  // const currentBranch = useCurrentBranchValue()
  const invalidateQuery = useInvalidateQuery();
  const [selectedBranch] = usePersistedBranchState();
  const setCurrentBranch = useSetRecoilState(branchState);
  const {
    data: currentBranch,
    refetch,
    isLoading,
  } = useGetDcBranch({ selectedBranchId: selectedBranch });
  const editTest = useEditTestValues();
  const editTestId = useEditTestIdValues();
  const setEditTest = useSetRecoilState(editTestState);
  const setEditTestId = useSetRecoilState(editTestIdState);
  const testDetail = useSetRecoilState(testDetailsState);
  const logActivity = useActivityLogger()

  useEffect(() => {
    refetch();
  }, []);

  const handleSubmit = () => {
    if (!isLoading && !editTest) {
      createTest.mutate(
        { data: testDetails },
        {
          onSuccess: (res) => {
            if (res?.status === 201) {
              const updatedTest = [
                ...(currentBranch?.data?.tests || []),
                res?.data?._id,
              ];
              updateBranch.mutate(
                { data: { tests: updatedTest }, recordId: selectedBranch },
                {
                  onSuccess: (resp) => {
                    successAlert("Test added successfully");
                    invalidateQuery("diagnosticBranch");
                    logActivity({ activity: "Created Test " + testDetails?.testName || "" });
                    handleShowTest(false);
                  },
                  onError: () => {
                    errorAlert("Adding test failed");
                  },
                },
              );
            }
          },
          onError: (res) => {
            errorAlert("Adding test failed");
          },
        },
      );
    }

    if (editTest) {
      updateTest?.mutate(
        { data: testDetails, recordId: editTestId },
        {
          onSuccess: (resp) => {
            if (resp.status == 200) {
              warningAlert2("Test updated successfully");
              invalidateQuery("diagnosticBranch");
              handleShowTest(false);
              setEditTest(false);
              setEditTestId(null);
              testDetail({});
            }
          },
        },
      );
    }
  };

  return (
    <div className="p-10 h-auto bg-signBanner">
      <b>Test Details Summary</b>
      <section className="my-5 text-gray-600">
        <p className="mb-10">
          Name: <span className="font-bold">{testDetails?.testName}</span>{" "}
        </p>
        <p className="mb-10">
          Sample: <span className="font-bold">{testDetails?.sampleName}</span>{" "}
        </p>
      </section>
      <ViewParameters />
      <Button className="mt-4" onClick={handleSubmit} type="primary">
        Submit
      </Button>
      <Button className="mt-4 mx-4" onClick={handlePrevious} type="default">
        Previous
      </Button>
    </div>
  );
}
