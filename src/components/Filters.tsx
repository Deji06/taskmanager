import React from "react";

type FilterProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Filters = ({searchTerm, setSearchTerm }: FilterProps) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="search task...."
      className="border-2 placeholder:p-2 mt-2 rounded w-[50%] outline-none focus:border-blue-500"
    />
  );
};

export default Filters;
