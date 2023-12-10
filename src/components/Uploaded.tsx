interface UploadedProps {
  summary: { users_created: UserSummary[], users_failed: UserSummary[] } | null;
}
export interface UserSummary {
  email: string;
  position: number;
}

const Uploaded: React.FC<UploadedProps> = ({ summary }) => {
  return (
    <div className='flex flex-col h-[50vh] drop-shadow-lg p-5 justify-between bg-white w-4/5 md:w-1/3 sm:w-5/6 rounded-md'>
      {/* ... */}
      <div>
        <p>Users created:</p>
        {summary?.users_created.map(user => (
          <p key={user.position}>{user.email} = {user.position}</p>
        ))}
        <p>Users failed:</p>
        {summary?.users_failed.map(user => (
          <p key={user.position}>{user.email} = {user.position}</p>
        ))}
      </div>
    </div>
  )
}

export default Uploaded;