import React from 'react';
import CardDataStats from '@/components/CardDataStats';
import LogsTable from '@/components/Tables/LogsTable';
import DefaultLayout from '@/layout/DefaultLayout';

const ServiceLogs: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <h2 className="text-title-md2 font-semibold text-black mb-10">
          Service Logs
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 2xl:gap-7.5">
          <CardDataStats
            title="Incremento Total"
            total="142"
            rate="5.5%"
            levelUp
          >
            <p className="text-black ">Cantidad de consulta</p>
          </CardDataStats>
          <CardDataStats
            title="Incremento Total"
            total="324"
            rate="45%"
            levelUp
          >
            <p className="text-black ">Nuevos Odontólogos por Mes </p>
          </CardDataStats>
          <CardDataStats
            title="Incremento Total"
            total="1240"
            rate="12%"
            levelDown
          >
            <p className="text-black ">Nuevas Citas</p>
          </CardDataStats>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12">
            <LogsTable />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default ServiceLogs;
