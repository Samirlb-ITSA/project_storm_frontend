import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import bgimage from '../images/icon/icon-arrow-down.svg';
import useAuthStore from '../stores/AuthStore';
import { UserSummary } from '../components/Uploaded'; 
interface UploadUsersProps {
  file: File | null,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  isPending: boolean,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>,
  url: string | null,
  setUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  summary: { users_created: UserSummary[], users_failed: UserSummary[] } | null,
  setSummary: React.Dispatch<React.SetStateAction<{ users_created: UserSummary[], users_failed: UserSummary[] } | null>>
}


const UploadUsers: React.FC<UploadUsersProps> = ({ setFile, setIsPending, setUrl, setError, setSummary }) => {
  const { session, logout } = useAuthStore();
  const serverUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);

    setIsPending(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch( serverUrl + '/users/import', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${session}`,
        }
      });
      const data = await response.json();
      setUrl(data.url);
      setIsPending(false);
      setSummary({
        users_created: data.users_created,
        users_failed: data.users_failed
      });

      if (response.status === 401) {
        logout();
        window.location.href = '/auth/signin';
      }
    } catch (error) {
      setError(true);
    }
  }, [setFile, setIsPending, setUrl, setError, setSummary]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-excel': [],
      'text/csv': []
    },
    noClick: true,
    noKeyboard: true
  });

  return (
    <div className='flex flex-col h-[50vh] drop-shadow-lg p-5 justify-between bg-white w-4/5 md:w-2/6 sm:w-4/6 rounded-md'>
      <p className='text-center font-semibold text-lg md:text-xl mb-2'>Sube tus usuarios desde un archivo de Excel</p>
      <p className='text-center font-thin text-xs text-slate-400 mb-2'>El archivo deberia ser .xlsx, .xls, .csv</p>
      <div {...getRootProps({ className: 'md:h-52 sm:h-44 h-auto bg-light-grey border-2 border-light-blue border-dashed rounded-md' })}>
        <input {...getInputProps({ name: 'file' })} />
        <img src={bgimage} className='max-w-1/3 mx-auto mt-4' />
        <p className='text-slate-400 md:text-md text-center mt-4 text-sm'>Arrastra & Suelta tu archivo aqui</p>
      </div>
      <p className='text-center font-normal text-slate-400 text-md mt-2 mb-2'>O</p>
      <button onClick={open} className='bg-blue text-black font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md'>Upload File</button>
    </div>
  );
};

export default UploadUsers;