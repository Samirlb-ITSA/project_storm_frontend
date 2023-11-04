import { useState } from 'react';
import Form from '../../components/UploadForm'
import Pending from '../../components/PendingUpload'
import Uploaded from '../../components/Uploaded';

function UploadUsers() {
  const [isPending , setIsPending] = useState(false)
  const [file , setFile] = useState<string | ArrayBuffer | null>(null)
  const [url , setUrl] = useState<string | null>(null)
  const [error , setError] = useState(false)
  return (
    <div className="w-full h-screen bg-grey flex justify-center items-center">
        {error ? <p className='text-red-600 text-center border-red-600 rounded-lg border-2 bg-red-300 px-4 py-2'>internal server error , Refresh the page and try again</p> :
        isPending ? <Pending/> : file && url ? <Uploaded file={file} url={url} /> : <Form file={file} setFile={setFile} isPending={isPending} setIsPending={setIsPending} url={url} setUrl={setUrl} setError={setError}/>}
    </div>
  );
}

export default UploadUsers;