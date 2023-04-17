import { useEffect, useState } from 'react';
import { useSelector } from '@/redux/store';
import { ViewDetails } from './product/ViewDetails';
import { ViewSeller } from './product/ViewSeller';
import { ViewProduct } from './product/ViewProduct';
import { ViewVideo } from './product/ViewVideo';

export const Main = () => {
  const { companyConfig } = useSelector(state => state.company);
  const [showUser, setShowUser] = useState<boolean>(false);

  useEffect(() => {
    if(companyConfig === null)
    return;
    setShowUser(companyConfig.hasUserSection);
  }, [companyConfig])
 
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-5 w-full'>
          <div className={`${showUser ? 'col-span-3' : 'col-span-5'}`}>
            <div className='flex justify-start'>
                <ViewProduct/>  
            </div>
          </div>
          {
            showUser &&
            <div className="col-span-2 pl-4 border-2 my-8 lg:my-0">
              <ViewSeller/>
            </div>
          }
      </div>
      <ViewVideo/>
      <ViewDetails/>
    </>
    
  )
}
