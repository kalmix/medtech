import { SetStateAction, useState } from 'react';
import { Search, Eye, ChevronRight } from 'lucide-react';

const packageData = [
  {
    name: 'Item Default',
    type: 'Item Default',
    status: '404',
  },
  {
    name: 'Item Default',
    type: 'Item Default',
    status: '200',
  },
  {
    name: 'Item Default',
    type: 'Item Default',
    status: '403',
  },
  {
    name: 'Item Default',
    type: 'Item Default',
    status: '10000',
  },
  {
    name: 'Item Extra 1',
    type: 'Item Type 1',
    status: '200',
  },
  {
    name: 'Item Extra 2',
    type: 'Item Type 2',
    status: '404',
  },
];

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc' | null;
};

const LogsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: '',
    direction: null,
  });

  // Sort function
  const sortData = (data: any[]) => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
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
      return <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />;
    }

    if (sortConfig.direction === 'asc') {
      return <ChevronRight className="h-4 w-4 rotate-270" />;
    }

    if (sortConfig.direction === 'desc') {
      return <ChevronRight className="h-4 w-4 rotate-90" />;
    }

    return <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />;
  };

  // Filter and sort data
  const filteredData = packageData.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedData = sortData(filteredData);

  // Pagination calculations
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(sortedData.length / entriesPerPage);

  const handleView = (item: { name: string; type: string; status: string }) => {
    console.log('View item:', item);
  };

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesPerPageChange = (e: { target: { value: any } }) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Historico de logs
          </h2>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th
                className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Service Name
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center gap-2">
                  Service Dependencies
                  {getSortIcon('type')}
                </div>
              </th>
              <th
                className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Logs Qty
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((packageItem, key) => (
              <tr
                key={indexOfFirstEntry + key}
                className="hover:bg-gray-50 dark:hover:bg-meta-4"
              >
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h3 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h3>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.type}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(packageItem)}
                      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4 inline" /> View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Entries Per Page Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
          Showing {indexOfFirstEntry + 1} to{' '}
          {Math.min(indexOfLastEntry, sortedData.length)} of {sortedData.length}{' '}
          entries
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label className="text-sm text-gray-500 dark:text-gray-400 mr-2">
              Show entries:
            </label>
            <select
              value={entriesPerPage}
              onChange={handleEntriesPerPageChange}
              className="border border-stroke rounded px-2 py-1 text-sm bg-transparent dark:border-strokedark dark:bg-meta-4"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex gap-2">
            {getPageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm
                  ${
                    currentPage === number
                      ? 'border-2 border-blue-500 text-blue-500'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } transition-colors`}
              >
                {number}
              </button>
            ))}
            {totalPages > 1 && (
              <button
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsTable;
