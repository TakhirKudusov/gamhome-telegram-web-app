import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type Value = {
  isMapOpen?: boolean;
  setIsMapOpen?: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<Value>({});

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  const value: Value = {
    isMapOpen,
    setIsMapOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, ContextProvider };
