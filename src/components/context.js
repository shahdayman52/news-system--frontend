import {createContext} from 'react';
import {User} from '../useContext' //from where

export const Context=createContext<User | undefined>(undefined);