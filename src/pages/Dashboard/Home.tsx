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
  const [userStatistics, setUserStatistics] = useState()
  const [jobStatistics, setJobStatistics] = useState()

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const userStatisticsContent = await apiService('statistics/user', { method: 'GET' });
        setUserStatistics(userStatisticsContent)
        const jobStatisticsContent = await apiService('statistics/job', { method: 'GET' });
        setJobStatistics(jobStatisticsContent)
      } catch (error) {
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading || !userStatistics || !jobStatistics) {
    return (
      <div className="h-ful min-h-">
        <Skeleton className="w-full h-12 mb-5" />
        <Skeleton className="w-full h-12 mb-3" count={20}  />
      </div>
    );
  }

  const rolesCountData = Object.values(userStatistics["roles_count"] || {}).map(count => Number(count));
  const rolesNames = Object.keys(userStatistics["roles_count"] || {});

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-4 2xl:gap-5">
        <Card
          value={userStatistics["total_users"]}
          title="Usuarios totales"
          imageName="users"
          hasUpdates={userStatistics["new_users_last_month"] != "0"}
          updatesPercentage={userStatistics["new_users_last_month"]+ "%"}
        />

        <Card
            value={jobStatistics["active_job_offers"]}
            title="Ofertas activas"
            imageName="activeJobOffer"
            hasUpdates={jobStatistics["new_job_offers_last_month"] != "0"}
            updatesPercentage={jobStatistics["new_job_offers_last_month"]+ "%"}
        />

        <Card
            value={jobStatistics["total_job_offers"]}
            title="Ofertas totales"
            imageName="jobOffer"
            hasUpdates={false}
            updatesPercentage={""}
          />

        <Card
            value={jobStatistics["total_companies"]}
            title="Compañias totales"
            imageName="company"
            hasUpdates={false}
            updatesPercentage={""}
          />
      </div>

      <div className="mt-3 grid grid-cols-12 gap-3 md:mt-5 md:gap-5 2xl:mt-5 2xl:gap-5">
        <ChartOne statistics={jobStatistics} />
        <ChartTwo />
        <ChartThree rolesCount={userStatistics["roles_count"] || {}} totalUsers={userStatistics["total_users"]}/>
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