import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import {
  ThumbUpIcon as ThumbUpSolid,
  ThumbDownIcon as ThumbDownSolid,
} from '@heroicons/react/solid';
import {
  ThumbUpIcon as ThumbUpOutline,
  ThumbDownIcon as ThumbDownOutline,
} from '@heroicons/react/outline';

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
        setDisLikedAction(false);
      }
    });
  };
  const getDislikes = async () => {
    const { data } = await axiosPrivate.post(`/likes/getDislikes/`, {
      PostId: props.postId,
    });
    setDisLikes(data.dislikes.length);
    data.dislikes.map((dislike) => {
      if (dislike.UserId === props.userId) {
        setDisLikedAction(true);
        setLikedAction(false);
      }
    });
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
        console.log('🚀 ~ file: Like.jsx ~ line 48 ~ .then ~ res', res);

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
        console.log('🚀 ~ file: Like.jsx ~ line 66 ~ .then ~ res', res);
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
          {likedAction === true ? (
            <ThumbUpSolid className='h-5 w-5 dark:fill-white' />
          ) : (
            <ThumbUpOutline className='h-5 w-5 dark:stroke-white' />
          )}
        </button>
        <span className='dark:text-white'>{likes}</span>
        <button
          onClick={() => {
            dislikePost();
          }}
          disabled={likedAction === true}
        >
          {disLikedAction === true ? (
            <ThumbDownSolid className='h-5 w-5 dark:fill-white' />
          ) : (
            <ThumbDownOutline className='h-5 w-5 dark:stroke-white' />
          )}
        </button>
        <span className='dark:text-white'>{disLikes}</span>
      </div>
    </React.Fragment>
  );
}

export default Like;
