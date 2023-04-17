import { CompanyConfig, CompanyData, Trl } from "@/@types/company";
import axios from "axios";

const innoLoftBack = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  // Get App Data
  export const getAppData = async() => {
    
    try {
      const { data } = await innoLoftBack.get<CompanyData>('/product/6781/');
      return data;
    } catch (err) {
      console.log({ err });
    }
  };
  
  // Get Trl Data
  export const getTrlData = async() => {
    
    try {
      const { data } = await innoLoftBack.get<Trl[]>('/trl/');
      return data;
    } catch (err) {
      console.log({ err });
    }
  };
  
  // Get App Config
  export const getAppConfig = async(appId: string) => {
    
      try {
        const { data } = await innoLoftBack.get<CompanyConfig>(`/configuration/${appId}/`);
        return data;
      } catch (err) {
        console.log({ err });
      }
  };  
  
  // Update Product
  export const saveProduct = async <T>() => {
    
      try {
        const response = await innoLoftBack.put<T>('/product/6781/');
        return true;
      } catch (err) {
        console.log({ err });
      }
  };  

  