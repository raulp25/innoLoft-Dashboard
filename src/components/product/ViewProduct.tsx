import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/store';
import parse from 'html-react-parser';

export const ViewProduct = () => {
  const { product } = useSelector(state => state.company);
  const [productData, setProductData] = useState<{name: string, description: string, pic: string}>();

  useEffect(() => {
    if(product === null)
    return;

    setProductData({
      ['name']: product.name!,
      ['description']: product.description!,
      ['pic']: product.picture!,
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
                 {productData?.name ? parse(productData?.name) : ''}
            </div>
            <div className='text-sm mt-2 text-left'>    
              {productData?.description ? parse(productData?.description) : ''}
            </div>
        </div>
      </div>           
    </div>
  )
}
