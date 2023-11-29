import { create } from 'zustand';
import { User } from '../services/dto/user';

interface UserState {
  Users: User[];
  User: User;
}

interface UserAction {
  getUsers: () => void;
  getUserById: (userId: string, token: string) => void;
}

const useUserStore = create<UserState & UserAction>((set) => ({
  Users: [],
  User: {
    firstName: '',
    lastName: '',
    email: '',
    cellphone: '',
    address: '',
    userId: '',
    status: false,
    roles: [],
  },
  getUsers: () => {
    set({ Users: [] });
  },
  getUserById: async (userId: string, token: string) => {
    if (!userId) return Promise.reject(new Error('User id is empty'));

    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/get_user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    set({ User: data });
  },
}));

export default useUserStore;
