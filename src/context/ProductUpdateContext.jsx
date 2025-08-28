import React, { createContext, useContext, useState } from 'react';

const ProductUpdateContext = createContext();

export const ProductUpdateProvider = ({ children }) => {
  const [updateFlag, setUpdateFlag] = useState(false);

  const triggerUpdate = () => {
    setUpdateFlag(prev => !prev);
  };

  return (
    <ProductUpdateContext.Provider value={{ updateFlag, triggerUpdate }}>
      {children}
    </ProductUpdateContext.Provider>
  );
};

export const useProductUpdate = () => useContext(ProductUpdateContext);
