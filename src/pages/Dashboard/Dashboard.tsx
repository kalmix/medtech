import React from 'react';
import CardDataStats from '@/components/CardDataStats';
import Chart from '@/components/Charts/Chart';
import DashboardTable from '@/components/Tables/DashboardTable';
import DefaultLayout from '@/layout/DefaultLayout';
import UserInfoCard from '@/components/UserInfoCard';

const Dashboard: React.FC = () => {

  const sampleGraphData = {
    data: [31, 40, 28, 51, 42, 109, 100],
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan']
  };

  const sampleGraphData2 = {
    data: [20, 32, 45, 10, 20, 10, 5],
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan']
  };

  const sampleGraphData3 = {
    data: [10, 3, 1, 10, 6, 9, 5],
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan']
  };

  const chartData = [{
    name: 'Orders per month',
    data: [44, 50, 6, 27, 70, 22, 37, 21, 30, 40, 30, 15]
  }];

  const chartData2 = [{
    name: 'Total customers per month',
    data: [32, 20, 45, 10, 20, 10, 5, 10, 3, 1, 10, 6]
  }];

  
  return (
    <>
      <DefaultLayout>
        <h2 className="text-title-md2 font-bold text-black mb-10">
          Dashboard
        </h2>
        <UserInfoCard name="Demo User" role="Admin" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 2xl:gap-7.5">
          <CardDataStats
            title="Incremento Total"
            total="200"
            rate="32k"
            levelUp
            graphData={sampleGraphData}
          >
            <p className="text-black ">Cantidad de consulta</p>
          </CardDataStats>
          <CardDataStats
            title="Incremento Total"
            total="1340"
            rate="30%"
            levelDown
            graphData={sampleGraphData2}
          >
            <p className="text-black ">Nuevos Odontólogos por Mes </p>
          </CardDataStats>
          <CardDataStats
            title="Incremento Total"
            total="312"
            rate="14%"
            levelUp
            graphData={sampleGraphData3}
          >
            <p className="text-black ">Nuevas Citas</p>
          </CardDataStats>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 xl:col-span-6">
            <Chart title="Orders per month" data={chartData}/>
          </div>
          <div className="col-span-12 xl:col-span-6">
            <Chart title="Total customers" data={chartData2}/>
          </div>
          <div className="col-span-12">
            <DashboardTable />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Dashboard;
