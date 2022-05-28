import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

function Like(props) {
  const axiosPrivate = useAxiosPrivate();
  const [likes, setLikes] = useState(0);
  const [disLikes, setDisLikes] = useState(0);
  const [likedAction, setLikedAction] = useState(false);
  const [disLikedAction, setDisLikedAction] = useState(false);

  const getLikes = async () => {
    const { data } = await axiosPrivate.post(`/likes/getLikes/`, {
      PostId: props.postId,
    });
    setLikes(data.likes.length);
    data.likes.map((like) => {
      if (like.UserId === props.userId) {
        setLikedAction(true);
      }
    });
  };
  const getDislikes = async () => {
    const { data } = await axiosPrivate.post(`/likes/getDislikes/`, {
      PostId: props.postId,
    });
    setDisLikes(data.dislikes.length);
  };

  useEffect(() => {
    getLikes();
    getDislikes();
  }, []);

  const likePost = () => {
    axiosPrivate
      .post(`/likes/`, {
        PostId: props.postId,
      })
      .then((res) => {
        if (res.data.message === 'like removed') {
          setLikedAction(false);
          setDisLikedAction(false);
        } else if (res.data.message === 'liked') {
          setLikedAction(true);
          setDisLikedAction(false);
        }
        getLikes();
      });
  };
  const dislikePost = async () => {
    axiosPrivate
      .post(`/likes/dislike`, {
        PostId: props.postId,
      })
      .then((res) => {
        if (res.data.message === 'dislike removed') {
          setDisLikedAction(false);
          setLikedAction(false);
        } else if (res.data.message === 'disliked') {
          setLikedAction(false);
          setDisLikedAction(true);
        }

        getDislikes();
      });
  };
  return (
    <React.Fragment>
      <div className='flex align-middle items-center justify-start gap-2 flex-row p-1'>
        <button
          onClick={() => {
            likePost();
          }}
          disabled={disLikedAction === true}
        >
          {likedAction ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 fill-none dark:fill-white'
              fill='currentColor'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 fill-none dark:stroke-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
              />
            </svg>
          )}
        </button>
        <span className='dark:text-white'>{likes}</span>
        <button
          onClick={() => {
            dislikePost();
          }}
          disabled={likedAction === true}
        >
          {disLikedAction ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 fill-black dark:fill-white'
              viewBox='0 0 20 20'
              strokeWidth={2}
            >
              <path d='M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5  stroke-black dark:stroke-white'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
            >
              <path d='M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5' />
            </svg>
          )}
        </button>
        <span className='dark:text-white'>{disLikes}</span>
      </div>
    </React.Fragment>
  );
}

export default Like;
