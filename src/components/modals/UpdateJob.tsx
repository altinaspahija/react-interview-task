import { useEffect } from "react";
import { BiX } from "react-icons/bi";
import { CancelChanges, SaveChanges } from "../common/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import Tooltip from "../common/Tooltip";
import { Item } from "../../types/types";
import { usePut } from "../../services/useApi";


interface UpdateItemProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (show: boolean) => void;
  itemId: string | undefined;
  filteredItems: Item[];
  setFilteredItems: (items: Item[]) => void;
  originalItems: Item[];
  setOriginalItems: (items: Item[]) => void;
}

export function UpdateItem({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  itemId,
  filteredItems,
  setFilteredItems,
}: UpdateItemProps) {
  const { putData: updateItem, isLoading, error } = usePut();

  const itemSelected = filteredItems.find((item) => item.id === itemId);

  const UpdateItemSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    quantity: Yup.number().required("Quantity is required"),
    description: Yup.string().required("Description is required"),
    notes: Yup.string().required("Notes is required"),
  });

  const form = useFormik({
    initialValues: {
      id: itemSelected?.id || "0",
      name: itemSelected?.name || "",
      quantity: itemSelected?.quantity || 0,
      description: itemSelected?.description || "",
      notes: itemSelected?.notes || "",
    },
    validationSchema: UpdateItemSchema,
    onSubmit: async (values: Item) => {
      try {
        const updatedItem = await updateItem(`/items`, values.id, values);
        setFilteredItems(
          filteredItems?.map((item) =>
            item.id === itemId ? updatedItem : item
          )
        );
        setIsUpdateModalOpen(false);
      } catch (error) {
        console.error("Error updating item:", error);
      }
    },
  });

  useEffect(() => {
    if (itemSelected) {
      form.setValues({
        id: itemSelected.id,
        name: itemSelected.name,
        quantity: itemSelected.quantity,
        description: itemSelected.description,
        notes: itemSelected.notes,
      });
    }
  }, [itemSelected]);

  return (
    <>
      {isUpdateModalOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none pb-20">
            <div className="relative w-[800px] h-[350px] mb-20">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-4 py-3 border-b border-solid border-2 border-[#EAEAEA] rounded-md bg-[#F5F5F7]">
                  <p className="text-md font-semibold text-[#323338] self-center">
                    Update Item
                  </p>
                  <BiX
                    className="w-6 h-6 inline-block self-center bg-transparent cursor-pointer"
                    onClick={() => setIsUpdateModalOpen(false)}
                  />
                </div>

                <div className="flex flex-row justify-start items-start px-4 pt-2 pb-0">
                  <div className="flex items-center">
                    <Tooltip text="Modify data to update item" />
                    <p className="text-[#323338] font-normal text-sm">
                      Informative piece of text that can be used regarding this
                      modal.
                    </p>
                  </div>
                </div>

                <form onSubmit={form.handleSubmit}>
                  <div className="flex flex-col justify-start items-start p-4">
                    <div className="flex flex-row justify-start py-4 w-full space-x-4">
                      <div className="flex flex-col w-1/2">
                        <label className="text-[#323338] text-md font-semibold mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={form.values.quantity}
                          onChange={form.handleChange}
                          className="text-sm placeholder:text-[#E0E0E1] text-[#323338] font-normal self-center py-2 px-1 outline-none bg-[#F5F5F7] w-full"
                        />
                        {form.errors.quantity && form.touched.quantity && (
                          <div className="text-red-500 text-xs ml-1 mt-1">
                            {form.errors.quantity}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col w-1/2">
                        <label className="text-[#323338] text-md font-semibold mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.values.name}
                          onChange={form.handleChange}
                          className="text-sm placeholder:text-[#E0E0E1] text-[#323338] font-normal self-center py-2 px-1 outline-none bg-[#F5F5F7] w-full"
                        />
                        {form.errors.name && form.touched.name && (
                          <div className="text-red-500 text-xs ml-1 mt-1">
                            {form.errors.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-start py-4 w-full">
                      <label className="text-[#323338] text-md font-semibold mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={form.values.description}
                        onChange={form.handleChange}
                        className="text-sm placeholder:text-[#E0E0E1] text-[#323338] font-normal self-center py-2 px-1 outline-none bg-[#F5F5F7] w-full"
                      />
                      {form.errors.description && form.touched.description && (
                        <div className="text-red-500 text-xs ml-1 mt-1">
                          {form.errors.description}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-start py-4 w-full">
                      <label className="text-[#323338] text-md font-semibold mb-2">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={form.values.notes}
                        onChange={form.handleChange}
                        className="text-sm placeholder:text-[#E0E0E1] text-[#323338] font-normal self-center py-2 px-1 outline-none bg-[#F5F5F7] w-full"
                      />
                      {form.errors.notes && form.touched.notes && (
                        <div className="text-red-500 text-xs ml-1 mt-1">
                          {form.errors.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end p-10 space-x-4">
                    <CancelChanges
                      handleCloseModal={() => setIsUpdateModalOpen(false)}
                      isLoading={isLoading}
                    />
                    <SaveChanges isLoading={isLoading} />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}


