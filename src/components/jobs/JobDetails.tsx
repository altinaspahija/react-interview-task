import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Item, Category } from "../../types/types";
import { GoBack } from "../common/Button";
import SearchInput from "../common/Search";
import { useGetById } from "../../services/useApi";

import { FaCheck } from "react-icons/fa";
import { UpdateItem } from "../common/Modal";

export default function JobsDetails() {
  const { id } = useParams();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [itemId, setItemId] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [originalItems, setOriginalItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const colorPalette = ["#4CAF50", "#FFEB3B", "#9C27B0", "#ECDE7C", "#FE4C4A"];
  const {
    data: job,
    error: jobError,
    isLoading: isJobLoading,
  } = useGetById("/jobs", id!);

  const jobName = useMemo(() => job?.name, [job]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredItems(selectedCategory.items);
    } else if (job?.categories?.length > 0) {
      setSelectedCategory(job.categories[0]);
    }
  }, [selectedCategory, job]);

  const handleSearchItems = (value: string) => {
    setSearchValue(value);
    if (selectedCategory) {
      const filtered = selectedCategory.items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  if (isJobLoading) {
    return <div>Loading details...</div>;
  }

  if (jobError) {
    return <div>Error: {jobError.message}</div>;
  }

  return (
    <div className="flex flex-row justify-between h-[500px] space-x-2 p-2">
      {/* Job Categories */}
      <div className="flex flex-col w-1/4 space-y-2 bg-white shadow-lg rounded-lg relative overflow-hidden">
        <div className="flex flex-row w-full bg-[#F8F8FA] items-start text-start">
          <p className="text-md font-semibold text-[#323338] p-3">{jobName}</p>
        </div>

        {/* Categories List */}
        <div className="flex flex-col p-3">
          {job?.categories?.map((category: Category, index: number) => (
            <button
              key={category.id}
              className={`relative p-2 mb-2 rounded-md text-cente ${
                selectedCategory?.id === category.id
                  ? "text-white"
                  : "bg-gray-100 text-black"
              }`}
              style={{
                backgroundColor:
                  selectedCategory?.id === category.id
                    ? colorPalette[index % colorPalette.length]
                    : undefined,
              }}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {selectedCategory?.id === category.id ? (
                <FaCheck className="absolute w-4 h-4 right-5 top-1/3" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="mb-10 absolute bottom-5 left-[30%]">
          <GoBack />
        </div>
      </div>

      {/* Items Table */}
      <div className="flex flex-col w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full h-[400px] overflow-x-auto overflow-y-auto">
          <div className="flex justify-between items-center bg-[#F8F8FA] px-3">
            <p className="text-md font-semibold text-[#323338]">
              {selectedCategory
                ? selectedCategory.name
                : job.categories[0]?.name}
            </p>
            <div className="w-full max-w-sm mt-1">
              <SearchInput onSearch={handleSearchItems} />
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <>
              <table className="bg-white w-full min-w-[800px]">
                <thead className="bg-white text-md font-normal text-black">
                  <tr>
                    <th className="text-left p-3">Nr.</th>
                    <th className="text-left p-3">Item</th>
                    <th className="text-left p-3">Quantity</th>
                    <th className="text-left p-3">Description</th>
                    <th className="text-left p-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setIsUpdateModalOpen(true);
                        setItemId(item.id);
                      }}
                      className={`${
                        index % 2 != 0 ? "bg-white" : "bg-[#F8F8FA]"
                      } cursor-pointer`}
                    >
                      <td className="p-3 text-md text-[#323338]">
                        {index + 1}
                      </td>
                      <td className="p-3 text-md text-[#323338]">
                        {item?.name}
                      </td>
                      <td className="p-3 text-md text-[#323338]">
                        {item?.quantity}
                      </td>
                      <td className="p-3 text-md text-[#323338]">
                        {item?.description}
                      </td>
                      <td className="p-3 text-md text-[#323338]">
                        {item?.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <UpdateItem
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                itemId={itemId}
                filteredItems={filteredItems}
                setFilteredItems={setFilteredItems}
                originalItems={originalItems}
                setOriginalItems={setOriginalItems}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] shadow-lg rounded-lg">
              {job.categories?.length < 0 && (
                <p className="bg-[#F8F8FA] text-md font-semibold text-[#323338] w-full p-3">
                  Data Grid
                </p>
              )}
              <div className="flex flex-col w-full h-full align-middle items-center justify-center">
                <img src="/assets/box.png" className="w-[150px] h-[150px]" />
                <p className="text-md font-semibold text-[#323338] my-2">
                  {job.categories?.length > 0
                    ? "No Service Selected"
                    : "No items found"}
                </p>
                {job.categories?.length > 0 && (
                  <p className="text-md font-normal text-[#323338]">
                    Please select a service on your left to proceed
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
