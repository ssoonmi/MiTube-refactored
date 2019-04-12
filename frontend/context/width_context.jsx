import React, { useState, useEffect } from 'react'; 

const mediaQuery = (showNormalSideNav) => {
  let width = window.innerWidth;
  if (showNormalSideNav) {
    width -= 230;
  }
  if (width > 1122) {
    return "1070px";
  } else if (width > 908) {
    return "856px";
  } else if (width > 694) {
    return "642px";
  } else {
    return "428px";
  }
};

export const WidthContext = React.createContext();

function WidthProvider({ children, showNormalSideNav }) {
  const [width, setWidth] = useState(mediaQuery(showNormalSideNav));

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(mediaQuery(showNormalSideNav));
    });
  }, []);

  useEffect(() => {
    setWidth(mediaQuery(showNormalSideNav));
  }, [showNormalSideNav]);

  return (
    <WidthContext.Provider value={width}>
      {children}
    </WidthContext.Provider>
  );
}

export default WidthProvider;