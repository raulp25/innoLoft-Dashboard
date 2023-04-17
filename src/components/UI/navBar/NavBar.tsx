import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const NavBar = () => {
    const { user, company, companyConfig } = useSelector(state => state.company);
    const { pathname } = useRouter()
    const [companyPic, setCompanyPic] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');
    const [navBarColor, setNavBarColor] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
      if(company === null)
      return
      if(user === null)
      return;
      if(companyConfig === null)
      return;

      setProfilePic(user.profilePicture!);
      setNavBarColor(companyConfig.mainColor);
      setCompanyPic(companyConfig.logo);
    }, [company, companyConfig])


return (
  <nav
  style={{backgroundColor: navBarColor ? navBarColor : 'transparent'}}
    className={`flex-no-wrap relative flex w-full items-center py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:justify-between lg:py-2 lg:px-14`}
    data-te-navbar-ref>
    <div className="flex w-full flex-wrap  items-center justify-between">
      
      <div className='flex items-center gap-0'>
      <button
        onClick={()=> setOpen(!open)}
        className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
        type="button"
        data-te-collapse-init
        data-te-target="#navbarSupportedContent1"
        aria-controls="navbarSupportedContent1"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="[&>svg]:w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7">
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd" />
          </svg>
        </span>
      </button>
      
        <Link href={'/'} className=' flex items-center'> 
          <img
                src={companyPic}
                className={`${companyConfig?.id === 2 ? 'h-8 ml-12': 'h-6'} md:pl-0 lg:h-8`}
                alt="innoloft logo"
                loading="lazy" />
          </Link>
      </div>
      <Link
        className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
        href="/"
        id="dropdownMenuButton2"
        role="button"
        data-te-dropdown-toggle-ref
        aria-expanded="false">
      </Link>  
      <div className='flex sm:pr-11 items-center gap-4 mr-2 lg:order-3'>
        <span className="[&>svg]:w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              enableBackground="new 0 0 496 496"
              version="1.1"
              viewBox="0 0 496 496"
              xmlSpace="preserve"
            >
              <path
                fill="#F8D12E"
                d="M0 304v65.6C0 396.8 21.6 416 48 416h400c26.4 0 48-19.2 48-46.4V304H0z"
              ></path>
              <path
                fill="#333"
                d="M448 80H48C21.6 80 0 99.2 0 126.4V192h496v-65.6c0-27.2-21.6-46.4-48-46.4z"
              ></path>
              <path fill="#DB2727" d="M0 192H496V304H0z"></path>
              <path
                fill="#DBB30F"
                d="M446.4 416c26.4 0 49.6-19.2 49.6-46.4V304H315.2l131.2 112z"
              ></path>
              <path
                fill="#202121"
                d="M448 80H48l132.8 112H496v-65.6c0-27.2-21.6-46.4-48-46.4z"
              ></path>
              <path fill="#C10E0E" d="M316 304L496 304 496 192 180 192z"></path>
              <path d="M448 80H48l370.4 112H496v-65.6c0-27.2-21.6-46.4-48-46.4z"></path>
              <path fill="#A00808" d="M496 214.4L496 192 414.4 192z"></path>
              <path
                fill="#D89F12"
                d="M496 368.8c0 29.6-21.6 47.2-48 47.2H48c-26.4 0-48-20.8-48-48"
              ></path>
            </svg>
            </span>
      <div className="cursor-pointer flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none">
        <img
          src={profilePic}
          className="rounded-full h-9 w-9"
          alt="profile pic"
          loading="lazy" />
      </div>
      </div>
      <div
        className={`!visible ${open ? '' : 'hidden'} pt-3 lg:pt-0 lg:order-2 flex-grow gap-20 basis-[100%] items-center lg:!flex lg:basis-auto transition duration-700 ease-in-out`}
        id="navbarSupportedContent1"
        data-te-collapse-item>
        <ul
        
          className={`${companyConfig?.id === 2 ? 'lg:pl-8': 'lg:pl-0'} list-style-none mr-auto flex flex-col lg:flex-row`}
          data-te-navbar-nav-ref>
          <li className="py-2 lg:mb-0 pl-4  lg:pr-2  cursor-pointer" data-te-nav-item-ref>
            <Link
              onClick={()=> setOpen(!open)}
              className={`${pathname === "/" ? 'text-yellow-300' : 'text-gray-100'} pr-32 lg:pr-0 hover:text-yellow-300   lg:px-2 `}
              href="/"
              data-te-nav-link-ref
              >Home
              </Link>
          </li>
          <li className="py-2 lg:mb-0 pl-4 lg:pr-2   cursor-pointer" data-te-nav-item-ref>
            <Link
              onClick={()=> setOpen(!open)}
              className={`${pathname === "/product" ? 'text-yellow-300' : 'text-gray-100'} pr-32 lg:pr-0 hover:text-yellow-300 lg:px-2`}
              href="/product"
              >Product
            </Link> 
          </li>
          <li className="py-2 lg:mb-0 pl-4 lg:pr-2   cursor-pointer" data-te-nav-item-ref>
            <Link
              onClick={()=> setOpen(!open)}
              className={`${pathname === "/product/edit" ? 'text-yellow-300' : 'text-gray-100'} pr-32 lg:pr-0 hover:text-yellow-300  lg:px-2 `}
              href="/product/edit"
              data-te-nav-link-ref
              >Edit
              </Link>
          </li>
          <li className='flex sm:hidden py-2 lg:mb-0 pl-4 lg:pr-2 cursor-pointer'>
              <Link href={'https://relocate.me/blog/job-relocation/is-it-worth-moving-to-germany-as-a-software-engineer'}>
                  <span className="flex items-start  w-full hover:text-red-500  text-white rounded-lg  group">Deutschland</span>
              </Link>
              <span className="flex items-center pl-2  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <svg  className='w-6 h-6' xmlns="http://www.w3.org/2000/svg"  x="0"  y="0"  enableBackground="new 0 0 496 496"  version="1.1"  viewBox="0 0 496 496"  xmlSpace="preserve">  <path    fill="#F8D12E"    d="M0 304v65.6C0 396.8 21.6 416 48 416h400c26.4 0 48-19.2 48-46.4V304H0z"  ></path>  <path    fill="#333"    d="M448 80H48C21.6 80 0 99.2 0 126.4V192h496v-65.6c0-27.2-21.6-46.4-48-46.4z"  ></path>  <path fill="#DB2727" d="M0 192H496V304H0z"></path>  <path    fill="#DBB30F"    d="M446.4 416c26.4 0 49.6-19.2 49.6-46.4V304H315.2l131.2 112z"  ></path>  <path    fill="#202121"    d="M448 80H48l132.8 112H496v-65.6c0-27.2-21.6-46.4-48-46.4z"  ></path>  <path fill="#C10E0E" d="M316 304L496 304 496 192 180 192z"></path>  <path d="M448 80H48l370.4 112H496v-65.6c0-27.2-21.6-46.4-48-46.4z"></path>  <path fill="#A00808" d="M496 214.4L496 192 414.4 192z"></path>  <path    fill="#D89F12"    d="M496 368.8c0 29.6-21.6 47.2-48 47.2H48c-26.4 0-48-20.8-48-48"  ></path></svg>
              </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
