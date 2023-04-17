import { useEffect, useState } from 'react'
import { useSelector } from '@/redux/store';
import { saveProduct } from '@/pages/api/getData';
import { Product } from '../../../@types/company';
import { setProductData } from '@/redux/slices/company';
import ReactQuill from 'react-quill'
import { ToastAlert } from '@/components/UI/toastAlert/ToastAlert';
import { modules } from '@/utilities/reactQuillConfig';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useRouter } from 'next/router';

interface Props {
  productGlobal: Product | null;
  setProductGlobal: React.Dispatch<React.SetStateAction<Product |  null>>
}

 const EditProductForm = ({ productGlobal, setProductGlobal }: Props) => {
  const { product } = useSelector(state => state.company);
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [productPic, setProductPic] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    if(product === null)
    return;
    
    setTitle(product!.name!);
    setProductPic(product.picture!);
    setDescription(product!.description!);
  }, [product]);


  useEffect(() => {
    if(!productGlobal)
    return 
    
    const updateUrl = {
      ...productGlobal,
      ['name']: title,
      ['description']: description,
    }

    setProductGlobal(updateUrl);
  }, [title, description])

  const onSubmit = async() => {  
    setIsLoading(true);
  
    try {
      const updateProduct = await saveProduct();
  
      if(!productGlobal)
      return; 
      
      const addFields = {
        ...productGlobal,
        ['name']: title,
        ['description']: description,
      }
    
      setProductData(addFields);
      setOpen(true);
      setIsLoading(false);
      router.push('/product');
      
    } catch (error) {
      throw new Error;
    }
     
    setIsLoading(false);
  }
  

  return (
    <div className="w-full border-2 pb-8">    
      <div className='flex flex-col items-center'>
        <div className='w-full sm:w-96'>
            <img src={productPic} className='w-full' alt="" />
        </div>
        <div className='mt-3 px-5'>
          <div className='w-full h-full'>
            <div className='font-semibold text-sm'>
              <p>
                Title
              </p>
            </div>
              {isMounted && (
                <ReactQuill 
                theme='bubble' 
                value={title}
                onChange={setTitle}
                className='max-w-full border-2'

                />
              )}
          </div>
          <hr />
          <div className='w-full h-72 mt-4'>
            <div className='font-semibold text-sm'>
              <p>
                Description
              </p>
            </div>
            {isMounted && (
              <ReactQuill 
              theme='snow'
              value={description}
              onChange={setDescription}
              className='max-w-full h-48'
              modules={modules}
              />
            )}
          </div>
          <div className='w-full flex justify-end gap-1 mt-6'>
            <button type="button" className="text-black  hover:bg-blue-200 font-medium rounded-lg text-xs px-5 py-0 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             Cancel
            </button>
            <button onClick={onSubmit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs pl-3 pr-4 py-1.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {
                isLoading &&
                <div className='flex'>
                    <svg aria-hidden="true" className="w-5 h-5  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
              }
              {
                !isLoading &&
                <div className='flex'>
                  <svg className='mr-1' viewBox="0 0 24 24" fill="currentColor" height="1.3em" width="1.3em" > <path d="M10 15.586l-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" /> </svg>
                  <span>
                    Save
                  </span>
                </div>
                
              }
            </button>
          </div>
        </div>
      </div>
      {
        open && 
        <ToastAlert setOpen={setOpen}></ToastAlert>
      }           
    </div>
  )
}

export default EditProductForm