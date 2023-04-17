import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/store'
import dynamic from 'next/dynamic'
import { Product } from '@/@types/company'
import { ViewSeller } from '../ViewSeller'
import { ViewDetails } from '../ViewDetails'

const EditProductForm = dynamic(
    () => {
      return import("../../../components/product/editProduct/EditProductForm");
    },
    { ssr: false }
  );

  const EditVideoForm = dynamic(
    () => {
      return import("../../../components/product/editProduct/EditVideoForm");
    },
    { ssr: false }
  );

export const MainEdit = () => {
  const { product, companyConfig } = useSelector(state => state.company);
  const [productGlobal, setProductGlobal] = useState<Product | null>(null);
  const [showUser, setShowUser] = useState<boolean>(false);
  
  useEffect(() => {
    if(product === null)
    return;
    if(companyConfig === null)
    return;

    setProductGlobal(product)
    setShowUser(companyConfig.hasUserSection)
  }, [product, companyConfig])
  
  return (
      <>
        <div className='grid grid-cols-1 lg:grid-cols-5  w-full'>
            <div className={`${showUser ? 'col-span-3' : 'lg:col-start-2 lg:col-end-5 col-span-5'}`}>
              <div className='flex justify-start w-full'>
                <EditProductForm setProductGlobal={setProductGlobal} productGlobal={productGlobal}/>  
              </div>  
            </div>
            {
              showUser &&
              <div className="col-span-2 pl-4 my-8 lg:my-0 border-2 ">
                  <ViewSeller/>
              </div>
            }
        </div>
        <EditVideoForm productGlobal={productGlobal} setProductGlobal={setProductGlobal}/>
        <ViewDetails productGlobal={productGlobal} setProductGlobal={setProductGlobal} isEdit/> 
    </>
  )
}
