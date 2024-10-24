import { FaPlus} from "react-icons/fa6";


function CreateButton(
) {
    return (
        <>
        <div className="flex flex-row">
       <button className="flex relative bg-[#71CF48] hover:bg-[#68C142] hover:shadow-md text-white rounded-md py-5 px-10 w-[160px] h-[30px] align-middle items-center font-normal text-sm" >
       <span>Create </span>
       <div className="flex border-l-[0.5px] border-white w-[40px] h-full absolute right-0 items-center align-middle justify-center">
       <FaPlus className="w-4 h-4 inline-block self-center"/>
        </div>
        </button>
       </div>
        </>
    )
 }

export { CreateButton};