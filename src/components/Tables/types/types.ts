export type Appointment = {
    id: string;
    name: string;
    email: string;
    appointmentDate: string;
    avatar: string;
  };
  
  export type SortConfig = {
    key: string;
    direction: 'asc' | 'desc' | null;
  };