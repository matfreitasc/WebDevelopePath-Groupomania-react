import { useState, useEffect } from 'react';

function Viewed(props) {
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    props.postViewes.map((view) => {
      if (
        (view.UserId === props.userId && view.PostId === props.postId) ||
        view.userId === props.PostUserId
      ) {
        setViewed(true);
      }
    });
  }, [props.postViewes]);

  return (
    <main>
      {!viewed ? (
        <div className=' w-fit h-6 bg-teal-400 px-2 text-white rounded-md'>
          <p>New</p>
        </div>
      ) : null}
    </main>
  );
}

export default Viewed;
