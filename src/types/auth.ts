export interface User {
  id: string;
  firstName: string;
  lastName: string
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}




