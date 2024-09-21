//@ts-nocheck
import { usePersistedBranchState } from "@/hooks/localstorage";
import { profileState } from "@/utils/recoil";
import { Switch, List, Card, Avatar } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CheckCircleOutlined } from "@ant-design/icons";

export const ProfileView: React.FC<any> = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const [profile] = useRecoilState(profileState);
    const [selectedBranch, setSelectedBranch] = usePersistedBranchState();
    const [branch, setBranch] = useState({})
    const branches = profile?.branches || []; 
    

    useEffect(() => { 
        const currentBranch = branches?.filter((branch) => branch?._id == selectedBranch)[0]
        setBranch(currentBranch)
        console.log(branch)
    },[])

    const handleBranchSelect = (branch: any) => {
        setSelectedBranch(branch);
    };

    return (
        <div className="p-8 bg-white h-full text-left rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Profile Overview</h1>
            {/* <Switch
            style={{ fontSize: "10px" }}
            checkedChildren="Edit"
            unCheckedChildren="View"
            checked={edit}
            className="bg-black"
            onChange={() => setEdit(!edit)}
            /> */}
        </div>

        {/* Profile Information */}
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
            <div className="space-y-8">
                <section className="flex items-center">
                    {profile?.brandingInfo?.logoUrl && (
                    <img
                        src={profile?.brandingInfo?.logoUrl}
                        alt="logo"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-primary shadow-lg object-cover"
                    />
                    )}
                    <div className="ml-6">
                    <p className="text-2xl font-extrabold text-primary">{profile?.centerName}</p>
                    <p className="text-base font-medium text-gray-600">Diagnostic Center</p>
                    </div>
                </section>

                <div className="px-6 rounded-lg">
                    <p className="text-xl font-semibold text-gray-800 mb-4">Contact Information</p>
                    <div className="space-y-3">
                    <p className="text-sm text-gray-700">
                        <span className="font-bold text-gray-800">Email:</span>{" "}
                        <span className="text-primary lowercase">{profile?.email}</span>
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-bold text-gray-800">Phone:</span> {profile?.phoneNumber}
                    </p>
                    </div>
                </div>
            </div>


            {/* Branch Information */}
            <div className="p-6 rounded-lg shadow-sm">
            <p className="text-base font-semibold">Selected Branch</p>
            {branch ? (
                <div className="text-gray-600 space-y-2 mt-2">
                <p>
                    <span className="font-semibold">Branch Name:</span>{" "}
                    {branch?.branchName}
                </p>
                <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <span className="lowercase">{branch?.branchEmail}</span>
                </p>
                <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {branch?.branchContact}
                </p>
                <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {branch?.branchAddress}
                </p>
                </div>
            ) : (
                <p className="text-gray-600 italic">No branch selected</p>
            )}
            </div>
        </div>

        {/* Branch List */}
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">All Branches</h2>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={branches}
                renderItem={(branch) => (
                <List.Item>
                <Card
                    hoverable
                    className={`border ${selectedBranch?.branchId === branch.branchId ? 'border-green-500' : 'border-gray-200'}`}
                    // onClick={() => handleBranchSelect(branch)}
                >
                    <Card.Meta
                                avatar={<Avatar className={`${selectedBranch?.branchId === branch.branchId ? 'bg-green-500' : 'bg-gray-200'}`}
                                    icon={<CheckCircleOutlined />} />}
                        title={branch.branchName}
                        description={
                            <>
                            <p>{branch.branchEmail}</p>
                            <p>{branch.branchContact}</p>
                            </>
                        }
                    />
                </Card>
                </List.Item>
            )}
            />
        </div>
        </div>
    );
};
