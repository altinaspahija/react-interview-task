interface NoDataFoundProps {
  title: string; 
  message?: string;
}

function NoDataFound({title,message}:NoDataFoundProps){
  return (
    <div className="flex flex-col w-full h-full align-middle items-center justify-center">
      <img src="/assets/box.png" className="w-[150px] h-[150px] self-center" alt="No data" />
      <p className="text-md font-semibold text-[#323338] my-2">{title}</p>
      <p className="text-md font-normal text-[#323338]">{message}</p>
    </div>
  );
};

export default NoDataFound;
