import React, { ReactNode } from "react";
import Header from "../components/header";

interface IProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title = "Rent a Car" }: IProps) => {
  return (
    <div className="layout">
      <Header />
      {children}
      <div>Footer</div>
    </div>
  );
};

export default MainLayout;
