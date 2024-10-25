import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { CancelChanges, SaveChanges } from "./Button";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGetAll, usePost, usePut } from "../../services/useApi";
import Select from "react-select";
import { AiFillInfoCircle } from "react-icons/ai";
import { Category, Job, Status } from "../../types/types";
import { colorPalette } from "../../types/colors";

interface CreateJobProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  addJob?: (newJob: Job) => void;
  setFilteredJobs: (jobs: Job[]) => void;
}

function CreateJob({
  showModal,
  setShowModal,
  setFilteredJobs,
}: CreateJobProps) {
  const [id, setId] = useState<string>("0");
  const { postData: createJob, error, isLoading } = usePost();
  const {
    data: categories = [],
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetAll("/categories");
  const {
    data: statuses = [],
    error: statusesError,
    isLoading: statusesLoading,
  } = useGetAll("/statuses");
  const {
    data: jobs = [],
    error: itemsError,
    isLoading: itemsLoading,
  } = useGetAll("/jobs");

  useEffect(() => {
    if (showModal) {
      setId(uuid());
      form.resetForm();
    }
  }, [showModal]);
  
  const categoryOptions = categories?.map(
    (category: Category, index: number) => ({
      value: category.name,
      label: category.name,
      color: colorPalette[index % colorPalette.length],
    })
  );

  const CreateJobSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    categories: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Category is required"),
        })
      )
      .min(1, "At least one category is required"),
    status: Yup.object({
      label: Yup.string().required("Status is required"),
    }),
  });

  const form = useFormik({
    initialValues: {
      id: "0",
      name: "",
      categories: [],
      status: { label: "", color: "" },
      items: [],
    },
    validationSchema: CreateJobSchema,
    onSubmit: async (values: Job) => {
      if (Object.keys(form.errors).length === 0) {
        const newJob: Job = {
          id,
          name: values.name,
          categories: values.categories?.map((cat) => ({
            id:
              categories.find((c: Category) => c.name === cat.name)?.id || "0",
            name: cat.name,
            items: [],
          })),
          status: {
            label: values.status.label,
            color:
              statuses.find(
                (status: Status) => status.label === values.status.label
              )?.color || "bg-transparent",
          },
          items: [],
        };

        try {
          await createJob("/jobs", newJob);
          setFilteredJobs([...jobs, newJob]);
          setShowModal(false);
        } catch (error) {
          console.error("Error creating job:", error);
        }
      }
    },
  });

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-auto w-[800px] h-[350px]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-4 py-3 border-b border-solid border-2 border-[#EAEAEA] rounded-t-md bg-[#F5F5F7]">
                  <p className="text-md font-semibold text-[#323338] self-center">
                    Create Job
                  </p>
                  <BiX
                    className="w-6 h-6 inline-block self-center bg-transparent cursor-pointer"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="flex flex-row justify-start items-start p-4">
                  <div className="relative group">
                    <AiFillInfoCircle
                      className="w-[20px] h-[20px] inline-block mr-2 mb-0.5"
                      color="#1264A3"
                    />

                    <div className="absolute bottom-full w-40 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-left text-xs rounded py-1 px-2 transition-opacity duration-300">
                      Fill data to create a job
                    </div>
                  </div>
                  <p className="text-[#323338] font-normal text-sm self-center">
                    Informative piece of text that can be used regarding this
                    modal.
                  </p>
                </div>

                <form onSubmit={form.handleSubmit}>
                  <div className="flex flex-col justify-start items-start p-4">
                    <label className="text-[#323338] text-md font-semibold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.values.name}
                      onChange={form.handleChange}
                      className="text-sm placeholder:text-[#E0E0E1] text-[#323338] font-normal self-center py-2 px-1 outline-none bg-[#F5F5F7] w-full"
                      placeholder="Type the jobsite's name"
                    />
                    {form.errors.name && form.touched.name && (
                      <div className="text-red-500 text-xs ml-1 mt-1">
                        {form.errors.name}
                      </div>
                    )}
            
                    <div className="flex flex-row justify-start py-4 w-full space-x-4 text-left">
                      {/* Category Section */}
                      <div className="flex flex-col w-1/2">
                        <label className="text-[#323338] text-md font-semibold mb-2">
                          Category included
                        </label>

                        <Select
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              borderRadius: "0.375rem",
                              borderColor: "transparent",
                              fontSize: "0.875rem",
                              backgroundColor: "#F5F5F7",
                              color: "#323338",
                              boxShadow: "none",
                              "&:hover": {
                                borderColor: "#323338",
                              },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused
                                ? state.data.color || "#EAEAEA"
                                : "white",
                              color: state.isSelected ? "white" : "#323338",
                              "&:hover": {
                                backgroundColor: state.data.color, 
                                color: "white",
                              },
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              display: "flex",
                              alignItems: "center",
                            }),
                            placeholder: (provided) => ({
                              ...provided,
                              color: "#E0E0E1",
                            }),
                          }}
                          isMulti
                          name="categories"
                          placeholder="Select categories..."
                          options={categoryOptions}
                          value={form.values.categories?.map((cat: any) => ({
                            value: cat.name,
                            label: cat.name,
                            color: cat.color,
                          }))}
                          onChange={(selectedOptions: any) => {
                            const selectedCategories = selectedOptions.map(
                              (option: any) => ({
                                name: option.value,
                                color: option.color,
                              })
                            );
                            form.setFieldValue(
                              "categories",
                              selectedCategories
                            );
                          }}
                          formatOptionLabel={(e) => (
                            <div className="flex items-center">
                              <span
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ backgroundColor: e.color }}
                              />
                              {e.label}
                            </div>
                          )}
                          getOptionValue={(e) => e.value}
                        />
                        {form.errors.categories && form.touched.categories && (
                          <div className="text-red-500 text-xs ml-1 mt-1">
                            {form.errors.categories.toString()}
                          </div>
                        )}
                      </div>

                      {/* Status Section */}
                      <div className="flex flex-col w-1/2">
                        <label className="text-[#323338] text-md font-semibold mb-2">
                          Status
                        </label>

                        <Select
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              borderRadius: "0.375rem",
                              borderColor: "transparent",
                              fontSize: "0.875rem",
                              backgroundColor: "#F5F5F7",
                              color: "#323338",
                              boxShadow: "none",
                              "&:hover": {
                                borderColor: "#323338",
                              },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused
                                ? state.data.color || "#EAEAEA" 
                                : "white",
                              color: state.isSelected ? "white" : "#323338",
                              "&:hover": {
                                backgroundColor: state.data.color, 
                                color: "white",
                              },
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              display: "flex",
                              alignItems: "center",
                            }),
                            placeholder: (provided) => ({
                              ...provided,
                              color: "#E0E0E1",
                            }),
                          }}
                          name="status"
                          options={statuses?.map((status: Status) => ({
                            value: status.label,
                            label: status.label,
                            color: status.color,
                          }))}
                          placeholder="Select status..."
                          value={
                            form.values.status && form.values.status.label
                              ? {
                                  value: form.values.status.label,
                                  label: form.values.status.label,
                                  color: form.values.status.color,
                                }
                              : null
                          }
                          onChange={(selectedOption: any) => {
                            form.setFieldValue("status", {
                              label: selectedOption.label,
                              color: statuses.find(
                                (s: any) => s.label === selectedOption.label
                              )?.color,
                            });
                          }}
                          formatOptionLabel={(e) => (
                            <div className="flex items-center">
                              <span
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ backgroundColor: e.color }}
                              />
                              {e.label}
                            </div>
                          )}
                          getOptionValue={(e) => e.value}
                        />
                        {form.errors.status?.label && form.touched.status && (
                          <div className="text-red-500 text-xs ml-1 mt-1">
                            {form.errors.status.label}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end p-10 space-x-4">
                    <CancelChanges
                      handleCloseModal={() => setShowModal(false)}
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
export { CreateJob };
