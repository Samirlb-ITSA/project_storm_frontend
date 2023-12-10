import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import { apiClient } from '../../js/apiClient';
import 'react-loading-skeleton/dist/skeleton.css'
import toast from 'react-hot-toast';

const List = () => {
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiService = apiClient();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const content = await apiService('get_careers', { method: 'GET' });
        setCareers(content.resultado);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiClient]);

  if (isLoading) {
    return (
      <div className="h-ful min-h-">
        <Skeleton className="w-full h-12 mb-5" />
        <Skeleton className="w-full h-12 mb-3" count={20} />
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nombre
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {careers.length > 0 ? (
              careers.map((career: any) => (
                <tr key={career.careerid}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {career.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${career.status ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                      {career.status ? 'Activo' : 'Inactivo'}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-5">
                  No hay carreras disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List;