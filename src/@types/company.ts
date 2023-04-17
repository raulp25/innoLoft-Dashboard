export interface CompanyData {
    businessModels:           Trl[]   | null;
    categories:               Trl[]   | null;
    company:                  Company | null;
    description:              string  | null;
    id:                       number  | null;
    implementationEffortText: null    | null;
    investmentEffort:         string  | null;
    name:                     string  | null;
    picture:                  string  | null;
    trl:                      Trl     | null;
    type:                     Trl     | null;
    user:                     User    | null;
    video:                    string  | null;
}

export interface CompanyConfig {
    id: number;
    logo: string;
    mainColor: string;
    hasUserSection: boolean;
}

export interface Trl {
    id:   number | string;
    name: string;
}

export interface Company {
    name:    string;
    logo:    string;
    address: Address;
}

export interface Address {
    country:   City;
    city:      City;
    street:    string;
    house:     string;
    zipCode:   string;
    longitude: string;
    latitude:  string;
}

export interface City {
    name: string;
}

export interface User {
    id:             number| undefined;
    email:          string| undefined;
    firstName:       string| undefined;
    lastName:       string| undefined;
    sex:            number| undefined;
    profilePicture:  string| undefined;
    position:       string| undefined;
}

export interface ProductDetails {
    businessModels:           Trl[]   | null;
    categories:               Trl[]   | null;
    investmentEffort:         string  | null;
    trl:                      Trl     | string | null; 
    [key: string]: any;
}

export interface Product extends ProductDetails {
    description:              string  | null;
    name:                     string  | null;
    picture:                  string  | null;
    type:                     Trl     | null; 
    video:                    string  | null
}

