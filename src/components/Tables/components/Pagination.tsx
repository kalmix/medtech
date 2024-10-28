import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  entriesPerPage: number;
  totalEntries: number;
  startEntry: number;
  endEntry: number;
  onPageChange: (page: number) => void;
  onEntriesPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  entriesPerPage,
  totalEntries,
  startEntry,
  endEntry,
  onPageChange,
  onEntriesPerPageChange,
}: PaginationProps) => (
  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pb-4">
    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
      Showing {startEntry} to {endEntry} of {totalEntries} entries
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <label className="text-sm text-gray-500 dark:text-gray-400 mr-2">
          Show entries:
        </label>
        <select
          value={entriesPerPage}
          onChange={onEntriesPerPageChange}
          className="border border-stroke rounded px-2 py-1 text-sm bg-transparent dark:border-strokedark dark:bg-meta-4"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="flex items-center px-3 text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);