import { FormControl, FormLabel,Select, Input, Stack } from "@chakra-ui/react";
import { errorAlert2, successAlert, warningAlert, warningAlert2 } from "@components/atoms/alerts/alert";
import { useCurrentBranchValue, useProfileValue } from "@components/common/constants/recoilValues";
import { usePersistedBranchState, usePersistedDCState } from "@components/common/recoil/hooks/usePersistedState";
import { getDiagnosticUserApi } from "@utils/index";
import { useCreateUser, useInvalidateQuery, useUpdateDiagnostic, useUpdateUser } from "@utils/reactQuery";
import { phonePattern } from "@utils/types/molecules/forms.interface";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { getRoleNameByBranchId } from "../../utils/functions";

interface User {
    userName: String,
    phoneNumber: string,
    roleName?: string
}

const initialFormData: User = {
    userName: '',
    phoneNumber: '',
    roleName: "admin"
};

const AddEmployee = ({ handleShowBranch, isEdit, operatorId }) => {
    const [selectedDc] = usePersistedDCState()
    const [selectedBranch] = usePersistedBranchState()
    const currentBranch = useCurrentBranchValue()
    const profileValue = useProfileValue()
    const [formData, setFormData] = useState(initialFormData);
    const invalidateQuery = useInvalidateQuery()

    useEffect(()=>{
        //@ts-ignore
        const employeeToEdit = currentBranch?.branchOperator?.filter((operator) => operator?._id == operatorId)[0]
        if(isEdit && employeeToEdit){
            const updatedInitialValue = {
                userName: employeeToEdit?.userName,
                phoneNumber: employeeToEdit?.phoneNumber,
                roleName:  getRoleNameByBranchId(currentBranch?.branchOperator, selectedBranch)
            }
            setFormData(updatedInitialValue)
        }

        if(!employeeToEdit){
            handleCancel()
        }
    },[isEdit])
   
    const updateProfile = useUpdateDiagnostic({
        onSuccess: (resp) => {
            if(resp.status == 200){
                successAlert("DC updated succesfully");
                invalidateQuery("userData")
                invalidateQuery("diagnosticCenter")
                invalidateQuery("diagnosticSettings")
                handleShowBranch(false)
            }
        },
        onError: (err) =>{
           errorAlert2("Error creating employee")
           handleShowBranch(false)
        }
    })

    const updateUser = useUpdateUser({
        onSuccess: (resp) => {
            if(resp.status == 200){
                successAlert("User updated succesfully");
                handleShowBranch(false)
            }
        },
        onError: (err) =>{
           errorAlert2("Error creating employee")
           handleShowBranch(false)
        }
    //@ts-ignore
    })
    
    const createUser = useCreateUser({
        onSuccess: (resp) => {
            // @ts-ignore
            if (resp.status === 201) {
                successAlert("Employee created successfully");
    
                const updatedBranch = {
                    ...currentBranch,
                    branchOperator: [...(currentBranch.branchOperator || []), resp?.data?._id]
                };
    
                let branches = profileValue?.branches || [];
    
                if (branches.length <= 1) {
                    branches = [updatedBranch];
                } else {
                    // Replace the branch with the matching ID
                    branches = branches.map(branch =>
                        branch._id === updatedBranch._id ? updatedBranch : branch
                    );
                }
    
                updateProfile.mutate({ data: { branches }, recordId:profileValue?._id });
            }
        },
        onError: (err) => {
            errorAlert2("Error creating employee");
        }
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        handleShowBranch(false);
    };

    const handleUpdateEmployee = (user: User) => {
        const employeeToEdit = currentBranch?.branchOperator?.filter((operator) => operator?._id == operatorId)[0]
        const updatedDiagCenter = employeeToEdit?.diagnosticCenters.map(center => {
            // Map through each branch in the center
            const updatedBranches = center.branches.map(branch => {
                // If branchId matches, update the roleName
                if (branch.branchId === selectedBranch) {
                    return {
                        ...branch,
                        roleName: user?.roleName || formData?.roleName
                    };
                }
                return branch;
            });
    
            return {
                ...center,
                branches: updatedBranches
            };
        });

        updateUser.mutate({data: {diagnosticCenters:updatedDiagCenter}, recordId: operatorId },
            {
                onSuccess:()=>{
                    warningAlert2("User updated succesfully");
                    handleShowBranch(false)
                    invalidateQuery("userData")
                    invalidateQuery("diagnosticCenter")
                    invalidateQuery("diagnosticSettings")
                }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.userName || !formData.phoneNumber){
            errorAlert2("Invalid Data, please add all details")
            return
        }

        if(!formData.phoneNumber.match(phonePattern)){
            errorAlert2("Invalid phone, please add country code")
            return
        }

        if(isEdit){
            handleUpdateEmployee(formData)
        }

        checkUser(formData)
    }
    
    const checkUser = async (user: User) => {
        try{
            const resp = await axios.get(getDiagnosticUserApi+user?.phoneNumber)
            if(resp.status===200){
                const userData = resp?.data;
                const diagPresent = userData?.diagnosticCenters?.some((data) =>
                    data.diagnostic && data.diagnostic._id === selectedDc
                )
                const branchPresent = userData?.diagnosticCenters?.some((data) =>
                    data.branches && data?.branches?.some((branch: any)=>checkBranchExistence(branch))
                )

                if(!diagPresent){
                    updateBranch(userData)
                }else if(!branchPresent){
                    updateDcAndBranch(userData)
                }else{
                    warningAlert("Employee already exists in current branch")
                    handleShowBranch(false)
                }
            }
        }catch(err){
            createEmployee(user)
        }
    }

    const createEmployee = (user: User) => {
        if(selectedBranch && selectedDc){
            const newUser = {
                ...user,
                diagnosticCenters: {
                    diagnostic: selectedDc,
                    branches: [{
                        branchId: selectedBranch,
                        roleName: formData?.roleName
                    }]
                },
            };
            createUser.mutate({data: newUser})
        }
    };

    const checkBranchExistence = (data) => {
        const branchExists = data.branchId === selectedBranch;
        return branchExists;
    };

    const updateBranch = (userData) => {
        const newBranch = {
            branchId: selectedBranch,
            roleName: formData?.roleName
        };
    
        const updatedDiagnosticCenters = userData?.diagnosticCenters.map((dc) => {
            if (dc?.diagnostic?._id === selectedDc) {
                return {
                    ...dc,
                    branches: [...(dc.branches || []), newBranch]
                };
            }
            return dc; // Return the original diagnostic center if it doesn't match
        });
    
        updateUser.mutate({ data: { diagnosticCenters: updatedDiagnosticCenters }, recordId: userData?._id },  );
    };
    
    const updateDcAndBranch = (userData) => {
        const newDc = {
            diagnostic: selectedDc,
            branches: { 
                branchId: selectedBranch,
                roleName: formData?.roleName
            }
        }
    
        const updatedDiagnosticCenters = userData?.diagnosticCenters.push(newDc);
        updateUser.mutate({ data: { diagnosticCenters: updatedDiagnosticCenters } });
    }

    return (
        <div className="my-2 max-w-full bg-white">
        <section className="m-auto xl:w-[50%]">
            <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
            {!isEdit ? "Add Branch" : "Edit Branch"}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 ">
            <Stack spacing={4}>
                <FormControl id="userName" className="my-2" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Add Operator Name"
                    className="border-2 p-2"
                    disabled={isEdit}
                    required
                />
                </FormControl>
                <FormControl id="phoneNumber" className="my-2" isRequired >
                <FormLabel>PhoneNumber (Please add country code with +)</FormLabel>
                <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    disabled={isEdit}
                    onChange={handleChange}
                    placeholder="Add Operator Contact"
                    className="border-2 p-2"
                    required
                />
                </FormControl>
                <FormControl id="role" className="my-2" isRequired >
                <FormLabel>Role</FormLabel>
                <Select
                    value={formData.roleName}
                    placeholder={isEdit ? "Edit Operator Role" :"Add Operator Role"}
                    className="border-2 p-2"
                    defaultValue={'sme'}
                    name={'roleName'}
                    onChange={handleChange}
                >
                    <option value={"admin"}>Admin</option>
                    <option value={"manager"}>Manager</option>
                    <option value={"spoc"}>SPOC</option>
                    <option value={"operator"}>Operator</option>
                </Select>
                </FormControl>
            </Stack>
            <Button type="primary" htmlType="submit">
                {isEdit ? "Edit Operator" :"Add Operator"}
            </Button>
            <Button type="default" className="ml-2" onClick={handleCancel}>
                Cancel
            </Button>
            </form>
        </section>
        </div>
    );
};

export default AddEmployee;

