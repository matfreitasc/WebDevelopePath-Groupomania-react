import { useNavigate } from 'react-router-dom';
import Like from '../likeSystem/Like';
import Moment from 'moment';
import { axiosPrivate } from '../../../api/axios';

export default function UserPost(props) {
  const CreatedAt = Moment.utc(props.date).fromNow();
  const navigate = useNavigate();

  const MarkAsViewed = () => {
    axiosPrivate.post(`/posts/${props.postId}/viewes`, {
      userId: props.userId,
    });
  };

  return (
    <>
      <div key={props.postId}>
        <div className='flex justify-center my-5 w-full'>
          <div className=' w-full relative mb-2'>
            <div className='shadow rounded-md sm:overflow-hidden'>
              <div
                className='px-5 pt-2
               bg-white dark:bg-gray-900 space-y-3 py-2 '
              >
                <div className='flex justify-between'>
                  <div>
                    <div
                      className='text-xs mb-2 dark:text-gray-400 block'
                      onClick={() => {
                        navigate(`/profile/${props.userId}`);
                      }}
                    >
                      Posted by:{' '}
                      <p className='inline-block hover:underline '>
                        {props.username}
                      </p>
                      <p className='inline-block ml-1 '>{CreatedAt}</p>
                    </div>
                  </div>
                </div>
                <h1
                  className='text-2xl font-bold text-gray-900 dark:text-gray-100'
                  onClick={() => {
                    navigate(`/post/${props.postId}`);
                    MarkAsViewed(props.postId);
                  }}
                >
                  {props.postTitle}
                </h1>

                <p
                  className=' dark:text-gray-300 pb-4'
                  onClick={() => {
                    navigate(`/post/${props.postId}`);
                    MarkAsViewed(props.postId);
                  }}
                >
                  {props.content}
                </p>
                {props.imageUrl ? (
                  <img
                    src={props.imageUrl}
                    alt='post'
                    className='w-full h-auto object-cover object-center rounded-md shadow-md pb-4'
                    onClick={() => {
                      navigate(`/post/${props.postId}`);
                      MarkAsViewed(props.postId);
                    }}
                  />
                ) : null}

                <div className='flex row justify-between'>
                  <Like userId={props.userId} postId={props.postId} />
                  <p className='dark:text-white'>
                    {props.postViewes.length === 1
                      ? props.postViewes.length + ' View'
                      : props.postViewes.length + ' Viewes'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
