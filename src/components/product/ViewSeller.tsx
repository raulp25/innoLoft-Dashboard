import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/store'
import dynamic from 'next/dynamic'
import { Avatar } from 'flowbite-react'

const MapComponent = dynamic(() => import('./ViewMap'), { ssr:false });

export const ViewSeller = () => {
  const { user, company } = useSelector(state => state.company);
  const [userData, setUserData] = useState<{
    firstName:    string, 
    lastName:    string,
    profilePic:   string, 
    address:     string, 
    companyLogo: string, 
    position:    string
  }>({firstName: '', lastName: '', profilePic: '', address: '', companyLogo: '', position: ''});

  useEffect(() => {
    if(user === null)
    return;

    setUserData({
      ['firstName']: user.firstName!,
      ['lastName']: user.lastName!,
      ['profilePic']: user.profilePicture!, 
      ['address']: `
        ${company.company?.address.street} 
        ${company.company?.address.house} 
        ${company.company?.address.city.name} 
        ${company.company?.address.country.name}`,
      ['companyLogo']: company.company!.logo,
      ['position']: user.position!
    })
  }, [user])
  
  

  return (
    <div className="w-full"> 
      <div className='mt-3'>
        <p>
            Offerd By
        </p>
      </div> 
      <div className="w-44">    
        <div>
            <img src={userData?.companyLogo} alt="company logo" />
        </div>
      </div>
      <div className='flex justify-start gap-1 mt-4'>
        <Avatar size={"md"} alt="User settings" img={userData?.profilePic} rounded={true}/>
        <div>
          <p className='flex flex-col text-xs gap-1 font-normal'>
            {userData?.firstName} {userData?.lastName}
            <span>{userData?.position}</span>
          </p>
        </div>
      </div>
      <div className='mt-3'>
        <div className='flex'>
          <div>
            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em"> <path d="M18.27 6c1.01 2.17.78 4.73-.33 6.81-.94 1.69-2.29 3.12-3.44 4.69-.5.7-1 1.45-1.37 2.26-.13.27-.22.55-.32.83-.1.28-.19.56-.28.84-.09.26-.2.57-.53.57-.39 0-.5-.44-.58-.74-.24-.73-.48-1.43-.85-2.1-.42-.79-.95-1.52-1.49-2.23L18.27 6M9.12 8.42l-3.3 3.92c.61 1.29 1.52 2.39 2.39 3.49.21.25.42.51.62.78L13 11.67l-.04.01c-1.46.5-3.08-.24-3.66-1.68-.08-.17-.14-.37-.18-.57a3.05 3.05 0 010-1v-.01m-2.54-3.8l-.01.01c-1.62 2.05-1.9 4.9-.93 7.31L9.63 7.2l-.05-.05-3-2.53m7.64-2.26L11 6.17l.04-.01c1.34-.46 2.84.12 3.52 1.34.15.28.27.58.31.88.06.38.08.65.01 1.02v.01l3.2-3.8a6.988 6.988 0 00-3.85-3.24l-.01-.01M9.89 6.89l3.91-4.65-.04-.01C13.18 2.08 12.59 2 12 2c-1.97 0-3.83.85-5.15 2.31l-.02.01 3.06 2.57z" /> </svg>
          </div>
          <div className='w-48'>
            <p className='text-xs font-normal'>
              {userData?.address} 
            </p>
          </div>
        </div>      
      </div>
      <div className='pb-3 lg:pb-0'>
        <MapComponent/>
      </div>
    </div>
  )
}
