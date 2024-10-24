import { IoSearch } from "react-icons/io5";
import { useState } from "react";

interface SearchInputProps {
    onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchJobs = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const value = e.target.value;
    console.log(value);
    setSearchTerm(value); 
    onSearch(value); 
  };

  return (
    <div className="flex flex-row bg-white border-2 border-[#EAEAEA] rounded-md mr-4 w-full mb-2">
      <IoSearch
        className="w-4 h-4 inline-block self-center mx-2"
        color="#EAEAEA"
      />
      <input
        type="text"
        className="text-sm text-[#323338] font-normal self-center w-full py-2 px-1 outline-none"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchJobs} 
      />
    </div>
  );
}
