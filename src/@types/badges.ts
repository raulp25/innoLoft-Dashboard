import { ReactElement } from 'react';

export type BadgeItem = {
    name: string;
    id: string | number;
}

export interface Badge { 
    id: string;
    icon: ReactElement;
    title: string;
    badges: BadgeItem[]
}