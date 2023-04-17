import { useEffect, useState } from "react";
import { useSelector } from "@/redux/store";

export const ViewVideo = () => {
  const { product } = useSelector(state => state.company);
  const [video, setvideo] = useState<string|null>('');

  useEffect(() => {
    if(product === null)
    return;

    const videoUrl = product.video?.replace(/<[^>]*>/g, '');
    const index = videoUrl?.indexOf('v=');

    if(!index)
    return;

    const formatUrl = videoUrl!.slice(index + 2, index + 13);     
    setvideo(formatUrl);
  }, [product])
  
  
  return (
    <div className="w-full border-2 flex flex-col mt-7"> 
      <div className="pl-3">
        <p className='font-semibold'>
          Video
        </p>
      </div>   
      <div className='w-full flex justify-center mt-2 pb-7'>
         <div className="w-5/6 h-60 lg:w-4/6 lg:h-96">
          <iframe 
            width={"100%"}  
            height={'100%'} 
            src={`https://www.youtube.com/embed/${video}`}  
            title="YouTube video player" 
            frameBorder="0"  
            allowFullScreen
            >
          </iframe>
         </div>
      </div>
    </div>
  )
}
