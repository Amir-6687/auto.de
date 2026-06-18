"use client";

import { createContext, useContext, useState } from "react";

const NavbarContext = createContext({
  hidden: false,
  setHidden: (value: boolean) => {},
});

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  return (
    <NavbarContext.Provider value={{ hidden, setHidden }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}
