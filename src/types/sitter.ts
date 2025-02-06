export interface Sitter {
  sitterId: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  rating: number;
};

export interface SitterContextType {
  isSitter: boolean;
  setIsSitter: (value: boolean) => void;
  sitterData: any | null; // You can type this according to your sitter interface
  refreshSitterStatus: () => Promise<void>;
}