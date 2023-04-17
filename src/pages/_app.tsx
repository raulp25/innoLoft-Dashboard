import '@/styles/globals.css'
import { useEffect } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import type { AppContext, AppProps } from 'next/app'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';
import { Layout } from '@/components/layout/Layout';
import { CompanyConfig, CompanyData, Trl } from '@/@types/company';
import { getAppConfig, getAppData, getTrlData } from './api/getData';
import { setCompanyConfig, setCompanyData, setTrlData } from '@/redux/slices/company';
import CompanyContextProvider from '@/context/CompanyContext';
 
interface MyAppProps extends AppProps{
    company: CompanyData;
    companyConfig: CompanyConfig;
    trlData: Trl[]
    Component: NextComponentType<NextPageContext, any, any>
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, company, companyConfig, trlData } = props;

  useEffect(() => {
    if(company === undefined)
    return;
    if(companyConfig === undefined)
    return;
    if(trlData === undefined)
    return;
    setCompanyData(company);
    setCompanyConfig(companyConfig);
    setTrlData(trlData);
  }, [])

  return( 
    <ReduxProvider store={store}>
      <CompanyContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </CompanyContextProvider>
    </ReduxProvider>
)}


MyApp.getInitialProps = async (context: AppContext) => {
  const appId = process.env.NEXT_PUBLIC_APP_ID !== undefined ? process.env.NEXT_PUBLIC_APP_ID : '1';
  const company = await getAppData();
  const companyConfig = await getAppConfig('2');
  const trlData = await getTrlData()

  return {
    company,
    companyConfig,
    trlData
  };
};
