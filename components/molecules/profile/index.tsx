import React, { useState } from 'react';
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useRecoilState } from "recoil";
import { useCurrentBranchValue, useLogoValue, useManagerValue, useProfileValue } from "@components/common/constants/recoilValues";
import { profileForm } from "utils/types/molecules/forms.interface";
import { useUpdateDiagnostic } from "utils/reactQuery";
import { errorAlert, successAlert } from "@components/atoms/alerts/alert";
import LogoUploader from "@components/atoms/fileUploder/logoUploaders";
import { profileState } from "@components/common/recoil/profile";
import { logoStateData } from "@components/common/recoil/logo";
import DynamicFormGenerator from '../../common/form/dynamicForm';
import { Switch } from 'antd';

// Profile Summary Component
export const ProfileSummaryComponent: React.FC<any> = ({ profile, style, summary }) => {
  return (
    <div className='h-auto'>
      {summary ? (
        <ProfileSummary profile={profile} style={style} />
      ) : (
        <ProfileView profile={profile} style={style} />
      )}
    </div>
  );
};

// Profile Summary Card Component
const ProfileSummaryCard: React.FC<any> = ({ title, value, link }) => {
  return (
    <div className="mb-6">
      {!link && <p className="font-bold text-sm">{title}: <span className="text-black font-light">{value}</span></p>}
      {link && (
        <p className="text-blue-800 font-bold text-sm">
          {title} URL: <a href={link} className="text-blue-900 font-light">{link}</a>
        </p>
      )}
    </div>
  );
};

// Profile Summary Component
const ProfileSummary: React.FC<any> = ({ profile, style }) => {
  const logo = useLogoValue(logoStateData);
  const profileLogo = URL.createObjectURL(new Blob([logo], { type: logo.type }));

  return (
    <section>
      <div className={`w-[70vw] p-4 bg-white relative rounded-lg h-auto text-left ${style}`}>
        <section>
          {profileLogo && <img src={profileLogo} alt="logo" className='w-[5vw] h-[5vw] rounded-full border-2' style={{ borderRadius: '50%' }} />}
          <section className="grid grid-cols-2 w-[70%]">
            <aside>
              <ProfileSummaryCard title="Diagnostic Center Name" value={profile?.diagnosticName} />
              <ProfileSummaryCard title="Email" value={profile?.email} />
              <ProfileSummaryCard title="Contact" value={profile?.phoneNumber} />
              <ProfileSummaryCard title="Facebook" value={""} link={profile?.brandDetails?.facebookUrl} />
              <ProfileSummaryCard title="Instagram" value={""} link={profile?.brandDetails?.instaUrl} />
            </aside>
            <aside>
              <ProfileSummaryCard title="Branch Name" value={profile?.branchDetails?.[0]?.branchName} />
              <ProfileSummaryCard title="Branch Email" value={profile?.branchDetails?.[0]?.branchEmail} link={profile?.branchDetails?.[0]?.branchEmail} />
              <ProfileSummaryCard title="Branch Contact" value={profile?.branchDetails?.[0]?.branchContact} />
              <ProfileSummaryCard title="Branch Address" value={profile?.branchDetails?.[0]?.branchAddress} />
            </aside>
          </section>
        </section>
      </div>
    </section>
  );
};

// Profile View Component
const ProfileView: React.FC<any> = ({ style }) => {
  const currentManager = useManagerValue();
  const currentBranch = useCurrentBranchValue();
  const [edit, setEdit] = useState<boolean>(false);
  const [profile, setProfile] = useRecoilState(profileState);

  const updateDiagnostic = useUpdateDiagnostic({
    onSuccess: (data) => {
      successAlert("Profile updated successfully");
      setProfile(data?.data);
    },
    onError: (error) => {
      errorAlert("Error updating profile");
    },
  });

  const handleSubmit = (data: any) => {
    updateDiagnostic.mutate({ data: { id: profile?._id, ...data } });
    setEdit(false);
  }

  return (
      <div className={`p-8 bg-white h-[80vh] text-left ${style}`}>
        {currentManager?.managerRole.toLowerCase() === ("admin" || "owner") && (
          <>
           <span className='flex justify-end'>
              <Switch
                style={{ fontSize: '10px' }}
                checkedChildren="Add"
                unCheckedChildren="View"
                checked={edit}
                className='bg-black'
                onChange={() => setEdit(!edit)}
              />
            </span>
          </>
        )}
         {
                !edit ? 
                <>
                  <section>
                  <img src={profile?.brandDetails?.brandLogo} alt="logo" className='w-[18vw] h-[18vw] sm:w-[7vw] sm:h-[7vw] rounded-full border-2' />
                  <section className='grid sm:grid-cols-2 grid-cols-1 gap-0 lg:gap-[10vw] w-[100%]'> 
                              <aside>
                                <p className='my-8 font-bold text-sm'>{"Diagnostic Center Name: "}<span className='text-black font-light'>{profile?.diagnosticName}</span></p>
                                <p className='my-8 font-bold text-sm'>{"Email: "}<span className='text-black font-light lowercase'>{profile?.email}</span></p>
                                <p className='my-8 font-bold text-sm'>{"Contact: "}<span className='text-black font-light'>{profile?.phoneNumber}</span></p>
    
                                <p className='my-8 font-bold text-sm'>{"Facebook Url "}<a href={profile?.brandDetails?.facebookUrl} className='text-black font-light'>{profile?.brandDetails?.facebookUrl}</a></p>
                                <p className='my-8 font-bold text-sm'>{"Instagram Url: "}<a href={profile?.brandDetails?.instaUrl} className='text-black font-light lowercase'>{profile?.brandDetails?.instaUrl}</a></p>
                              </aside>
                              <aside>
                                <p className='my-8 font-bold text-sm'>{"Branch Name: "}<span className='text-black font-light'>{currentBranch?.branchName}</span></p>
                                <p className='my-8 font-bold text-sm'>{"Branch Email: "}<span className='text-black font-light lowercase'>{currentBranch?.branchEmail}</span></p>
                                <p className='my-8 font-bold text-sm'>{"Branch Contact: "}<span className='text-black font-light'>{currentBranch?.branchContact}</span></p>
                                <p className='my-8 font-bold text-sm'>{"Branch Address "}<span className='text-black font-light'>{currentBranch?.branchAddress}</span></p>
                              </aside>
                  </section>
                  </section>
                </>:
                <>
                  <section className='sm:my-2 w-[80vw] sm:w-[50vw] sm:pr-[16vw]'>  
                    <p className='mb-6 italic font-bold text-md'>Edit your profile</p>
                    <DynamicFormGenerator formProps={profileForm} buttonText="Update" handleSubmit={handleSubmit} defaultValues={{...profile,...profile?.brandDetails}} />
                  </section>
                </>
              }
      </div>
  );
};
