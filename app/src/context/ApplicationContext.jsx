import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [context, setContext] = useState({
    searchQuery: "",
    limit: 20,
    results: [],
  });

  return (
    <ApplicationContext.Provider value={{ context, setContext }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => useContext(ApplicationContext);

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
