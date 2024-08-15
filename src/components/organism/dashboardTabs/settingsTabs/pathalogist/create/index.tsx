import { UploadOutlined } from "@ant-design/icons";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { errorAlert2, successAlert, warningAlert2 } from "@components/atoms/alerts/alert";
import {
  useCurrentBranchValue,
} from "@components/common/constants/recoilValues";
import { useActivityLogger } from "@components/common/logger.tsx/activity";
import { branchState } from "@components/common/recoil/branch/branch";
import {
  usePersistedBranchState
} from "@components/common/recoil/hooks/usePersistedState";
import { uploadPathSignature } from "@utils/index";
import {
  useInvalidateQuery,
  useUpdateBranch
} from "@utils/reactQuery";
import { Button, Spin, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

const AddPathologist = ({ handleShowPathologist }) => {
  const [selectedBranch] = usePersistedBranchState();
  const currentBranch = useCurrentBranchValue();
  const updateBranch = useUpdateBranch({});
  const [loading, setLoading] = useState(false);
  const invalidateQuery = useInvalidateQuery();
  const logActivity = useActivityLogger()
  const setCurrentBranch = useSetRecoilState(branchState)

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    signature: null,
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      designation: "",
      signature: null,
    });
    handleShowPathologist(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.designation) {
      return errorAlert2("Please fill in all required fields");
    }

    const pathList = [...currentBranch?.pathologistDetail, formData];

    updateBranch.mutate(
      { data: { pathologistDetail: pathList }, recordId: selectedBranch },
      {
        onSuccess: (resp) => {
          warningAlert2("Path Added succesfully");
          invalidateQuery("diagnosticBranch");
          setCurrentBranch(resp?.data)
          logActivity({ activity: "Added Pathologist" });
          handleShowPathologist(false);
        },
        onError: (resp) => {
          errorAlert2("Error adding Pathologist");
        },
      },
    );
  };

  const handleUpload = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const url = info.file.response.url;
      successAlert(`${info.file.name} file upload successfully.`);
    } else if (info.file.status === "error") {
    }
  };

  const customRequest = async ({ action, file, headers }: any) => {
    try {
      setLoading(true); // Start loading

      const formDataSend = new FormData();
      formDataSend.append("file", file);
      const response = await axios.post(action, formDataSend);
      if (response?.status === 200) {
        successAlert("File uploaded succesfully");
        setFormData({ ...formData, signature: response?.data?.url });
      }
    } catch (error) {
      throw new Error("File upload failed.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="my-2 max-w-full bg-white">
      <section className="m-auto xl:w-[50%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Add Pathologist
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Pathologist Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Add Pathologist Name"
              />
            </FormControl>
            <FormControl id="designation" isRequired>
              <FormLabel>Designation</FormLabel>
              <Input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Add Designation"
              />
            </FormControl>
            <FormControl id="signature" isRequired>
              <FormLabel>Signature</FormLabel>
              <Upload
                name="file"
                action={uploadPathSignature}
                customRequest={customRequest}
                listType="picture-card"
                showUploadList={true}
                onChange={handleUpload}
                accept="image/*"
              >
                {formData?.signature ? (
                  <img
                    src={formData?.signature}
                    alt="avatar"
                    className="my-2 w-full"
                  />
                ) : (
                  <div>
                    {loading ? (
                      <Spin />
                    ) : (
                      <div>
                        <div className="mt-2">Upload</div>
                        {/* <Button icon={<UploadOutlined />}>
                          Upload Signature
                        </Button> */}
                      </div>
                    )}
                  </div>
                )}
              </Upload>
            </FormControl>
          </Stack>
          <Button type="primary" htmlType="submit">
            Add Pathologist
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddPathologist;
