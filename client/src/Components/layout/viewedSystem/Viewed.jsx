import { useState, useEffect } from 'react';

function Viewed(props) {
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    props.postViewes.map((view) => {
      if (view.UserId === props.userId) {
        setViewed(true);
      }
      return viewed;
    });
  }, [props.postViewes, props.userId, props.postId, props, viewed]);

  return (
    <main>
      {viewed ? null : (
        <div className=' w-fit h-6 bg-teal-400 px-2 text-white rounded-md'>
          <p>New</p>
        </div>
      )}
    </main>
  );
}

export default Viewed;
