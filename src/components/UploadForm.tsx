import { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import bgimage from '../images/icon/icon-arrow-down.svg'
import * as XLSX from 'xlsx';
import { apiClient } from '../js/apiClient'; // adjust the path to your apiClient function

interface UploadUsersProps {
  file: string | ArrayBuffer | null,
  setFile: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>,
  isPending: boolean,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>,
  url: string | null,
  setUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
}

const UploadUsers: React.FC<UploadUsersProps> = ({file, setFile, isPending, setIsPending, url, setUrl, setError}) => {
    const [successCount, setSuccessCount] = useState(0);
    const [failureCount, setFailureCount] = useState(0);
    const createUser = async(user: any) => {
       setError(false)
       setIsPending(true)
       try{
           const res = await apiClient('create_user', {
             method: 'POST',
             body: user,
           });
           if(!res.ok){
            throw Error('Internal Server Error')
           }
           setSuccessCount(prevCount => prevCount + 1);
           setIsPending(false)
       }catch(error){
           console.log(error)
           setFailureCount(prevCount => prevCount + 1);
           setIsPending(false)
           setError(true)
       }
    }

    const onDrop = useCallback(async(acceptedFiles: File[]) => {
       let file = acceptedFiles[0]
       let reader = new FileReader()

       reader.onload = (e) => {
        if(e.target !== null && e.target.result instanceof ArrayBuffer) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, {type: 'array'});
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1}) as any[][];
          jsonData.forEach((row: any[], index: number) => {
            if(index !== 0) { // Skip header row
              const user = {
                firstname: row[0],
                lastname: row[1],
                email: row[2],
                cellphone: row[3],
                address: row[4],
                password: row[5],
                status: 1,
                roleId: 1,
              };
              createUser(user);
            }
          });
        }
       }

       reader.readAsArrayBuffer(file);
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
      <button onClick={open} className='bg-blue text-black font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md'>Seleccina tu archivo</button>
      <p>Users created successfully: {successCount}</p>
      <p>Failed to create users: {failureCount}</p>
    </div>
  )
}

export default UploadUsers