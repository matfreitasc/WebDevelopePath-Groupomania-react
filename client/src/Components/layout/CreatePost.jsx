import { Fragment, useState, useEffect, useCallback } from 'react';
import useAuth from '../../hooks/useAuth';
import { IconContext } from 'react-icons';
import { FaWindowClose } from 'react-icons/fa';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDropzone } from 'react-dropzone';

export default function Modal() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (auth) {
      setUserId(auth.userId);
      setUsername(auth.username);
    }
  }, [auth]);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      maxFilesize: 50,
      accept: {
        'image/png': ['.png'],
        'image/gif': ['.gif'],
        'image/jpeg': ['.jpg', '.jpeg'],
      },
      noDragEventsBubbling: true,
    });
  const removeImage = (image) => {
    setSelectedImages(selectedImages.filter((img) => img !== image));
  };
  const cancelPost = () => {
    setTitle('');
    setContent('');
    setSelectedImages([]);
  };
  const selected_Images = selectedImages.map((image) => (
    <section>
      <div key={image.name} className='mt-1 '>
        <img src={image.preview} alt={image.name} className='rounded-2xl' />
      </div>
    </section>
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('image', image);
    });

    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', userId);
    formData.append('username', username);

    await axiosPrivate
      .post(
        '/posts/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.reload(false);
      });
  };
  return (
    <section className='w-full relative inline-block align-bottom bg-white rounded-lg  overflow-hidden shadow-xl transform transition-all '>
      <section className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
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
                value={title}
              />
            </div>
          </div>
          <section className='mt-2'>
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
                value={content}
                required
                className='resize-y appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </section>
          <div className='mt-2 '>
            {selected_Images[0] ? (
              <button
                onClick={() => removeImage(selectedImages[0])}
                className='bg-transparent w-full flex justify-center items-center gap-2'
              >
                <p>Remove Image</p>
                <IconContext.Provider
                  value={{
                    className: 'text-red-500',
                    size: '3rem',
                  }}
                >
                  <FaWindowClose />
                </IconContext.Provider>
              </button>
            ) : (
              <></>
            )}
            <div
              {...getRootProps()}
              className=' mt-2 cursor-pointer flex justify-center p-2 border-2 border-gray-300 border-dashed rounded-md z-0 relative'
            >
              <div className='space-y-1 text-center '>
                <input {...getInputProps()} />
                {isDragReject && (
                  <div className='text-red-500 text-center'>
                    <p className='text-sm font-medium'>
                      File type not supported. Please upload a jpeg, png, gif,
                      or jpg file.
                    </p>
                  </div>
                )}
                {isDragActive && (
                  <div className='text-center '>
                    <p className='text-sm font-medium'>
                      Drop files here to upload.
                    </p>
                  </div>
                )}{' '}
                {!isDragActive && selected_Images < 1 && (
                  <Fragment>
                    <div>
                      <svg
                        className='mx-auto h-12 w-12 text-gray-400'
                        stroke='currentColor'
                        fill='none'
                        viewBox='0 0 48 48'
                        aria-hidden='true'
                      >
                        <path
                          d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <div className='flex text-sm text-gray-600 sr-only sm:not-sr-only'>
                        <p className='pl-1'>
                          Drag 'n' drop images here, or click to{' '}
                          <label className='inline-block bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
                            select files
                          </label>
                        </p>
                      </div>
                      <p className='text-xs text-gray-500'>
                        Supported Files types: PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </Fragment>
                )}
              </div>
              {selected_Images}
            </div>
          </div>
        </form>
      </section>
      <section className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
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
          onClick={() => cancelPost()}
        >
          Cancel
        </button>
      </section>
    </section>
  );
}
