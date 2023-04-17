import { useEffect, useState } from 'react' 
import { useSelector } from '@/redux/store';
import { Product, ProductDetails, Trl } from '@/@types/company';
import { BadgeItem } from '@/@types/badges';
import { ModalComponent } from './ModalComponent';
import { uuid } from 'uuidv4';

interface Props {
  isEdit?: boolean;
  productGlobal?: Product | null;
  setProductGlobal?: React.Dispatch<React.SetStateAction<Product |  null>>
}

export const DetailBadge = ({ isEdit = false, productGlobal, setProductGlobal }: Props) => {
  const { product, trlData } = useSelector(state => state.company);
  const [detailsData, setDetailsData] = useState<ProductDetails>({
    businessModels:[], 
    categories:[], 
    investmentEffort: '', 
    trl: {
      name: '', 
      id: 0
    }
  });
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>('');
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState<string>('');
  const [currentBadgeData, setCurrentBadgeData] = useState<{parentId: string; badge: BadgeItem}>({parentId: '', badge:{ id:'', name: '' }});
  const [trlDataState, setTrlDataState] = useState<Trl[]>([]);

  useEffect(() => {
    if(trlData === null)
    return;

    setTrlDataState(trlData);
  }, [trlData])

  
  useEffect(() => {
    if(isEdit){
      if(productGlobal === null)
      return;
      
      setDetailsData({
        ['businessModels']: productGlobal!.businessModels,
        ['categories']: productGlobal!.categories,
        ['investmentEffort']: productGlobal!.investmentEffort,
        ['trl']: productGlobal!.trl
      })
    }
    
    if(!isEdit){
      if(product === null)
      return;
      
      setDetailsData({
        ['businessModels']: product.businessModels,
        ['categories']: product.categories,
        ['investmentEffort']: product.investmentEffort,
        ['trl']: product.trl
      })
    }
  }, [productGlobal, product])
    

  const handleOpenModal = (categoryId: string) =>{
    if(!isEdit)
    return;

    setCurrentCategoryId(categoryId);
     setOpen(true);
  }

  const onClose = () => setOpen(false);
  const onCloseEdit = () => setOpenEdit(false);
  
  const handleSaveData = (input: string) => {

    const newId = uuid()
      const newData: Trl = { 
        name: input,
        id: newId
      }
 
      if(currentCategoryId !== 'investmentEffort'){
        const updateData = {
          ...detailsData,
          [currentCategoryId]: [...detailsData[currentCategoryId], newData],
        }
        setDetailsData(updateData);

        if(!productGlobal || !setProductGlobal)
        return

        const updateGlobalVar = {
          ...productGlobal,
          ...updateData
        }
        
        setProductGlobal(updateGlobalVar);
      }

      if(currentCategoryId === 'investmentEffort'){
        const newData = input
        let updateData = {
          ...detailsData,
          [currentCategoryId]:  newData,
        }
        setDetailsData(updateData);

        if(!productGlobal || !setProductGlobal)
        return;

        const updateGlobalVar = {
          ...productGlobal,
          ...updateData
        }

        setProductGlobal(updateGlobalVar);
      }

    }
    
    const handleUpdateData = (parentKey: string, badgeItem: BadgeItem, input: string) => {

      if(parentKey !== 'investmentEffort'){

        const getInvestmentArr = detailsData[parentKey];
        
        const updateArr = getInvestmentArr.map((badge: Trl) => {
          if(badge.id === badgeItem.id){
            return {
              id: badgeItem.id,
              name: input
            }
          };
          
          return badge;
        })
        
        const updateData = {
        ...detailsData,
        [parentKey]: updateArr
      }

      setDetailsData(updateData);

      if(!productGlobal || !setProductGlobal)
      return;

      const updateGlobalVar = {
        ...productGlobal,
        ...updateData
      }

      setProductGlobal(updateGlobalVar);
    }
    
    if(parentKey === 'investmentEffort'){
      const updateData = {
        ...detailsData,
        [parentKey]: input
      };
    
      setDetailsData(updateData) ;

      if(!productGlobal || !setProductGlobal)
      return;

      const updateGlobalVar = {
        ...productGlobal,
        ...updateData
      }

      setProductGlobal(updateGlobalVar);
  }
  
};

  const handleDeleteBadge =  (parentId: string, badgeItem: BadgeItem) => {
    
    if(parentId !== 'investmentEffort'){
      const getInvestmentArr = detailsData[parentId];
      const deleteBadge = getInvestmentArr.filter((badge: Trl) => badge.id !== badgeItem.id)
      
      const updateData = {
        ...detailsData,
        [parentId]: deleteBadge
      }
      
      setDetailsData(updateData);

      if(!productGlobal || !setProductGlobal)
      return;

      const updateGlobalVar = {
        ...productGlobal,
        ...updateData
      }

      setProductGlobal(updateGlobalVar);
    }

  };
  

  const handleUpdateTLR = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { target : { value } } = e;

    const findTlr = trlData?.find(tlr => tlr.id === value)

    if(!findTlr)
    return; 

    const updateData = {
      ...detailsData,
      ['trl']: findTlr
    };    
    
    setDetailsData(updateData)

    if(!productGlobal || !setProductGlobal)
    return;

    const updateGlobalVar = {
      ...productGlobal,
      ...updateData
    }

    setProductGlobal(updateGlobalVar); 

  }

  
  const handleSelectBadge = (parentId: string, badge: BadgeItem) => {
    if(!isEdit)
    return;
    
    const currentCategory = parentId;
    
    if(currentCategory)
    setCurrentCategoryTitle(detailsData[currentCategory].name);

    setCurrentBadgeData({parentId, badge});
    setOpenEdit(true);
  }

  function isTrl(obj: any): obj is Trl {
    return obj && typeof obj === "object" && "name" in obj;
  }

  return (
    <>
      <div  className="flex ml-3 mt-7 gap-1">
          <svg className="mt-1" fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em"> <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 01-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 01-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 01-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 01.434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 011.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 011.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 011.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 011.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 01.434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 01-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 01-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 01-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 110-9.995 4.998 4.998 0 010 9.996z" /> </svg>
          <div className='w-full'>
            <div className='flex'>
              <p>
                Technology
              </p>
              {isEdit &&(
                <div className='hover:cursor-pointer' 
                  onClick={()=>handleOpenModal('categories')}
                >
                  <svg className='hover:fill-current hover:text-blue-400' viewBox="0 0 24 24" fill="#4f83eb" height="1.3em" width="1.3em" > <path d="M17 11a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4h4z" /> </svg>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {detailsData.categories?.map(badge =>( 
                  <div key={badge.id} className={`${isEdit ? 'cursor-pointer' : 'cursor-default' }`} 
                    onClick={()=>handleSelectBadge('categories', badge)}
                  > 
                    <span className="bg-gray-200 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-gray-200 hover:bg-gray-100">
                    {badge.name}
                    </span> 
                  </div>  
                ))}
            </div>
          </div>
        </div>

      <div  className="flex ml-3 mt-7 gap-1">
      <svg className="mt-1" viewBox="0 0 384 512" fill="currentColor" height="1em" width="1em" > <path d="M32 391.6V416h320V224c0-106-86-192-192-192H12.9C5.8 32 0 37.8 0 44.9c0 2 .5 4 1.4 5.8L16 80l-6.6 6.6c-6 6-9.4 14.1-9.4 22.6v133.1c0 13.1 8 24.9 20.1 29.7l46.5 18.6c8.5 3.4 18 3 26.2-1.1l6.6-3.3c8-4 14-11.2 16.5-19.8l8.3-28.9c2.5-8.6 8.4-15.8 16.5-19.8L160 208v40.4c0 24.2-13.7 46.4-35.4 57.2l-57.2 28.7c-21.7 10.9-35.4 33-35.4 57.3zM72 148c0 11-9 20-20 20s-20-9-20-20 9-20 20-20 20 9 20 20zm280 300H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h320c17.7 0 32-14.3 32-32s-14.3-32-32-32z" /> </svg>
          <div className='w-full'>
            <div className='flex'>
              <p>
                Bussiness Model
              </p>
              {isEdit &&(
                <div className='hover:cursor-pointer' 
                  onClick={()=>handleOpenModal('businessModels')}
                >
                  <svg className='hover:fill-current hover:text-blue-400' viewBox="0 0 24 24" fill="#4f83eb" height="1.3em" width="1.3em" > <path d="M17 11a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4h4z" /> </svg>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {detailsData.businessModels?.map(badge =>( 
                  <div key={badge.id} className={`${isEdit ? 'cursor-pointer' : 'cursor-default' }`} 
                    onClick={()=>handleSelectBadge('businessModels', badge)}
                  > 
                    <span className="bg-gray-200 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-gray-200 hover:bg-gray-100">
                    {badge.name}
                    </span> 
                  </div>  
                ))}
            </div>
          </div>
        </div>

      <div  className="flex ml-3 mt-7 gap-1">
          <svg className="mt-1" fill="none" viewBox="0 0 15 15" height="1em" width="1em"> <path fill="currentColor" d="M9 1H6V0h3v1z" /> <path   fill="currentColor"   fillRule="evenodd"   d="M7.5 2a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 8V5H7v4h3V8H8z"   clipRule="evenodd" /> </svg>
          <div className='w-10/12'>
            <div className='flex'>
              <p>
                TLR
              </p>
            
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {!isEdit && (
                  <div className={`${isEdit ? 'cursor-pointer' : 'cursor-default' }`} 
                  > 
                    <span className="bg-gray-200 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-gray-200 hover:bg-gray-100">
                    {isTrl(detailsData.trl) ? detailsData.trl.name : ""}
                    </span> 
                  </div>  
              )}
              {isEdit && (
                <div> 
                  <select id="small" onChange={handleUpdateTLR} className="hover:bg-slate-100 cursor-pointer block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={isTrl(detailsData.trl) ? detailsData.trl.id : ""}>{isTrl(detailsData.trl) ? detailsData.trl.name : ""}</option>
                    {trlDataState &&  trlDataState.map(trlElement => (
                      <option key={trlElement.id} value={trlElement.id}>{trlElement.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div  className="flex ml-3 mt-7 gap-1">
          <svg className="mt-1" viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" > <path fill="none" d="M0 0h24v24H0z" /> <path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm5.5 11v2H11v2h2v-2h1a2.5 2.5 0 100-5h-4a.5.5 0 110-1h5.5V8H13V6h-2v2h-1a2.5 2.5 0 000 5h4a.5.5 0 110 1H8.5z" /> </svg>
          <div className='w-full'>
            <div className='flex'>
              <p>
                Costs
              </p>
            </div>
            <div className="flex flex-wrap gap-1 mt-1"> 
                  <div  className={`${isEdit ? 'cursor-pointer' : 'cursor-default' }`} 
                  onClick={()=>handleSelectBadge('investmentEffort', {
                    name: detailsData.investmentEffort 
                    ? detailsData.investmentEffort 
                    : '', 
                    id: 0
                  })}
                  > 
                    <span className="bg-gray-200 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-gray-200 hover:bg-gray-100">
                    {detailsData?.investmentEffort}
                    </span> 
                  </div>  
            </div>
          </div>
        </div>
      
      {
      open && (
        <ModalComponent open={open} onClose={onClose} currentCategory={currentCategoryTitle} handleSaveData={handleSaveData}/>
      )}
      {
        openEdit &&
        <ModalComponent isEdit={true} badgeData={currentBadgeData} currentCategory={currentCategoryTitle} open={openEdit} onClose={onCloseEdit} handleUpdateData={handleUpdateData} handleDeleteBadge={handleDeleteBadge} />
      }
    </>
  )
}
