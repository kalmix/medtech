import { useState } from 'react';
import { Search } from 'lucide-react';

const packageData = [
  {
    name: 'Item Default',
    price: 5120,
    invoiceDate: `Item Default`,
    status: '404',
    type: 'Item Default',
  },
  {
    name: 'Item Default',
    price: 5912,
    invoiceDate: `Item Default`,
    status: '200',
    type: 'Item Default',
  },
  {
    name: 'Item Default',
    price: 9942,
    invoiceDate: `Item Default`,
    status: '403',
    type: 'Item Default',
  },
  {
    name: 'Item Default',
    price: 120,
    invoiceDate: `Item Default`,
    status: 'Error',
    type: 'Item Default',
  },
];

const DashboardTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = packageData.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Historial de Logs
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary dark:focus:border-primary"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Label
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Servicio ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Nombre Función
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Label
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Código de Error
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h3 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h3>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.price}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.type}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.invoiceDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.status === 'Paid'
                        ? 'bg-success text-success'
                        : packageItem.status === 'Error'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
