import { create } from 'zustand';
import { JobOfferDto } from '../services/dto/JobOffer';

interface JobOfferState {
  loading: boolean;
  JobOffers: JobOfferDto[];
  JobOffer: JobOfferDto;
}

interface JobOfferAction {
  getJobOffers: (token: string) => void;
  getJobOffer: (id: string, token: string) => void;
  applyJobOffer: (
    idOffer: string,
    idUser: string,
    token: string,
  ) => Promise<string>;
}

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const useJobOfferStore = create<JobOfferState & JobOfferAction>((set) => ({
  loading: true,
  JobOffers: [],
  JobOffer: {
    offerid: '',
    name: '',
    workday: '',
    creationDate: '',
    status: false,
    companyid: '',
  },
  getJobOffers: async (token: string) => {
    const res = await fetch(`${baseUrl}/get_job_offers`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.status == 200) {
      set({ loading: false });
    }

    set({ JobOffers: data.resultado });
  },
  getJobOffer: async (id: string, token: string) => {
    const res = await fetch(`${baseUrl}/get_offer/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.status == 200) {
      set({ loading: false });
    }

    set({ JobOffer: data });
  },
  applyJobOffer: async (idOffer: string, userId: string, token: string) => {
    const res = await fetch(`${baseUrl}/create_applicant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        offerid: idOffer,
        userid: userId,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      return Promise.reject('Hubo un error');
    }

    return Promise.resolve('Aplicado con exito');
  },
}));

export default useJobOfferStore;
