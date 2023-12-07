import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../js/apiClient';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import useAuthStore from '../stores/AuthStore';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface CardProps {
  offerId: string;
  title: string;
  workDay: string;
  status: boolean;
  applicants: Array<{userid: string}>;
}

export const CardJobOffer = (props: CardProps) => {
  // Session
  const session = useAuthStore((state) => state.session);

  // UserId
  const { id } = jwtDecode<JwtPayload>(session);

  const navigate = useNavigate();
  const apiService = apiClient();

  // State to hold whether the user has already applied
  const [hasApplied, setHasApplied] = useState(false);

// Check if the user has already applied for this job offer
  useEffect(() => {
    if (props.applicants) {
      const hasApplied = props.applicants.some(applicant => applicant.userid === id);
      setHasApplied(hasApplied);
    }
  }, [props.applicants, id]);

  const goToDetails = () => {
    navigate(`/job-offers/${props.offerId}`);
  };

  const handleApplyJobOffer = async () => {
    try {
      const rawResponse = await apiService('create_applicant', {
        method: 'POST',
        body: {
          userid: id,
          offerid: props.offerId
      }});
      toast.success(rawResponse.resultado)
    } catch (error) {
      toast.error(String(error));
    }
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
          <br />
          {props.status && !hasApplied && (
            <button
              type="button"
              className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10"
              onClick={handleApplyJobOffer}
            >
              Aplicar
            </button>
          )}
          {props.status && hasApplied && (
            <span 
            className="inline-flex items-center rounded-full justify-center bg-[#13C296] py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10">
              Aplicando
            </span>
          )}
        </div>
      </div>
    </div>
  );
};