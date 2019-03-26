import React, { useState, useEffect } from 'react'; 

const mediaQuery = (showNormalSideNav) => {
  let width = window.innerWidth;
  if (showNormalSideNav) {
    width -= 230;
  }
  if (width > 1090) {
    return "1086px";
  } else if (width > 876) {
    return "870px";
  } else if (width > 662) {
    return "656px";
  } else {
    return "428px";
  }
};

export const WidthContext = React.createContext();

function WidthProvider({ children, showNormalSideNav }) {
  const [width, setWidth] = useState(mediaQuery(showNormalSideNav));

  window.addEventListener('resize', () => {
    setWidth(mediaQuery(showNormalSideNav));
  });

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