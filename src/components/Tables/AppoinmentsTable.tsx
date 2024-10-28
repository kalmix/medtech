import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TableHeader } from '@/components/Tables/components/TableHeader';
import { AppointmentModal } from '@/components/Tables/components/AppointmentModal';
import { TableRow } from '@/components/Tables/components/TableRow';
import { Pagination } from '@/components/Tables/components/Pagination';
import { Appointment, SortConfig } from '@/components/Tables/types/types';
import { appointmentData } from '@/components/Tables/components/appointments';

export const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: null,
  });
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  // Sort function
  const sortData = (data: Appointment[]) => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key as keyof Appointment] < b[sortConfig.key as keyof Appointment]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof Appointment] > b[sortConfig.key as keyof Appointment]) {
// components/AppointmentsTable.tsx (continued)
return sortConfig.direction === 'asc' ? 1 : -1;
}
return 0;
});
};

const handleSort = (key: string) => {
let direction: 'asc' | 'desc' | null = 'asc';

if (sortConfig.key === key) {
if (sortConfig.direction === 'asc') {
  direction = 'desc';
} else if (sortConfig.direction === 'desc') {
  direction = null;
}
}

setSortConfig({ key, direction });
};

const getSortIcon = (key: string) => {
if (sortConfig.key !== key) {
return <ChevronDown className="h-4 w-4 text-gray-400" />;
}
return sortConfig.direction === 'asc' ? (
<ChevronUp className="h-4 w-4" />
) : (
<ChevronDown className="h-4 w-4" />
);
};

// Filter and sort data
const filteredData = appointments.filter(
(apt) =>
apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
apt.id.toLowerCase().includes(searchTerm.toLowerCase()),
);

const sortedData = sortData(filteredData);

// Pagination calculations
const indexOfLastEntry = currentPage * entriesPerPage;
const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
const currentEntries = sortedData.slice(indexOfFirstEntry, indexOfLastEntry);
const totalPages = Math.ceil(sortedData.length / entriesPerPage);

const handleAdd = () => {
setIsAddModalOpen(true);
};

const handleSaveAdd = (formData: FormData) => {
const newAppointment = {
id: `#${Math.floor(Math.random() * 100000)
  .toString()
  .padStart(5, '0')}`,
name: formData.get('name') as string,
email: formData.get('email') as string,
appointmentDate: formData.get('appointmentDate') as string,
avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
  formData.get('name') as string,
)}&background=random`,
};

setAppointments((prev) => [...prev, newAppointment]);
setIsAddModalOpen(false);
};

const handleEdit = (appointment: Appointment) => {
setEditingAppointment(appointment);
setIsEditModalOpen(true);
setOpenActionMenu(null);
};

const handleSaveEdit = (updatedAppointment: Appointment) => {
setAppointments((prevAppointments) =>
prevAppointments.map((apt) =>
  apt.id === updatedAppointment.id
    ? { ...updatedAppointment, avatar: apt.avatar }
    : apt,
),
);
setIsEditModalOpen(false);
setEditingAppointment(null);
};

const handleDelete = () => {
const selectedIndices = Array.from(selectedItems).sort(
(a, b) => (b as number) - (a as number),
);

const appointmentsToDelete = new Set(
selectedIndices.map(
  (index) => currentEntries[(index as number) - indexOfFirstEntry].id,
),
);

const updatedAppointments = appointments.filter(
(appointment) => !appointmentsToDelete.has(appointment.id),
);

setAppointments(updatedAppointments);
setSelectedItems(new Set());

const newTotalPages = Math.ceil(
updatedAppointments.length / entriesPerPage,
);
if (currentPage > newTotalPages) {
setCurrentPage(1);
}
};

const handleSelectItem = (key: number) => {
setSelectedItems((prev) => {
const newSet = new Set(prev);
if (newSet.has(key)) {
  newSet.delete(key);
} else {
  newSet.add(key);
}
return newSet;
});
};

const handleSelectAll = () => {
if (selectedItems.size === currentEntries.length) {
setSelectedItems(new Set());
} else {
const currentPageIndices = Array.from(
  { length: currentEntries.length },
  (_, i) => indexOfFirstEntry + i,
);
setSelectedItems(new Set(currentPageIndices));
}
};

return (
<div className="rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
<TableHeader
  selectedItems={selectedItems}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  onAdd={handleAdd}
  onDelete={handleDelete}
/>

<div className="max-w-full overflow-x-auto">
  <table className="w-full table-auto">
    <thead>
      <tr className="bg-gray-2 text-left dark:bg-meta-4">
        <th className="py-4 px-4 font-medium text-black dark:text-white">
          <input
            type="checkbox"
            checked={
              selectedItems.size === currentEntries.length &&
              currentEntries.length > 0
            }
            onChange={handleSelectAll}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-strokedark"
          />
        </th>
        <th
          className="py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
          onClick={() => handleSort('id')}
        >
          <div className="flex items-center gap-2">
            ID {getSortIcon('id')}
          </div>
        </th>
        <th
          className="py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
          onClick={() => handleSort('name')}
        >
          <div className="flex items-center gap-2">
            Name {getSortIcon('name')}
          </div>
        </th>
        <th
          className="py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
          onClick={() => handleSort('email')}
        >
          <div className="flex items-center gap-2">
            Email {getSortIcon('email')}
          </div>
        </th>
        <th
          className="py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
          onClick={() => handleSort('appointmentDate')}
        >
          <div className="flex items-center gap-2">
            Appointment Date {getSortIcon('appointmentDate')}
          </div>
        </th>
        <th className="py-4 px-4 font-medium text-black dark:text-white">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {currentEntries.map((appointment, index) => {
        const itemKey = indexOfFirstEntry + index;
        return (
          <TableRow
            key={appointment.id}
            appointment={appointment}
            isSelected={selectedItems.has(itemKey)}
            onSelect={() => handleSelectItem(itemKey)}
            onEdit={handleEdit}
            onView={(item) => console.log('View appointment:', item)}
            isMenuOpen={openActionMenu === itemKey}
            onToggleMenu={() =>
              setOpenActionMenu(
                openActionMenu === itemKey ? null : itemKey,
              )
            }
            itemKey={itemKey}
          />
        );
      })}
    </tbody>
  </table>
</div>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  entriesPerPage={entriesPerPage}
  totalEntries={sortedData.length}
  startEntry={indexOfFirstEntry + 1}
  endEntry={Math.min(indexOfLastEntry, sortedData.length)}
  onPageChange={setCurrentPage}
  onEntriesPerPageChange={(e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
    setOpenActionMenu(null);
  }}
/>

<AppointmentModal
  isOpen={isAddModalOpen}
  onClose={() => setIsAddModalOpen(false)}
  onSubmit={handleSaveAdd}
  title="Add New Appointment"
  submitLabel="Add Appointment"
/>

<AppointmentModal
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  onSubmit={(formData) => {
    if (editingAppointment) {
      const updatedAppointment = {
        ...editingAppointment,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        appointmentDate: formData.get('appointmentDate') as string,
      };
      handleSaveEdit(updatedAppointment);
    }
  }}
  appointment={editingAppointment || undefined}
  title="Edit Appointment"
  submitLabel="Save Changes"
/>
</div>
);
};

export default AppointmentsTable;
