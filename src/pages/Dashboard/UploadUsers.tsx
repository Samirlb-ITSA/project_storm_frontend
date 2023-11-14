import { useState } from 'react';
import UploadUsersProps from '../../components/UploadForm'
import Pending from '../../components/PendingUpload'
import Uploaded from '../../components/Uploaded';

function UploadUsers() {
  const [isPending , setIsPending] = useState(false)
  const [file , setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<{ users_created: number, users_failed: number } | null>(null);
  const [url , setUrl] = useState<string | null>(null)
  const [error , setError] = useState(false)

  return (
    <div className="w-full h-screen bg-grey flex justify-center items-center">
        {error ? <p className='text-red-600 text-center border-red-600 rounded-lg border-2 bg-red-300 px-4 py-2'>internal server error , Refresh the page and try again</p> :
        isPending ? <Pending/> : file && url ? <Uploaded summary={summary} /> : <UploadUsersProps file={file} setFile={setFile} isPending={isPending} setIsPending={setIsPending} url={url} setUrl={setUrl}  summary = {summary} setSummary = {setSummary} setError={setError}/>}
    </div>
  );
}

export default UploadUsers;