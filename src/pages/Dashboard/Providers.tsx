import React, { useState, useRef, useEffect } from 'react';
import CardDataStats from '@/components/CardDataStats';
import TableServices from '@/components/Tables/TableServices';
import DefaultLayout from '@/layout/DefaultLayout';

interface CompanyData {
  id: string;
  name: string;
  stats: {
    totalProducts: string;
    totalConsultas: string;
    averageLogs: string;
    logsRate: string;
    levelUp?: boolean;
    levelDown?: boolean;
  };
}

const Providers: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock data with statistics for each company
  const companies: CompanyData[] = [
    {
      id: '1',
      name: 'DentalCorp',
      stats: {
        totalProducts: '50',
        totalConsultas: '246',
        averageLogs: '3540',
        logsRate: '5.2%',
        levelDown: true,
      },
    },
    {
      id: '2',
      name: 'DentiMed',
      stats: {
        totalProducts: '75',
        totalConsultas: '384',
        averageLogs: '4200',
        logsRate: '8.7%',
        levelUp: true,
      },
    },
    {
      id: '3',
      name: 'DentalPro',
      stats: {
        totalProducts: '32',
        totalConsultas: '156',
        averageLogs: '2800',
        logsRate: '3.1%',
        levelDown: true,
      },
    },
  ];

  // Set default selected company on component mount
  useEffect(() => {
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0].id);
    }
  }, []);

  // Get current company data
  const getCurrentCompanyData = () => {
    return companies.find((company) => company.id === selectedCompany)?.stats || companies[0].stats;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentStats = getCurrentCompanyData();

  return (
    <>
      <DefaultLayout>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-title-md2 font-bold text-black">
            Servicios de Proveedores
          </h2>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-800 text-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              {selectedCompany
                ? companies.find((c) => c.id === selectedCompany)?.name
                : 'Seleccionar Empresa'}
              <svg
                className={`ml-2 h-4 w-4 transform transition-transform duration-300 ease-in-out ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 transform transition-all duration-300 ease-in-out origin-top ${
                isOpen
                  ? 'opacity-100 scale-y-100 translate-y-0'
                  : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
              }`}
            >
              {companies.map((company) => (
                <button
                  key={company.id}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  onClick={() => {
                    setSelectedCompany(company.id);
                    setIsOpen(false);
                  }}
                >
                  {company.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 2xl:gap-7.5">
          <CardDataStats title="" total={currentStats.totalProducts} rate="">
            <p className="text-black">Total Products</p>
          </CardDataStats>
          <CardDataStats title="" total={currentStats.totalConsultas} rate="">
            <p className="text-black">Consultas</p>
          </CardDataStats>
          <CardDataStats
            title="En este mes"
            total={currentStats.averageLogs}
            rate={currentStats.logsRate}
            levelUp={currentStats.levelUp}
            levelDown={currentStats.levelDown}
          >
            <p className="text-black">Average Logs</p>
          </CardDataStats>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12">
            <TableServices />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Providers;