import { useContext, createContext } from 'react';

const AppContext = createContext(undefined);
const useAppContext = () => useContext(AppContext);

export { useAppContext, AppContext };
