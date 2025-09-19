interface IUserDetailsProps {
  displayName: string;
  userPrincipalName: string;
  mail: string | null;
  mobilePhone: string | null;
  businessPhones: string[];
  jobTitle: string | null;
  officeLocation: string | null;
  preferredLanguage: string | null;
}

interface IAuthContextType {
  isAuthenticated: boolean;
  login: (token?: string) => void;
  logout: () => void;
}

export { IAuthContextType, IUserDetailsProps };
