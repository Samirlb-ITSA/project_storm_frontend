import { useParams } from 'react-router-dom';
import useJobOfferStore from '../stores/JobOfferStore';
import { useEffect } from 'react';
import useAuthStore from '../stores/AuthStore';
import Skeleton from 'react-loading-skeleton';

export const JobOfferDetail = () => {
  // router
  const { id } = useParams();

  // Session Token
  const sessionToken = useAuthStore((state) => state.session);

  const jobOffer = useJobOfferStore((state) => state.JobOffer);
  const loading = useJobOfferStore((state) => state.loading);
  const { getJobOffer } = useJobOfferStore();
  const { name, workday } = jobOffer;

  useEffect(() => {
    if (!id) return;

    getJobOffer(id, sessionToken);
  }, []);

  if (loading) {
    return (
      <div className="h-full min-h-">
        <Skeleton className="w-full h-12 mb-5" />
        <Skeleton className="w-full h-12 mb-3" count={20} />
      </div>
    );
  }

  return (
    <div className="rounded-sm px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="bg-white px-5 py-5 dark:bg-boxdark rounded-md">
          <h1 className="text-2xl font-bold text-black mb-1">{name}</h1>
          <span>{workday}</span>
        </div>
      </div>
    </div>
  );
};

export default JobOfferDetail;
