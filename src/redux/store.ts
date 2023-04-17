import {configureStore} from '@reduxjs/toolkit';
import  companySlice from './slices/company';
import {
    useSelector as useAppSelector,
    TypedUseSelectorHook,
  } from 'react-redux';

const store = configureStore({
    reducer: {
        company: companySlice,
    }
})

const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export {  store, dispatch, useSelector  };