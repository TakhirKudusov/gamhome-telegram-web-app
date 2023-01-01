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
  isCityOpen?: boolean;
  setIsCityOpen?: Dispatch<SetStateAction<boolean>>;
  isDistrictOpen?: boolean;
  setIsDistrictOpen?: Dispatch<SetStateAction<boolean>>;
  isMetroOpen?: boolean;
  setIsMetroOpen?: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<Value>({});

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState<boolean>(false);
  const [isMetroOpen, setIsMetroOpen] = useState<boolean>(false);

  const value: Value = {
    isMapOpen,
    setIsMapOpen,
    isCityOpen,
    setIsCityOpen,
    isDistrictOpen,
    setIsDistrictOpen,
    isMetroOpen,
    setIsMetroOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, ContextProvider };
