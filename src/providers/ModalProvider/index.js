import { createContext, useState, useContext } from "react";

export const ModalContext = createContext([]);

export const ModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalVisible, setIsModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
