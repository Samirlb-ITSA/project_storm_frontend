import BrandOne from '../images/brand/brand-01.svg';

interface Company {
  companyid: string;
  name: string;
  email: string;
  nit: number;
}

const TableOne = ({ companies }: { companies: Company[] }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Empresas
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nombre
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Correo
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              NIT
            </h5>
          </div>
        </div>

        {companies.map((company) => (
          <div key={company.companyid} className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={BrandOne} className='h-12 w-12 rounded-full' alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">{company.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{company.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{company.nit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;