import { AiFillInfoCircle } from "react-icons/ai";

interface TooltipProps {
    text: string;
  }
  
  const Tooltip = ({ text }: TooltipProps) => {
    return (
      <div className="relative group">
        <AiFillInfoCircle className="w-[20px] h-[20px] inline-block mr-1" color="#1264A3" />
        <div className="absolute bottom-full ml-10 w-auto transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-300 whitespace-nowrap">
          {text}
        </div>
      </div>
    );
  };
  
  export default Tooltip;
  