import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { CompanyConfig, CompanyData, Product, Trl, User } from "@/@types/company";

type CompanyState = {
    company: CompanyData,
    companyConfig: CompanyConfig | null;
    trlData: Trl[] | null;
    product: Product | null,
    user: User | null,
  };
  
  const initialState: CompanyState = {
    company: {
      businessModels:           null,
      categories:               null,
      company:                  null,
      description:              null,
      id:                       null,
      implementationEffortText: null,
      investmentEffort:         null,
      name:                     null,
      picture:                  null,
      trl:                      null,
      type:                     null,
      user:                     null,
      video:                    null,
    }, 
    companyConfig:               null,
    trlData:                    null,
    product:                    null,
    user:                       null

  };
  
  export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
      setEmpresaData(state, action) {
        state.company = action.payload;
      },
      setCompanyConfig(state, action) {
        state.companyConfig = action.payload;
      },
      setTrlData(state, action) {
        state.trlData = action.payload;
      },
      setProductData(state, action) {
        state.product = action.payload;
      },
      setUserData(state, action) {
        state.user = action.payload;
      },
    }
  });

  export default companySlice.reducer;
  
  export const setCompanyData = (empresaState: CompanyData) => {
    dispatch(companySlice.actions.setEmpresaData(empresaState));
  }

  export const setCompanyConfig = (companyConfig: CompanyConfig) => {
    dispatch(companySlice.actions.setCompanyConfig(companyConfig));
  }
  export const setTrlData = (trlData: Trl[]) => {
    dispatch(companySlice.actions.setTrlData(trlData));
  }

  export const setProductData = (productState: Product) => {
    dispatch(companySlice.actions.setProductData(productState));
  }

  export const setUserData = (userState: User) => {
    dispatch(companySlice.actions.setUserData(userState));
  }
  