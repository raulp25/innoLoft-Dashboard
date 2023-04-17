import { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

export const SideBarComponent = () => {
    const router = useRouter();
    const { pathname } = router;
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [isRotated, setIsRotated] = useState(false);

    const toggleRotation = () => {
      setIsRotated(!isRotated);
    };
  
    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
        toggleRotation();
    }
    const chevronClasses = `transform transition-transform duration-175 ${
        isRotated ? 'rotate-180' : ''
      } text-white ml-1`;

  return (
    <div className={`${pathname === '/' ? 'pr-10' : ''} w-fit hidden lg:block`} >               
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-normal">
                <li>
                    <Link href={'/'}>
                        <div className="flex hover:text-red-500 cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 21 21" fill="currentColor" height="1em" width="1em"> <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"> <path d="M1.5 10.5l9-9 9 9" /> <path d="M3.5 8.5v7a2 2 0 002 2h10a2 2 0 002-2v-7" /> </g> </svg>
                            <span className="ml-3">
                                Home
                            </span>
                        </div>
                    </Link>
                </li>
                <li 
                >
                    <Link href={'/product'}>
                        <div className="flex hover:text-red-500 cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M6 9h13.938l.5-2H8V5h13.72a1 1 0 01.97 1.243l-2.5 10a1 1 0 01-.97.757H5a1 1 0 01-1-1V4H2V2h3a1 1 0 011 1v6zm0 14a2 2 0 110-4 2 2 0 010 4zm12 0a2 2 0 110-4 2 2 0 010 4z" /> </svg>
                        <span className="ml-3">Product</span>
                        </div>
                    </Link>
                </li>
                <li 
                >
                    <Link href={'/product/edit'}>
                        <div className="flex hover:text-red-500 cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="1em" width="1em" > <path stroke="none" d="M0 0h24v24H0z" /> <path d="M11 4 H13 A1 1 0 0 1 14 5 V7 A1 1 0 0 1 13 8 H11 A1 1 0 0 1 10 7 V5 A1 1 0 0 1 11 4 z" /> <path d="M4 17 H6 A1 1 0 0 1 7 18 V20 A1 1 0 0 1 6 21 H4 A1 1 0 0 1 3 20 V18 A1 1 0 0 1 4 17 z" /> <path d="M18 17 H20 A1 1 0 0 1 21 18 V20 A1 1 0 0 1 20 21 H18 A1 1 0 0 1 17 20 V18 A1 1 0 0 1 18 17 z" /> <path d="M6.5 17.1l5-9.1M17.5 17.1l-5-9.1M7 19h10" /> </svg>
                        <span className="ml-3">Edit Product</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <button onClick={toggleDropDown} type="button" className="flex hover:text-red-500 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"  viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em"> <path d="M19.5 17c-.14 0-.26 0-.39.04L17.5 13.8c.45-.45.75-1.09.75-1.8a2.5 2.5 0 00-2.5-2.5c-.14 0-.25 0-.4.04L13.74 6.3c.47-.46.76-1.09.76-1.8a2.5 2.5 0 00-5 0c0 .7.29 1.34.76 1.79L8.65 9.54c-.15-.04-.26-.04-.4-.04a2.5 2.5 0 00-2.5 2.5c0 .71.29 1.34.75 1.79l-1.61 3.25C4.76 17 4.64 17 4.5 17a2.5 2.5 0 000 5A2.5 2.5 0 007 19.5c0-.7-.29-1.34-.76-1.79l1.62-3.25c.14.04.26.04.39.04s.25 0 .38-.04l1.63 3.25c-.47.45-.76 1.09-.76 1.79a2.5 2.5 0 005 0A2.5 2.5 0 0012 17c-.13 0-.26 0-.39.04L10 13.8c.45-.45.75-1.09.75-1.8 0-.7-.29-1.33-.75-1.79l1.61-3.25c.13.04.26.04.39.04s.26 0 .39-.04L14 10.21a2.5 2.5 0 001.75 4.29c.13 0 .25 0 .38-.04l1.63 3.25c-.47.45-.76 1.09-.76 1.79a2.5 2.5 0 005 0 2.5 2.5 0 00-2.5-2.5m-15 3.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m8.5-1c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1M7.25 12c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1M11 4.5c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1m3.75 7.5c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1m4.75 8.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /> </svg>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >Organization</span>
                        <svg  className={`${chevronClasses} w-5 h-5 !text-gray-500`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <ul id="dropdown-example" className={`${showDropDown ? 'block' : 'hidden' } py-2 space-y-2`}>
                        <li className='flex'>
                            <span className="flex items-center pl-2  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                <svg  className='w-6 h-6' xmlns="http://www.w3.org/2000/svg"  x="0"  y="0"  enableBackground="new 0 0 496 496"  version="1.1"  viewBox="0 0 496 496"  xmlSpace="preserve">  <path    fill="#F8D12E"    d="M0 304v65.6C0 396.8 21.6 416 48 416h400c26.4 0 48-19.2 48-46.4V304H0z"  ></path>  <path    fill="#333"    d="M448 80H48C21.6 80 0 99.2 0 126.4V192h496v-65.6c0-27.2-21.6-46.4-48-46.4z"  ></path>  <path fill="#DB2727" d="M0 192H496V304H0z"></path>  <path    fill="#DBB30F"    d="M446.4 416c26.4 0 49.6-19.2 49.6-46.4V304H315.2l131.2 112z"  ></path>  <path    fill="#202121"    d="M448 80H48l132.8 112H496v-65.6c0-27.2-21.6-46.4-48-46.4z"  ></path>  <path fill="#C10E0E" d="M316 304L496 304 496 192 180 192z"></path>  <path d="M448 80H48l370.4 112H496v-65.6c0-27.2-21.6-46.4-48-46.4z"></path>  <path fill="#A00808" d="M496 214.4L496 192 414.4 192z"></path>  <path    fill="#D89F12"    d="M496 368.8c0 29.6-21.6 47.2-48 47.2H48c-26.4 0-48-20.8-48-48"  ></path></svg>
                            </span>
                            <Link target='_blank' href={'https://relocate.me/blog/job-relocation/is-it-worth-moving-to-germany-as-a-software-engineer'}>
                                <span className="flex items-start py-1 w-full hover:text-red-500  text-gray-900 rounded-lg pl-3 group">Deutschland</span>
                            </Link>
                        </li>
                    </ul>
                </li>   
                
            </ul>
        </div>
    </div>
  )
}
