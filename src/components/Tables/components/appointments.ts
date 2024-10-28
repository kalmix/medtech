// appointments.ts
import { Appointment } from '@/components/Tables/types/types';

export const appointmentData: Appointment[] = [
  {
    id: '#39295',
    name: 'John Doe',
    email: 'john@hotmail.com',
    appointmentDate: '2024-10-26 09:00 AM',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  },
  {
    id: '#04920',
    name: 'Jane S.',
    email: 'jane@gmail.com',
    appointmentDate: '2024-10-26 10:30 AM',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
  },
  {
    id: '#01423',
    name: 'Alice J.',
    email: 'alicejohn@gmail.com',
    appointmentDate: '2024-10-26 11:00 AM',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random',
  },
  {
    id: '#38276',
    name: 'M Brown',
    email: 'michaelbrown@yahoo.com',
    appointmentDate: '2024-10-26 12:30 PM',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=random',
  },
  {
    id: '#49285',
    name: 'Emily Wilson',
    email: 'emilywilson@outlook.com',
    appointmentDate: '2024-10-26 01:00 PM',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Wilson&background=random',
  },
  {
    id: '#52937',
    name: 'David Lee',
    email: 'davidlee@gmail.com',
    appointmentDate: '2024-10-26 02:15 PM',
    avatar: 'https://ui-avatars.com/api/?name=David+Lee&background=random',
  },
  {
    id: '#67345',
    name: 'Olivia M.',
    email: 'oliviam@hotmail.com',
    appointmentDate: '2024-10-26 03:00 PM',
    avatar: 'https://ui-avatars.com/api/?name=Olivia+Martinez&background=random',
  },
    {
        id: '#12345',
        name: 'Chris P.',
        email: 'chris@gmail.com',
        appointmentDate: '2024-10-26 04:00 PM',
        avatar: 'https://ui-avatars.com/api/?name=Chris+Perez&background=random',
    },
];

// You might also want to add helper functions for the data here
export const generateAppointmentId = (): string => {
  return `#${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
};

export const generateAvatarUrl = (name: string): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
};

// Format the appointment date
export const formatAppointmentDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Validate the appointment date
export const isValidAppointmentDate = (dateStr: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2} (AM|PM)$/;
  return regex.test(dateStr);
};