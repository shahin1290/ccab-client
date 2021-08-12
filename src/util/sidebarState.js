import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function SideBarStateProvider({ children }) {
  // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer!

  // Closed SideBar by default
  const [sideBarOpen, setSideBarOpen] = useState(false);

  function toggleSideBar() {
    setSideBarOpen(!sideBarOpen);
  }

  function closeSideBar() {
    setSideBarOpen(false);
  }

  function openSideBar() {
    setSideBarOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        sideBarOpen,
        setSideBarOpen,
        toggleSideBar,
        closeSideBar,
        openSideBar,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the SideBar local state
function useSideBar() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}
export { SideBarStateProvider, useSideBar };