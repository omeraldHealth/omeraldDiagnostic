export type BasicDetailsForm = {
    diagnosticName: string;
    phoneNumber: string,
    email: string;
};

export type BrandDetailsForm = {
    brandLogo: FileList;
    brandBanner: FileList;
    facebookUrl?: string;
    instaUrl?: string;
};

export type BranchDetails = {
    branchName: string,
    branchEmail: string,
    branchAddress: string,
    branchContact: string,
    branchManager: string,
    managerName: string;
    managerRole: string;
    managerContact: string;
};

export type IManagerDetails = {
    managerName: string;
    managerRole: string;
    managerContact: string;
};