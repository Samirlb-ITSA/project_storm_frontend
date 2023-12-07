import { create } from 'zustand';
import { JobOfferDto, Applicants  } from '../services/dto/JobOffer';

interface JobOfferState {
  loading: boolean;
  JobOffers: JobOfferDto[];
  JobOffer: JobOfferDto;
}

interface JobOfferAction {
  getJobOffers: (token: string) => void;
  getJobOffer: (id: string, token: string) => void;
}

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const useJobOfferStore = create<JobOfferState & JobOfferAction>((set) => ({
  loading: false,
  JobOffers: [],
  JobOffer: {
    offerid: '',
    name: '',
    workday: '',
    creationDate: '',
    status: false,
    companyid: '',
    applicants: [] as Applicants[] // This indicates that 'applicants' can be an empty array
  },
  getJobOffers: async (token: string) => {
    set({ loading: true });
    const res = await fetch(`${baseUrl}/get_job_offers`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    set({ loading: false, JobOffers: data.resultado });
  },
  getJobOffer: async (id: string, token: string) => {
    set({ loading: true });
    const res = await fetch(`${baseUrl}/get_offer/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    set({ loading: false, JobOffer: data });
  },
}));
export default useJobOfferStore;
