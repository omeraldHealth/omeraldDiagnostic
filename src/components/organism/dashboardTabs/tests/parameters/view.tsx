//@ts-nocheck
import { testDetailsState } from "@components/common/recoil/testDetails";
import { paramState } from "@components/common/recoil/testDetails/param";
import { bioRefState } from "@components/common/recoil/testDetails/test";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CommonSettingTable } from "../../settingsTabs/utils/table";
import { PARAMETER_COLUMNS } from "../../settingsTabs/utils/tabs";
import UpdateParam from "./create/update";

export const ViewParameters = () => {
  const [testDetails, setTestDetail] = useRecoilState(testDetailsState);
  const [param, setParam] = useRecoilState(paramState);
  const [bioRef, setBioRef] = useRecoilState(bioRefState);
  const [editParam, setEditParam] = useState(false);

  const handleHide = () => {
    setEditParam(false);
  };

  const handleEdit = (record) => {
    setEditParam(true);
    setParam(record);
    setBioRef(record?.bioRefRange);
  };

  const handleDelete = (record) => {
    const updatedParameters = testDetails?.parameters?.filter(
      (param) => param?.name !== record?.name,
    );
    setTestDetail({ ...testDetails, parameters: updatedParameters });
  };

  const columns = PARAMETER_COLUMNS({ handleEdit, handleDelete });

  return (
    <section>
      <CommonSettingTable data={testDetails?.parameters} columns={columns} />
      {editParam && <UpdateParam handleHide={handleHide} />}
    </section>
  );
};
