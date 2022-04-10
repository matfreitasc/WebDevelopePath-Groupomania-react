import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { axios } from '../../helpers/axios';

export default function Modal({ openModal, setOpenModal }) {
  const open = openModal;
  const setOpen = setOpenModal;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [imageUpload, setImageUpload] = useState('');
  const [imageName, setImageName] = useState('');

  const FileSelectedHandler = (event) => {
    setImageUpload(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', imageUpload);
    formData.append('userId', userId);
    formData.append('username', username);
    await axios
      .post('/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setOpen(false);
        window.location.reload();
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
                  <form encType='multipart/form-data'>
                    <div className='mt-2'>
                      <label
                        htmlFor='title'
                        className='block text-sm font-medium leading-5 text-gray-700'
                      >
                        Title
                      </label>
                      <div className='mt-1 rounded-md shadow-sm'>
                        <input
                          id='title'
                          name='title'
                          type='text'
                          required
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='mt-2'>
                      <label
                        htmlFor='content'
                        className='block text-sm font-medium leading-5 text-gray-700'
                      >
                        Content
                      </label>
                      <div className='mt-1 rounded-md shadow-sm'>
                        <textarea
                          id='content'
                          name='content'
                          type='text'
                          required
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='mt-2'>
                      <label
                        htmlFor='image'
                        className='block text-sm font-medium leading-5 text-gray-700'
                      >
                        Image
                      </label>
                      <div className='mt-1 rounded-md shadow-sm'>
                        <input type='file' onChange={FileSelectedHandler} />
                      </div>
                    </div>
                  </form>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={handleSubmit}
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
