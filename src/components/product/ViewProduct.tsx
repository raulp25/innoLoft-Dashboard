import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/store';
import parse from 'html-react-parser';
import { Trl } from '@/@types/company';

export const ViewProduct = () => {
  const { product } = useSelector(state => state.company);
  const [productData, setProductData] = useState<{name: string, description: string, pic: string, type: Trl}>();

  useEffect(() => {
    if(product === null)
    return;

    setProductData({
      ['name']: product.name!,
      ['description']: product.description!,
      ['pic']: product.picture!,
      ['type']: product.type!,
    })
  }, [product])
  

  return (
    <div className="w-full border-2 pb-8">    
      <div className='flex flex-col items-center'>
        <div className='w-full sm:w-96'>
            <img src={productData?.pic} className='w-full' alt="product" />
        </div>
        <div className='mt-3 px-5 flex flex-col items-start w-full'>
            <div className='text-base font-bold text-left'>
                 <p>
                  {productData?.name ? parse(productData?.name) : ''}
                 </p>
                 <span className="bg-gray-200 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-gray-200 ">
                    {productData?.type ? productData.type.name : ''}
                 </span>  
            </div>
            <div className='text-sm mt-2 text-left'>    
              {productData?.description ? parse(productData?.description) : ''}
            </div>
        </div>
      </div>           
    </div>
  )
}
