import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import { apiClient } from '../../js/apiClient';
import 'react-loading-skeleton/dist/skeleton.css'
import toast from 'react-hot-toast';
import Card from '../../components/Card.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/TableOne.tsx';

const Statistics = () => {
  const apiService = apiClient();
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState()

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const content = await apiService('statistics', { method: 'GET' });
        setStatistics(content)
      } catch (error) {
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiClient]);

  if (isLoading || !statistics) {
    return (
      <div className="h-ful min-h-">
        <Skeleton className="w-full h-12 mb-5" />
        <Skeleton className="w-full h-12 mb-3" count={20}  />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card  
          value={statistics["total_users"]}
          title="Usuarios totales"
          imageName="users"
          hasUpdates={statistics["new_users_percentage_last_month"] != "0"}
          updatesPercentage={statistics["new_users_percentage_last_month"]+ "%"}
        />

        
        <Card  
            value={statistics["active_job_offers_per_user"]}
            title="Ofertas activas"
            imageName="activeJobOffer"
            hasUpdates={statistics["new_job_offers_percentage_last_month"] != "0"}
            updatesPercentage={statistics["new_job_offers_percentage_last_month"]+ "%"}
        />

        <Card  
            value={statistics["total_job_offers"]}
            title="Ofertas totales"
            imageName="jobOffer"
            hasUpdates={false}
            updatesPercentage={""}
          />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default Statistics;
