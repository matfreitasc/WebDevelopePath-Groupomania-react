import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const username = 'test';

  let navigate = useNavigate();

  const sendPost = () => {
    Axios.post('http://localhost:3001/api/posts', {
      title,
      content,
      username,
    })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='container mx-auto flex justify-center mt-5'>
        <div className='w-4/6'>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form>
              <div className='shadow sm:rounded-md sm:overflow-hidden'>
                <div className='px-3 py-2 bg-white space-y-2 '>
                  <div>
                    <label
                      htmlFor='about'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Write your first post
                    </label>
                    <div className='mt-1'>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        autoComplete='off'
                        required
                        className='p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block w-full sm:text-sm border border-gray-300 rounded-md '
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <br></br>
                      <textarea
                        id='content'
                        name='content'
                        rows={4}
                        className='p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block w-full sm:text-sm border border-gray-300 rounded-md '
                        placeholder=''
                        autoComplete='off'
                        defaultValue={''}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='text-right'>
                    <button
                      type='submit'
                      className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={sendPost}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
