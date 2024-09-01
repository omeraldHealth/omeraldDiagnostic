export interface USER_DATA {
  userName: string;
  phoneNumber: string;
  _id?: string;
  diagnosticCenters: [];
}

export interface DIAGNOSTIC_CARD_PROPS {
  center: {
    diagnostic: {
      _id: string;
      centerName: string;
    };
    branches: {
      branchId: string;
      roleName: string;
    }[];
  };
  isSelected: boolean;
  handleCardClick: (centerId: string) => void;
}
