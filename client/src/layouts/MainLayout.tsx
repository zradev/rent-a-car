import React, { ReactNode } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header";

interface IProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title = "Rent a Car" }: IProps) => {
  return (
    <div className="layout max-w-full">
      <Header />
      <div className="h-[10vh] md:h-[16vh] bg-transparent"></div>
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
