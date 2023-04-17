import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/store';
import { Product } from '@/@types/company';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

interface Props {
  productGlobal: Product | null;
  setProductGlobal: React.Dispatch<React.SetStateAction<Product |  null>>
}

const EditVideoForm = ({ productGlobal, setProductGlobal }:Props) => {
  const { product } = useSelector(state => state.company);
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState<string | null>('');
  useEffect(() => {
    setIsMounted(true);
  
    if(product === null)
    return;
    
    setTitle(product?.video);
  }, [product]);

  useEffect(() => {
    if(productGlobal === null )
    return;
    
    const updateUrl = {
      ...productGlobal,
      ['video']: title!.replace(/<[^>]*>/g, '')
  }
    setProductGlobal(updateUrl);
  }, [title])


    


  return (
    <div className="w-full border-2  flex flex-col mt-7 py-3"> 
      <div className="pl-3">
        <p className='font-semibold'>
          Video
        </p>
      </div>   
     <div className='w-full px-3 mt-3 flex justify-center'>
        {isMounted && (
          <ReactQuill 
          theme='bubble'
          value={title!} 
          onChange={setTitle}
          className='w-full  border-2'
          placeholder='Add a youtube video'
          />
        )}
      </div>
     </div>
  )
}

export default EditVideoForm
