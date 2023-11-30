import { useNavigate } from 'react-router-dom';
import useJobOfferStore from '../stores/JobOfferStore';
import useAuthStore from '../stores/AuthStore';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface CardProps {
  offerId: string;
  title: string;
  workDay: string;
  status: boolean;
}

export const CardJobOffer = (props: CardProps) => {
  // Session
  const session = useAuthStore((state) => state.session);

  // UserId
  const { id } = jwtDecode<JwtPayload>(session);

  const navigate = useNavigate();
  const { applyJobOffer } = useJobOfferStore();

  const goToDetails = () => {
    navigate(`/job-offers/${props.offerId}`);
  };

  const handleApplyJobOffer = () => {
    applyJobOffer(props.offerId, id, session);
  };

  return (
    <div
      className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-white cursor-pointer"
      onClick={goToDetails}
    >
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black flex items-center mb-3">
            {props.title}{' '}
            {props.status ? (
              <span className="inline-flex rounded bg-[#13C296] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 ml-4">
                Activo
              </span>
            ) : (
              <span className="inline-flex rounded bg-[#637381] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 ml-4">
                No Activo
              </span>
            )}
          </h4>
          <span className="text-sm font-medium mt-5"> {props.workDay} </span>
          {props.status && (
            <button
              type="button"
              className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10"
              onClick={handleApplyJobOffer}
            >
              Aplicar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
