import { Mail, Calendar, MoreHorizontal, Edit2 } from 'lucide-react';
import { Appointment } from '@/components/Tables/types/types';
import { format } from "date-fns";

type TableRowProps = {
  appointment: Appointment;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: (appointment: Appointment) => void;
  onView: (appointment: Appointment) => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  itemKey: number;
};

export const TableRow = ({
  appointment,
  isSelected,
  onSelect,
  onEdit,
  isMenuOpen,
  onToggleMenu,
}: TableRowProps) => {
  // Parse and format the appointment date
  const formatAppointmentDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if it's already in our custom format
      if (dateString.includes(' ')) {
        return dateString; // Return as is if it's already in our format
      }
      return format(date, "yyyy-MM-dd hh:mm a");
    } catch (e) {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  const formattedAppointment = {
    ...appointment,
    appointmentDate: formatAppointmentDate(appointment.appointmentDate)
  };

  return (
    <tr
      className={`hover:bg-gray-50 dark:hover:bg-meta-4 ${
        isSelected ? 'bg-gray-50 dark:bg-meta-4' : ''
      }`}
    >
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-strokedark"
        />
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{appointment.id}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={appointment.avatar}
              alt={`${appointment.name}'s avatar`}
            />
          </div>
          <p className="text-black dark:text-white font-medium">
            {appointment.name}
          </p>
        </div>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-400" />
          <p className="text-black dark:text-white">{appointment.email}</p>
        </div>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <p className="text-black dark:text-white">
            {formatAppointmentDate(appointment.appointmentDate)}
          </p>
        </div>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="relative">
          <button
            onClick={onToggleMenu}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-boxdark z-10 animate-slideIn">
              <div className="py-1">
                <button
                  onClick={() => onEdit(formattedAppointment)}
                  className="w-full px-4 py-2 text-sm text-blue-800 hover:bg-blue-100 transition-all flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;