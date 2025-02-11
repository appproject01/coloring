import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const HeaderTextContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useHeaderText = () => {
  return useContext(HeaderTextContext);
};

export const HeaderTextProvider = ({ children }) => {
  const [headerText, setHeaderText] = useState("");

  return (
    <HeaderTextContext.Provider value={{ headerText, setHeaderText }}>
      {children}
    </HeaderTextContext.Provider>
  );
};

HeaderTextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
