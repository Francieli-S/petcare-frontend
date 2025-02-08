export interface Sitter {
  sitterId: string;
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  rating: number;
  profileImage?: string; // Optional, for future DB updates
}

export interface SitterContextType {
  isSitter: boolean;
  setIsSitter: (value: boolean) => void;
  sitterData: any | null; // You can type this according to your sitter interface
  refreshSitterStatus: () => Promise<void>;
}
