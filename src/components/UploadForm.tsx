import { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import bgimage from '../images/icon/icon-arrow-down.svg'

interface UploadUsersProps {
  file: File | null,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  isPending: boolean,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>,
  url: string | null,
  setUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
  summary: { users_created: number, users_failed: number } | null,
  setSummary: React.Dispatch<React.SetStateAction<{ users_created: number, users_failed: number } | null>>
}

const UploadUsers: React.FC<UploadUsersProps> = ({file, setFile, isPending, setIsPending, url, setUrl, setError, summary, setSummary}) => {
  const onDrop = useCallback(async(acceptedFiles: File[]) => {
       let file = acceptedFiles[0];
       setFile(file);
    } , [setFile])

    const {getRootProps , getInputProps , open} = useDropzone({onDrop , 
        maxFiles:1 , 
        accept : {
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
          'application/vnd.ms-excel': [],
          'text/csv': []
        },
        noClick : true ,
        noKeyboard : true})

        async () => {
          setIsPending(true);
          const formData = new FormData();
          if (file) {
              formData.append('file', file);
              try {
                  const response = await fetch('http://localhost:8000/upload', {
                      method: 'POST',
                      body: formData
                  });
                  const data = await response.json();
                  setUrl(data.url); // assuming the response contains a url property
                  setSummary({
                      users_created: data.users_created, // replace with actual property names from your response
                      users_failed: data.users_failed // replace with actual property names from your response
                  });
                  setIsPending(false);
              } catch (error) {
                  setError(true);
                  setIsPending(false);
              }
          }
          setIsPending(false);
      };
  return (
    <div className='flex flex-col h-[50vh] drop-shadow-lg p-5 justify-between bg-white w-4/5 md:w-2/6 sm:w-4/6 rounded-md'>
      <p className='text-center font-semibold text-lg md:text-xl mb-2'>Sube tus usuarios desde un archivo de Excel</p>
      <p className='text-center font-thin text-xs text-slate-400 mb-2'>El archivo deberia ser .xlsx, .xls, .csv</p>
      <div  {...getRootProps({className :'md:h-52 sm:h-44 h-auto bg-light-grey border-2 border-light-blue border-dashed rounded-md'})}>
         <input {...getInputProps({name : 'file'})}/>
         <img src={bgimage} className='max-w-1/3 mx-auto mt-4' />
         <p className='text-slate-400 md:text-md text-center mt-4 text-sm'>Arrastra & Suelta tu archivo aqui</p>
      </div>
      <p className='text-center font-normal text-slate-400 text-md mt-2 mb-2'>O</p>
      <button onClick={open} className='bg-blue text-black font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md'>Upload File</button>
    </div>
  )
}

export default UploadUsers