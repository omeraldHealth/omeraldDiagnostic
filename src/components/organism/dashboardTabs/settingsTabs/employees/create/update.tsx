import { FormControl, FormLabel, Select, Input, Stack } from "@chakra-ui/react";
import { errorAlert2, successAlert, warningAlert2 } from "@components/atoms/alerts/alert";
import { useCurrentBranchValue, useProfileValue, useUserValues } from "@components/common/constants/recoilValues";
import { usePersistedBranchState, usePersistedDCState } from "@components/common/recoil/hooks/usePersistedState";
import { useInvalidateQuery, useUpdateUser } from "@utils/reactQuery";
import { phonePattern } from "@utils/types/molecules/forms.interface";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { getRoleNameByBranchId } from "../../utils/functions";
import { useActivityLogger } from "@components/common/logger.tsx/activity";


const UpdateEmployee = ({ handleEditEmployee, operatorId }) => {
    const initialFormData = {
        userName: '',
        phoneNumber: '',
        roleName: "admin"
    };
    const [selectedDc] = usePersistedDCState();
    const [selectedBranch] = usePersistedBranchState();
    const currentBranch = useCurrentBranchValue();
    const [formData, setFormData] = useState(initialFormData);
    const invalidateQuery = useInvalidateQuery();
    const logActivity = useActivityLogger();

    useEffect(()=>{
        const user = currentBranch?.branchOperator?.filter((employee)=> employee?._id === operatorId)
        const role = getRoleNameByBranchId(user, selectedBranch)
        if(user){
            const updateInitialFormData = {
                userName: user[0]?.userName,
                phoneNumber: user[0]?.phoneNumber,
                roleName: role || "spoc"
            };
            setFormData(updateInitialFormData)
        }
    },[])

    const updateUser = useUpdateUser({
        onSuccess: (resp) => {
            warningAlert2("User updated successfully");
            invalidateQuery("userData");
            invalidateQuery("diagnosticCenter");
            invalidateQuery("diagnosticSettings");
            handleEditEmployee(false);
            logActivity({activity: "Updated User role for "+resp?.data?.userName})
        },
        onError: () => errorAlert2("Error creating employee"),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        handleEditEmployee(false);
    };

    const handleUpdateEmployee = (user) => {
        const updatedDiagnosticCenters = user?.diagnosticCenters?.map((center) => {
            if (center?.diagnostic === selectedDc) {
                const updatedBranches = center?.branches?.map((branch) => {
                    if (branch?.branchId === selectedBranch) {
                        return { ...branch, roleName: formData?.roleName };
                    }
                    return branch;
                });
        
                return { ...center, branches: updatedBranches };
            }
            return center;
        });
        updateUser.mutate({ data: { diagnosticCenters: updatedDiagnosticCenters }, recordId: operatorId });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.userName || !formData.phoneNumber) {
            return errorAlert2("Invalid Data, please Edit all details");
        }

        if (!formData.phoneNumber.match(phonePattern)) {
            return errorAlert2("Invalid phone, please Edit country code");
        }

        const user = currentBranch?.branchOperator?.filter((employee)=> employee?._id === operatorId)[0]
        if(!user){
            errorAlert2("Error updating user")
        }
        handleUpdateEmployee(user);
    };

    return (
        <div className="my-2 max-w-full bg-white">
            <section className="m-auto xl:w-[50%]">
                <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">Edit Branch</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Stack spacing={4}>
                        <FormControl id="userName" className="my-2" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                disabled
                                placeholder="Edit Operator Name"
                                className="border-2 p-2"
                                required
                            />
                        </FormControl>
                        <FormControl id="phoneNumber" className="my-2" isRequired>
                            <FormLabel>Phone Number (Please Edit country code with +)</FormLabel>
                            <Input
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                disabled
                                onChange={handleChange}
                                placeholder="Edit Operator Contact"
                                className="border-2 p-2"
                                required
                            />
                        </FormControl>
                        <FormControl id="roleName" className="my-2" isRequired>
                            <FormLabel>Role</FormLabel>
                            <Select
                                name="roleName"
                                value={formData.roleName}
                                placeholder="Edit Operator Role"
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
                    <Button type="primary" htmlType="submit">Edit Operator</Button>
                    <Button type="default" className="ml-2" onClick={handleCancel}>Cancel</Button>
                </form>
            </section>
        </div>
    );
};

export default UpdateEmployee;
