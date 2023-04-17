import { ReactNode, createContext, useEffect, useState } from "react";
import { useSelector } from "@/redux/store";
import { setCompanyConfig, setProductData, setTrlData, setUserData } from "@/redux/slices/company";
import { CompanyConfig, CompanyData, Product, User } from "@/@types/company";

  interface Props {
    children: ReactNode;
  }
  type CompanyState = {
    company: CompanyData | null;
  };
  
  export const CompanyContext = createContext<CompanyState>({
    company: null,
  });
  

  const CompanyContextProvider = ({ children }: Props) => { 
    const { company,companyConfig, trlData } = useSelector(state => state.company);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    
    useEffect(() => {
        if(company === null)
        return;
        if(companyConfig === null)
        return;
        if(trlData === null)
        return;
        
        const productState: Product = {
          businessModels: company.businessModels,
          categories: company.categories,
          description: company.description && 
            company.description.replace(/<[^>]*>/g, '')
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/\bconsole\.log\((.*?)\);/gi,''),
          investmentEffort: company.investmentEffort,
          name: company.name,
          picture: company.picture,
          trl: company.trl,
          type: company.type,
          video: company.video
        }

        const userState: User = {
            email: company.user?.email,
            firstName: company.user?.firstName,
            id: company.user?.id,
            lastName: company.user?.lastName,
            position: company.user?.position,
            profilePicture: company.user?.profilePicture,
            sex: company.user?.sex
        }

        const appConfig: CompanyConfig = {
           id: companyConfig.id,
           hasUserSection: companyConfig.hasUserSection,
           logo: companyConfig.logo,
           mainColor: companyConfig.mainColor
        }

        setProductData(productState);
        setUserData(userState);
        setCompanyConfig(appConfig);
        setTrlData(trlData);
        setIsUpdated(true);
    
    }, [company, isUpdated])
    

    return <CompanyContext.Provider value={{ company }}>{children}</CompanyContext.Provider>;
  }

export default CompanyContextProvider