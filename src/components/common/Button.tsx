import { useState } from "react";
import { Job } from "../../types/types";
import { CreateJob } from "../modals/CreateJob";
import { FaCheck, FaPlus } from "react-icons/fa";
import{ FaArrowLeft } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import {useNavigate} from "react-router-dom";

function CreateButton(
    { addJob, setFilteredJobs }: { addJob: (newJob: Job) => void, setFilteredJobs: (jobs: Job[]) => void }
) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <div className="flex flex-row">
       <button className="flex relative bg-[#71CF48] hover:bg-[#68C142] hover:shadow-md text-white rounded-md py-5 px-10 w-[160px] h-[30px] align-middle items-center font-normal text-sm" onClick={()=>setShowModal(true)}>
       <span>Create </span>
       <div className="flex border-l-[0.5px] border-white w-[40px] h-full absolute right-0 items-center align-middle justify-center">
       <FaPlus className="w-4 h-4 inline-block self-center"/>
        </div>
        </button>
       </div>
        <CreateJob showModal={showModal} setShowModal={setShowModal} addJob={addJob} setFilteredJobs={setFilteredJobs}/>
        </>
    )
 }

 function SaveChanges({isLoading}:  {isLoading:boolean}) {
    return (
        <div className="flex flex-row">
       <button disabled={isLoading} type="submit" className="flex relative bg-[#71CF48] hover:bg-[#68C142] hover:shadow-md text-white rounded-md py-5 px-3 w-[160px] h-[30px] align-middle items-center font-normal text-sm">
       {
        isLoading ? <span>Saving...</span> : <span>Save Changes </span>
       }
       <div className="flex border-l-[0.5px] border-white w-[40px] h-full absolute right-0 items-center align-middle justify-center">
       <FaCheck className="w-4 h-4 inline-block self-center"/>
        </div>
        </button>
       </div>
    )
}

function CancelChanges({handleCloseModal, isLoading}: {handleCloseModal:()=>void, isLoading: boolean}   ) {
    return (
      <div className="flex flex-row">
        <button
          type="button"
          disabled={isLoading}
          className="flex relative bg-[#EB4345] hover:bg-[#FE4C4A] hover:shadow-md text-white rounded-md py-5 px-2 w-[160px] h-[30px] align-middle items-center font-normal text-sm"
          onClick={handleCloseModal} 
        >
          <span>Cancel Changes </span>
          <div className="flex border-l-[0.5px] border-white w-[40px] h-full absolute right-0 items-center align-middle justify-center">
            <BiX className="w-6 h-6 inline-block self-center bg-transparent" />
          </div>
        </button>
      </div>
    );
  }

function GoBack() {
    const goBack = useNavigate();
    return (
        <div className="flex flex-row">
       <button onClick={()=>goBack(-1)} className="flex relative bg-[#1264A3] hover:bg-[#0F5C97] hover:shadow-md text-white rounded-md py-5 px-10  w-[160px] h-[30px] align-middle items-center font-normal text-sm">
       <span>Go Back </span>
       <div className="flex border-l-[0.5px] border-white w-[40px] h-full absolute right-0 items-center align-middle justify-center">
       <FaArrowLeft className="w-4 h-4 inline-block self-center bg-transparent"/>
        </div>
        </button>
       </div>
)
}
  
export { CreateButton, SaveChanges, CancelChanges, GoBack };