import React from 'react';
import CardDataStats from '@/components/CardDataStats';
import TableServices from '@/components/Tables/TableServices';
import DefaultLayout from '@/layout/DefaultLayout';

const ServiceClients: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <h2 className="text-title-md2 font-bold text-black mb-10">
          Servicios de Clientes
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 2xl:gap-7.5">
          <CardDataStats
            title="Incremento Total"
            total="200"
            rate="0.43%"
            levelUp
          >
            <p className="text-black ">Cantidad de consulta</p>
          </CardDataStats>
          <CardDataStats
            title="Incremento Total"
            total="1340"
            rate="4.35%"
            levelUp
          >
            <p className="text-black ">Nuevos Odontólogos por Mes </p>
          </CardDataStats>
          <CardDataStats
            title="Incremento Total"
            total="3540"
            rate="2.59%"
            levelUp
          >
            <p className="text-black ">Nuevas Citas</p>
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

export default ServiceClients;
