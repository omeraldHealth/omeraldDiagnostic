import { usePersistedDCState } from '@/hooks/localstorage';
import { useGetDcProfile, useInvalidateQuery } from '@/utils/query/getQueries';
import { useUpdateDiagnostic } from '@/utils/query/updateQueries';
import { branchState } from '@/utils/recoil';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

export const ViewTest: React.FC = () => {
  const [showTest, setShowTest] = useState(false);
  const [selectedDc] = usePersistedDCState();
  const updatedDc = useUpdateDiagnostic({});
  const deleteTest = useDeleteTest({});
  const invalidateQuery = useInvalidateQuery();
  //   const setEditTestState = useSetRecoilState(editTestState);
  const setCurrentBranch = useSetRecoilState(branchState);
  const {
    data: currentProfile,
    refetch,
    isLoading,
  } = useGetDcProfile({
    selectedCenterId: selectedDc,
  });
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);
  const [testId, setTestId] = useRecoilState(editTestIdState);
  const logActivity = useActivityLogger();

  const [previewRecord, setPreviewRecord] = useState({});
  const [previewReportModalOpen, setPreviewReportModalOpen] = useState(false);

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
      setEditTestState(true);
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
                { data: { tests: updatedTestIds }, recordId: selectedDc },
                {
                  onSuccess: (resp) => {
                    invalidateQuery('diagnosticCenter');
                    setCurrentBranch(resp?.data);
                  },
                },
              );
              invalidateQuery('diagnosticCenter');
              logActivity({
                activity: 'Deleted Test ' + record?.testName || '',
              });
              warningAlert2('Deleted Test Successfully');
              refetch();
            }
          },
          onError: (err) => {
            errorAlert('Error deleting test');
          },
        },
      );
    }
  };

  const handleShowTest = (value) => {
    setShowTest(value);
  };

  const handlePreview = (record) => {
    setPreviewRecord(record);
    setPreviewReportModalOpen(true);
  };

  const columns = TEST_DETAILS_COLUMNS({
    handleEdit,
    handleDelete,
    handlePreview,
  });

  return (
    <section>
      <CommonSettingTable data={tests} columns={columns} />
    </section>
  );
};
