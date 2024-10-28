import React, { ReactNode } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface GraphData {
  data: number[];
  categories?: string[];
}

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  graphData?: GraphData; // Optional graph data
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  graphData,
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      background: 'transparent',
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.9,
        opacityTo: 0.5,
        stops: [0, 90, 100]
      }
    },
    colors: [levelUp ? '#7ADC9E' : levelDown ? '#EF4444' : '#3C50E0'],
    xaxis: {
      categories: graphData?.categories || [],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
    }
  };

  const series = [{
    name: title,
    data: graphData?.data || []
  }];

  return (
    <div className="relative border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark rounded-xl overflow-hidden">
      {/* Background Graph */}
      {graphData && (
        <div className="absolute inset-0 opacity-30">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="area"
            height="100%"
            width="100%"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-left justify-left">{children}</div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-4xl font-medium text-[#111111] dark:text-white">
              {total}
            </h4>
            <span className="text-sm font-light">{title}</span>
          </div>

          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              levelUp && 'text-green-700'
            } ${levelDown && 'text-red-700'}`}
          >
            {rate}

            {levelUp && (
              <svg
                className="fill-meta-3 rotate-45"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                />
              </svg>
            )}
            {levelDown && (
              <svg
                className="fill-red -rotate-45"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill=""
                />
              </svg>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;