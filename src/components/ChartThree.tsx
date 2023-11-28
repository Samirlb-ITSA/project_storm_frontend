import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeProps {
  rolesCount: { [roleName: string]: number };
  totalUsers: number;
}

const ChartThree: React.FC<ChartThreeProps> = ({ rolesCount, totalUsers }) => {
  const labels = Object.keys(rolesCount);
  const roleCount = Object.values(rolesCount);
  const series = Object.values(rolesCount).map(count => (count / totalUsers) * 100);
  const colors = ['meta-8', 'success', 'meta-5', 'meta-4']
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#F0950C', '#219653', '#259AE6', '#313D4A'],
    labels: labels,
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Usuarios
          </h5>
        </div>
        <div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={roleCount}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {labels.map((label, index) => (
          <div key={label} className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
            <span className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-${colors[index] ? colors[index] : '#3c4fe0'}`}></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {label} </span>
                <span> {Math.round(series[index])}% </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;