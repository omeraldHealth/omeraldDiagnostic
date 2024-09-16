import React from "react"

export const ADMIN_USER_ACTIVITES_COLUMNS = [
    {
      key: "activity",
      title: "Activity",
      dataIndex: "activity",
    },
    {
      key: "user",
      title: "Activity By",
      dataIndex: "user",
      render: (text: any) => { 
        return (<p>{text?.userName}</p>)
      },
    },
    {
      key: "updatedTime",
      title: "Activity Time",
      dataIndex: "updatedTime",
    },
];