import { useNavigate } from 'react-router-dom';

export default function UserPost({
  userId,
  username,
  postId,
  imageUrl,
  content,
  date,
  postTitle,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div key={postId}>
        <div className='flex justify-center mt-5  w-full'>
          <div className=' w-full relative mb-2'>
            <div className='shadow rounded-md sm:overflow-hidden'>
              <div
                className='px-5 pt-2
               bg-white dark:bg-gray-900 space-y-3  '
              >
                <div className='flex justify-between'>
                  <div>
                    <div
                      className='text-xs mb-2 dark:text-gray-400 block'
                      onClick={() => {
                        navigate(`/profile/${userId}`);
                      }}
                    >
                      Posted by:{' '}
                      <p className='inline-block hover:underline '>
                        {username}
                      </p>
                    </div>
                  </div>
                </div>
                <h1
                  className='text-2xl font-bold text-gray-900 dark:text-gray-100'
                  onClick={() => {
                    navigate(`/post/${postId}`);
                  }}
                >
                  {postTitle}
                </h1>

                <p
                  className=' dark:text-gray-300 pb-4'
                  onClick={() => {
                    navigate(`/post/${postId}`);
                  }}
                >
                  {content}
                </p>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt='post'
                    className='w-full h-auto object-cover object-center rounded-md shadow-md pb-4'
                    onClick={() => {
                      navigate(`/post/${postId}`);
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
