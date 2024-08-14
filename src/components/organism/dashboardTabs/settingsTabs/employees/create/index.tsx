import { FormControl, FormLabel, Select, Input, Stack } from "@chakra-ui/react";
import { errorAlert2, successAlert, warningAlert, warningAlert2 } from "@components/atoms/alerts/alert";
import { useCurrentBranchValue, useProfileValue } from "@components/common/constants/recoilValues";
import { usePersistedBranchState, usePersistedDCState } from "@components/common/recoil/hooks/usePersistedState";
import { getDiagnosticUserApi } from "@utils/index";
import { useCreateUser, useInvalidateQuery, useUpdateDiagnostic, useUpdateUser } from "@utils/reactQuery";
import { phonePattern } from "@utils/types/molecules/forms.interface";
import { Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useActivityLogger } from "@components/common/logger.tsx/activity";


const AddEmployee = ({ handleShowBranch }) => {
    const initialFormData = {
        userName: '',
        phoneNumber: '',
        roleName: "admin"
    };
    const [selectedDc] = usePersistedDCState();
    const [selectedBranch] = usePersistedBranchState();
    const currentBranch = useCurrentBranchValue();
    const profileValue = useProfileValue();
    const [formData, setFormData] = useState(initialFormData);
    const invalidateQuery = useInvalidateQuery();
    const logActivity = useActivityLogger();

    const updateProfile = useUpdateDiagnostic({
        onSuccess: (resp) => {
            if (resp.status === 200) {
                successAlert("DC updated successfully");
                invalidateQuery("userData");
                invalidateQuery("diagnosticCenter");
                invalidateQuery("diagnosticSettings");
                handleShowBranch(false);
            }
        },
        onError: () => errorAlert2("Error creating employee"),
    });

    const updateUser = useUpdateUser({
        onSuccess: (resp) => {
            successAlert("User updated successfully");
            logActivity({activity: "Created Employee "+ resp?.data?.userName})
            handleShowBranch(false);
        },
        onError: () => errorAlert2("Error creating employee"),
    });

    const getUpdatedBranch = (userId) => {
        const updatedBranch = {
            ...currentBranch,
            branchOperator: [...(currentBranch.branchOperator || []), userId]
        };

        const branches = profileValue?.branches?.map(branch =>
            branch._id === updatedBranch._id ? updatedBranch : branch
        ) || [updatedBranch];

        return branches;
    }

    const createUser = useCreateUser({
        onSuccess: (resp) => {
            if (resp.status === 201) {
                successAlert("Employee created successfully");
                const branches = getUpdatedBranch(resp?.data?._id);
                updateProfile.mutate({ data: { branches }, recordId: profileValue?._id });
            }
        },
        onError: () => errorAlert2("Error creating employee"),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        handleShowBranch(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.userName || !formData.phoneNumber) {
            return errorAlert2("Invalid Data, please add all details");
        }

        if (!formData.phoneNumber.match(phonePattern)) {
            return errorAlert2("Invalid phone, please add country code");
        }

        checkUser(formData);
    };

    const checkUser = async (user) => {
        try {
            const resp = await axios.get(`${getDiagnosticUserApi}${user.phoneNumber}`);
            if (resp.status === 200) {
                const userData = resp.data;
                const diagPresent = userData.diagnosticCenters.some(dc => dc.diagnostic?._id === selectedDc);
                const branchPresent = userData.diagnosticCenters.some(dc => dc.branches.some(branch => branch.branchId === selectedBranch));

                if(branchPresent){
                    const branches = getUpdatedBranch(resp?.data?._id);
                    const userExists = currentBranch?.branchOperator?.find((op)=> op?._id == resp?.data?._id)
                    if(!userExists){
                        updateProfile.mutate({ data: { branches }, recordId: profileValue?._id });
                    }else{
                        errorAlert2("User already found")
                    }
                }

                if (!diagPresent) {
                    updateDcAndBranch(userData);
                } else if (!branchPresent) {
                    updateBranch(userData);
                } else {
                    warningAlert("Employee already exists in current branch");
                    handleShowBranch(false);
                }
            }
        } catch {
            createEmployee(user);
        }
    };

    const createEmployee = (user) => {
        if (selectedBranch && selectedDc) {
            const newUser = {
                ...user,
                diagnosticCenters: {
                    diagnostic: selectedDc,
                    branches: [{ branchId: selectedBranch, roleName: formData.roleName }]
                }
            };
            createUser.mutate({ data: newUser });
        }
    };

    const updateBranch = (userData) => {
        const updatedDiagnosticCenters = userData.diagnosticCenters.map(dc => (
            dc.diagnostic?._id === selectedDc
                ? { ...dc, branches: [...(dc.branches || []), { branchId: selectedBranch, roleName: formData.roleName }] }
                : dc
        ));
        updateUser.mutate({ data: { diagnosticCenters: updatedDiagnosticCenters }, recordId: userData._id },{
            onSuccess: (resp)=>{
                const branches = getUpdatedBranch(userData?._id)
                updateProfile.mutate({ data: { branches }, recordId: profileValue?._id });
            }
        });
    };

    const updateDcAndBranch = (userData) => {
        const newDc = { diagnostic: selectedDc, branches: { branchId: selectedBranch, roleName: formData.roleName } };
        userData.diagnosticCenters.push(newDc);
        updateUser.mutate({ data: { diagnosticCenters: userData.diagnosticCenters }, recordId: userData._id },{
            onSuccess: (resp)=>{
                const branches = getUpdatedBranch(userData?._id)
                updateProfile.mutate({ data: { branches }, recordId: profileValue?._id });
            }
        });
    };

    return (
        <div className="my-2 max-w-full bg-white">
            <section className="m-auto xl:w-[50%]">
                <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">Add Branch</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Stack spacing={4}>
                        <FormControl id="userName" className="my-2" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="Add Operator Name"
                                className="border-2 p-2"
                                required
                            />
                        </FormControl>
                        <FormControl id="phoneNumber" className="my-2" isRequired>
                            <FormLabel>Phone Number (Please add country code with +)</FormLabel>
                            <Input
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Add Operator Contact"
                                className="border-2 p-2"
                                required
                            />
                        </FormControl>
                        <FormControl id="roleName" className="my-2" isRequired>
                            <FormLabel>Role</FormLabel>
                            <Select
                                name="roleName"
                                value={formData.roleName}
                                placeholder="Add Operator Role"
                                className="border-2 p-2"
                                onChange={handleChange}
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="spoc">SPOC</option>
                                <option value="operator">Operator</option>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Button type="primary" htmlType="submit">Add Operator</Button>
                    <Button type="default" className="ml-2" onClick={handleCancel}>Cancel</Button>
                </form>
            </section>
        </div>
    );
};

export default AddEmployee;
