import { FormControl, FormLabel,Select, Input, Stack } from "@chakra-ui/react";
import { errorAlert2, successAlert } from "@components/atoms/alerts/alert";
import { useCurrentBranchValue } from "@components/common/constants/recoilValues";
import { usePersistedBranchState, usePersistedDCState } from "@components/common/recoil/hooks/usePersistedState";
import { getDiagnosticUserApi } from "@utils/index";
import { useCreateUser, useUpdateDiagnostic } from "@utils/reactQuery";
import { phonePattern } from "@utils/types/molecules/forms.interface";
import { Button } from "antd";
import axios from "axios";
import { useState } from "react";

interface User {
    userName: String,
    phoneNumber: string,
    role?: string
}
const AddEmployee = ({ handleShowBranch }) => {
    const [selectedDc] = usePersistedDCState()
    const [selectedBranch] = usePersistedBranchState()
    const currentBranch = useCurrentBranchValue()

    const initialFormData: User = {
        userName: '',
        phoneNumber: ''
    };
    const [formData, setFormData] = useState(initialFormData);
    const updateProfile = useUpdateDiagnostic({
        onSuccess: (resp) => {
            if(resp.status == 200){
                successAlert("DC updated succesfully");
            }
        },
        onError: (err) =>{
           errorAlert2("Error creating employee")
        }
    },selectedDc)
    
    const createUser = useCreateUser({
        onSuccess: (resp) => {
            if(resp.status == 201){
                successAlert("Employee created succesfully");

            }
        },
        onError: (err) =>{
           errorAlert2("Error creating employee")
        }
    })

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

    const checkBranchExistence = (data) => {
        const branchExists = data.branchId === selectedBranch;
        return branchExists;
    };

    const checkUser = async (user: User) => {
        const resp = await axios.get(getDiagnosticUserApi+user?.phoneNumber)
       
        if(resp.status === 200){
            const user = resp?.data;
            const diagPresent = user?.diagnosticCenters?.some((data) =>
                data.diagnostic && data.diagnostic._id === selectedDc
            )
            const branchPresent = user?.diagnosticCenters?.some((data) =>
                data.branches && data?.branches?.some((branch: any)=>checkBranchExistence(branch))
            )
            console.log(diagPresent, branchPresent)
        }else if(resp.status === 404){
            createEmployee(user)
        }
    }

    const createEmployee = (user: User) => {
        if(selectedBranch && selectedDc){
            const updatedUser = {
                ...user,
                diagnosticCenters: {
                    diagnostic: selectedDc
                },
                branches: [{
                    branchId: selectedBranch,
                    roleName: user?.role
                }]
            };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.userName || !formData.phoneNumber){
            errorAlert2("Invalid Data, please add all details")
        }

        if(!formData.phoneNumber.match(phonePattern)){
            errorAlert2("Invalid phone, please add country code")
        }
        checkUser(formData)
    }

    return (
        <div className="my-2 max-w-full bg-white">
        <section className="m-auto xl:w-[50%]">
            <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
            Add Branch
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
                    required
                />
                </FormControl>
                <FormControl id="phoneNumber" className="my-2" isRequired >
                <FormLabel>PhoneNumber (Please add country code with +)</FormLabel>
                <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Add Operator Contact"
                    className="border-2 p-2"
                    required
                />
                </FormControl>
                <FormControl id="role" className="my-2" isRequired >
                <FormLabel>Role</FormLabel>
                <Select
                    value={formData.role}
                    placeholder="Add Operator Role"
                    className="border-2 p-2"
                    defaultValue={'sme'}
                    name={'role'}
                    onChange={handleChange}
                >
                    <option value={"sme"}>SME</option>
                    <option value={"admin"}>Admin</option>
                    <option value={"manager"}>Manager</option>
                    <option value={"spoc"}>SPOC</option>
                    <option value={"operator"}>Operator</option>
                </Select>
                </FormControl>
            </Stack>
            <Button type="primary" htmlType="submit">
                Add Operator
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

// Check user exists
// yes -> update dc and branch
    //if dc is found -> add branch els add both
// No create user
    // create dc and branc
