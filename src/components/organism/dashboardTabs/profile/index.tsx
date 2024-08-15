import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useProfileValue } from "@components/common/constants/recoilValues";
import { usePersistedBranchState } from "@components/common/recoil/hooks/usePersistedState";
import { useInvalidateQuery } from "@utils/reactQuery";

const ProfileView = () => {
  const profileValue = useProfileValue();
  const invalidateQuery = useInvalidateQuery();

  useEffect(() => {
    invalidateQuery("diagnosticCenter");
  }, [invalidateQuery]);

  return (
    <div>
      <section className="gap-20 mx-20 mt-20 mb-10">
        <p className="font-bold my-2 underline">Diagnostic Center</p>
        <section className="bg-white p-4">
          <CenterDetails profileValue={profileValue} />
          <OwnerDetails owner={profileValue?.ownerId} />
        </section>
      </section>
      <BranchList branches={profileValue?.branches} />
    </div>
  );
};

const CenterDetails = ({ profileValue }) => (
  <section>
    <p className="font-bold text-orange-400 underline">Center Details</p>
    <p className="my-4">Name: <b>{profileValue?.centerName}</b></p>
    <p className="my-4">Contact: <b>{profileValue?.phoneNumber}</b></p>
    <p className="my-4">Email: <b className="lowercase">{profileValue?.email}</b></p>
  </section>
);

const OwnerDetails = ({ owner }) => (
  <section>
    <p className="font-bold text-green-800 underline">Branch Owner</p>
    <p className="my-4">Name: <b className="lowercase">{owner?.userName}</b></p>
    <p className="my-4">Contact: <b className="lowercase">{owner?.phoneNumber}</b></p>
  </section>
);

const BranchList = ({ branches }) => (
  <section className="w-full gap-20 mx-20">
    <p className="font-bold my-2 underline">Branches</p>
    <section className="grid grid-cols-4 gap-y-4 w-[80%]">
      {branches?.map((branch) => (
        <BranchCard key={branch._id} branch={branch} />
      ))}
    </section>
  </section>
);

const BranchCard = ({ branch }) => {
  const [selectedBranch] = usePersistedBranchState();
  const isCurrentBranch = branch?._id === selectedBranch;

  return (
    <section className="w-[15vw] h-[15vh] bg-white border-2 border-round-full p-4">
      <p className="text-sm my-2 font-bold flex">
        {branch?.branchName}
        {isCurrentBranch && <FaCheckCircle className="mx-2 w-4 h-4 text-green-700" />}
      </p>
      <p className="text-sm my-2">{branch?.branchContact}</p>
      <p className="text-sm my-2">{branch?.branchEmail}</p>
      <p className="text-sm my-2 truncate overflow-hidden whitespace-nowrap">{branch?.branchAddress}</p>
    </section>
  );
};

export default ProfileView;
