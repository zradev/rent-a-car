import React from "react";

interface IProps {
  title: string;
  subtitle?: string;
}

const Heading = ({ title, subtitle = "" }: IProps) => {
  return (
    <div className="text-center my-8">
      <h2 className="text-4xl font-bold">{title}</h2>
      <h3 className="text-xl text-slate-500	">{subtitle}</h3>
    </div>
  );
};

export default Heading;
