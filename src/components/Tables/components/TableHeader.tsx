import { Search, Plus } from 'lucide-react';
import { Trash2 } from 'lucide-react';

type TableHeaderProps = {
  selectedItems: Set<unknown>;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  onDelete: () => void;
};

export const TableHeader = ({
  selectedItems,
  searchTerm,
  onSearchChange,
  onAdd,
  onDelete,
}: TableHeaderProps) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-4">
      <h2 className="text-xl font-semibold text-black dark:text-white">
        Appointments
      </h2>
      <div className="flex items-center gap-2">
        {selectedItems.size > 0 && (
          <>
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete selected"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedItems.size} selected
            </span>
          </>
        )}
      </div>
    </div>
    <div className="flex items-center gap-3 sm:ml-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-64 rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-opacity-90"
      >
        <Plus className="h-5 w-5" />
        <span>Add Appointment</span>
      </button>
    </div>
  </div>
);