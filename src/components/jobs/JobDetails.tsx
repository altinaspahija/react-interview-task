import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Item, Category } from "../../types/types";
import { GoBack } from "../common/Button";
import SearchInput from "../common/Search";
import { useGetById } from "../../services/useApi";
import { FaCheck } from "react-icons/fa";
import { UpdateItem } from "../modals/UpdateItem";
import NoDataFound from "../common/NoDataFound";
import Table from "../common/Table";
import LoadingSpinner from "../common/LoadingSpinner";
import { debounce } from "lodash";

export default function JobsDetails() {
  const { id } = useParams();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [itemId, setItemId] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [originalItems, setOriginalItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const colorPalette = ["#4CAF50", "#FFEB3B", "#9C27B0", "#ECDE7C", "#FE4C4A"];
  const { data: job, error: jobError, isLoading: isJobLoading } = useGetById("/jobs", id!);

  const jobName = useMemo(() => job?.name, [job]);

  useEffect(() => {
    if (selectedCategory) {
      setOriginalItems(selectedCategory.items);
      setFilteredItems(selectedCategory.items);
    } else {
      setOriginalItems([]);
      setFilteredItems([]);
    }
  }, [selectedCategory]);

  const handleSearchInput = debounce((value: string) => {
    setSearchValue(value.trim().toLowerCase());
    setFilteredItems(
      originalItems.filter((item) =>
        item.name.toLowerCase().includes(value.trim().toLowerCase())
      )
    );
  }, 300);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory((prev) => (prev?.id === category.id ? null : category));
  };

  const handleRowClick = (itemId: string) => {
    setIsUpdateModalOpen(true);
    setItemId(itemId);
  };

  const columns = [
    { header: "Nr.", key: "id" as keyof Item },
    { header: "Item", key: "name" as keyof Item },
    { header: "Quantity", key: "quantity" as keyof Item },
    { header: "Description", key: "description" as keyof Item },
    { header: "Notes", key: "notes" as keyof Item },
  ];

  if (isJobLoading) return <LoadingSpinner />;
  if (jobError) return <div>Error: {jobError.message}</div>;

  return (
    <div className="flex flex-row justify-between h-[500px] space-x-2 p-2">
      <div className="flex flex-col w-1/4 space-y-2 bg-white shadow-lg rounded-lg relative overflow-hidden">
        <div className="flex flex-row w-full bg-[#F8F8FA] items-start text-start">
          <p className="text-md font-semibold text-[#323338] p-3">{jobName}</p>
        </div>
        <div className="flex flex-col p-3">
          {job?.categories?.map((category: Category, index: number) => (
            <button
              key={category.id}
              className={`relative p-2 mb-2 rounded-md text-center ${
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

      <div className="flex flex-col w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full h-[400px] overflow-x-auto overflow-y-auto">
          <div className="flex justify-between items-center bg-[#F8F8FA] px-3">
            <p className="text-md font-semibold text-[#323338]">
              {selectedCategory ? selectedCategory.name : "Data Grid"}
            </p>
            <div className="w-full max-w-sm mt-1">
              <SearchInput onSearch={(value) => handleSearchInput(value)} />
            </div>
          </div>

          {filteredItems.length ? (
            <Table<Item>
              data={filteredItems}
              columns={columns}
              onRowClick={handleRowClick}
              textColor="text-black"
            />
          ) : job.categories.length > 0 && selectedCategory == null ? (
            <div className="flex items-center justify-center h-[400px]">
              <NoDataFound
                title="No Service Selected"
                message="Please select a service on your left to proceed."
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px]">
              <NoDataFound title="No Items Found" />
            </div>
          )}
        </div>
      </div>

      <UpdateItem
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        itemId={itemId}
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
        originalItems={originalItems}
        setOriginalItems={setOriginalItems}
        id={id}
        job={job}
      />
    </div>
  );
}
