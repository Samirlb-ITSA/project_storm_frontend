import { useEffect } from 'react';
import useAuthStore from '../stores/AuthStore';
import useJobOfferStore from '../stores/JobOfferStore';
import Loader from '../common/Loader';
import { JobOfferDto } from '../services/dto/JobOffer';
import { CardJobOffer } from '../components/CardJobOffer';

const ListJobOffers = () => {
  const sessionToken = useAuthStore((state) => state.session);
  const jobOffers = useJobOfferStore((state) => state.JobOffers);
  const loading = useJobOfferStore((state) => state.loading);
  const { getJobOffers } = useJobOfferStore();

  useEffect(() => {
    getJobOffers(sessionToken);
  }, []);

  if (loading) {
    return (
      <div className="h-full min-h-">
        <Loader />
      </div>
    );
  }

  return (
    <div className="rounded-sm px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-2xl font-bold">Ofertas Laborales</h1>

        {Array.isArray(jobOffers) && jobOffers.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-8">
            {jobOffers.map((jobOffer: JobOfferDto, index) => (
              <CardJobOffer
                offerId={jobOffer.offerid}
                key={index}
                title={jobOffer.name}
                workDay={jobOffer.workday}
                status={jobOffer.status}
                applicants={jobOffer.applicants}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-gray-500">
            No hay ofertas laborales
          </p>
        )}
      </div>
    </div>
  );
};

export default ListJobOffers;
