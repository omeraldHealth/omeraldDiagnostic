export interface DCInfo {
  settings: {
    FAQs: string;
    PrivacyPolicy: string;
    TermsOfService: string;
    PlatformConsent: string;
    Disclaimer: string;
    CustomerSupport: string;
  };
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  FAQs?: string;
  Ad_Banner: any[]; // Assuming banners are arrays, you might want to type this more specifically
  Additional: {
    getStartedUrl: string;
    demoVideoUrl: string;
  };
  Customer_Logo: any[]; // Assuming this is an array, but you might want to type this more specifically
  Customer_Support?: string;
  Disclaimer?: string;
  Platform_Consent?: string;
  Privacy_Policy?: string;
  Terms_Of_Service?: string;
  Testimonials: any[]; // Assuming testimonials are arrays, you might want to type this more specifically
  id: string;
}

interface Branch {
  branchId: string;
  roleName: 'owner' | 'admin' | 'spoc' | 'operator' | 'manager';
}

interface DiagnosticCenter {
  diagnostic: {
    centerName: string,
    _id: string
  };
  branches: Branch[];
}

export interface UserInfo {
  userName?: string;
  phoneNumber: string;
  diagnosticCenters: DiagnosticCenter[];
}