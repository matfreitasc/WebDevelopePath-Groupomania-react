import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { axios } from '../../middleware/axios/axios';
import { useNavigate } from 'react-router';

export default function Modal({ openModal, setOpenModal }) {
  const open = openModal;
  const setOpen = setOpenModal;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  const sendPost = () => {
    axios
      .post('/posts/', {
        title,
        content,
        username,
        userId,
      })
      .then((res) => {
        if (res.data.errors) {
          alert(res.data.errors);
        } else {
          window.location.reload();
          setOpen(false);
        }
      });
  };
  useEffect(() => {
    axios.get('/auth/').then((res) => {
      setUserId(res.data.id);
      setUsername(res.data.user);
    });
  }, []);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          onClose={setOpen}
        >
          <div className='flex items-center justify-center pt-4 px-4 pb-20 text-center '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className='flex align-middle h-screen' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className=''>
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
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={sendPost}
                  >
                    Create Post
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
