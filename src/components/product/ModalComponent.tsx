import { useEffect, useRef, useState } from 'react'
import { BadgeItem } from '@/@types/badges';
import { Button, Modal, TextInput } from 'flowbite-react';

interface Props {
    open: boolean;
    isEdit?: boolean;
    badgeData?: {parentId: string; badge: BadgeItem};
    currentCategory: string;
    onClose: VoidFunction;
    handleSaveData?: (input: string) => void;
    handleUpdateData?: (parentId: string, badgeItem: BadgeItem, input: string) => void;
    handleDeleteBadge?: (parentId: string, badgeItem: BadgeItem) => void;
}

export const ModalComponent = ({ open, isEdit = false, badgeData, currentCategory, handleSaveData, handleUpdateData, handleDeleteBadge, onClose }:Props) => {
    const [input, setInput] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [input]);

    useEffect(() => {
      if (isEdit && badgeData) {
        setInput(badgeData?.badge.name)
      }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target : { value } } = e;
        setInput(value);
      }
     
      const saveData = () => {
        if(isEdit && handleUpdateData){
          handleUpdateData(badgeData!.parentId, badgeData!.badge, input);
          onClose();
          return;
        }

        if(!isEdit && handleSaveData) {
          handleSaveData(input);
          onClose();
        }
      }

      const deleteBadge = () => {
        if(isEdit && handleDeleteBadge){
          handleDeleteBadge(badgeData!.parentId, badgeData!.badge);
          onClose();
        }
      }

  return (
    <div> 
        <Modal
        dismissible={true}
        show={open}
        size="md"
        popup={true}
        onClose={onClose}
        >
        <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              {
                isEdit &&
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Edit {currentCategory} badge
                </h3>
              }
              {
                !isEdit &&
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Add {currentCategory} badge
                </h3>
              }
              <div> 
                  <TextInput
                  id="input"
                  placeholder="choose a bright text"
                  value={input}
                  onChange={handleInputChange}
                  ref={inputRef}
                  />
              </div>
              <div className="w-full flex gap-2">
                  <Button size={'small'} className='text-xs px-3 py-2' onClick={saveData}>
                  Save
                  </Button>
                  {
                    (isEdit && badgeData?.parentId !== 'investmentEffort') && 
                    <Button size={'small'} className='text-xs px-3 py-2' onClick={deleteBadge}>
                      Delete  
                    </Button>
                  }
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}
