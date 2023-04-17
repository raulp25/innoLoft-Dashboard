import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { routes } from '@/routes/paths';
import { NavBar } from '@/components/UI/navBar/NavBar';
import { FooterComponent } from '@/components/UI/footer/FooterComponent';
import { SideBarComponent } from '@/components/UI/sideBar/SideBarComponent';


interface Props {
    children: ReactNode;
  }

export const Layout = ({ children }:Props) => {
  const { pathname } = useRouter();

  return (
    <div className='h-screen flex flex-col'>
        <NavBar/>
        <div className="flex justify-center pb-5 lg:mt-6">
          <div className='grid grid-cols-9  w-/12 gap-2 mt-12 border-green-700'>
              <div className="col-span-0 lg:col-span-2">
                <div className='flex justify-center'>
                  <SideBarComponent/>  
                </div>
              </div>
              <div className="col-span-9 lg:col-span-6 px-9 lg:px-0">
                <nav className="flex pb-7" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                      <li className="inline-flex items-center">
                        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 lg:hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                          <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                          Home
                        </Link>
                      </li>
                      {routes.map(route => (
                        <li key={route.path} className={`${pathname.includes(route.path) ? 'block' : 'hidden'}`}>
                          <div className="flex items-center">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            <Link href={route.path} className="ml-1 text-sm font-medium text-gray-700 lg:hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                            {route.label}
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ol>
                </nav>
                {children}
              </div>
          </div>
        </div>
        <FooterComponent/>
      </div>
  )
}
