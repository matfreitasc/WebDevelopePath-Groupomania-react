import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Components/modal/Modal';
import Logo from '../../assets/images/logo-white.png';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';
import Toggle from '../ThemeToggle';
import LogoWithName from '../../assets/images/LogoWithName';

const navigation = [{ name: 'Dashboard', href: '#', current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Main() {
  const { auth } = useAuth();
  let navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState('');
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };
  useEffect(() => {
    if (auth) {
      setUserId(auth.userId);
    }
  }, []);

  return (
    <Disclosure as='nav' className='bg-gray-800 dark:bg-gray-900 z-10'>
      <>
        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          <div className='relative flex items-center justify-between h-16'>
            <div className='flex-1 flex items-stretch justify-start'>
              <div className='flex-shrink-0 flex items-center'>
                <a href='/'>
                  <LogoWithName className='ml-10 h-8 w-auto fill-white dark:fill-[#e94425] ' />
                </a>
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <button
                className='mr-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-outline-white'
                onClick={() => setOpenModal(true)}
              >
                Create Post
              </button>
              <Toggle />
              <Modal openModal={openModal} setOpenModal={setOpenModal} />
              {/* Profile dropdown */}
              <Menu as='div' className='ml-3 relative z-20'>
                <div>
                  <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white z-20'>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            navigate(`/profile/${userId}`);
                          }}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            navigate(`/settings/${userId}`);
                          }}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 '
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => signOut()}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 w-full'
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Disclosure.Panel className='sm:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as='a'
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block px-3 py-2 rounded-md text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    </Disclosure>
  );
}