import React from "react";

interface Props {
  handleClick(e: React.MouseEvent<HTMLElement>): void;
  children: React.ReactNode;
}

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="nav_home">
      {children}
      <a href="/" className="logo">
        Conta
      </a>
    </div>
  );
};

export const NavOption = ({ handleClick, children }: Props) => {
  return (
    <div className="nav_option_home" onClick={handleClick}>
      {children}
    </div>
  );
};
