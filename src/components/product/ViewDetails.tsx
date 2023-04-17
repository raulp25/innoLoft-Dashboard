import { Product } from "@/@types/company";
import { DetailBadge } from "./DetailBadge"

interface Props {
  isEdit?: boolean;
  productGlobal?: Product | null;
  setProductGlobal?: React.Dispatch<React.SetStateAction<Product |  null>>
  
}

export const ViewDetails = ({ isEdit = false, productGlobal, setProductGlobal }:Props) => {

  return (
    <div className="w-full flex flex-col mt-7"> 
      <div className="pt-4">
        <p className='font-semibold pl-2'>
          Details
        </p>
      </div>   
     <div className='border-2 grid grid-cols-1 lg:grid-cols-2 px-3  mt-0 pl-0 sm:pl-8 pb-8'>
        <DetailBadge productGlobal={productGlobal} setProductGlobal={setProductGlobal} isEdit={isEdit}/>
     </div>
    </div>
  )
}
