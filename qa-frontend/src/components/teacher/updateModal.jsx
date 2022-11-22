import { Dialog, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { httpPutFaculties } from "../../services/requests";
import SelectInput from "../faculty/select";
import Input from "../form/input";
import InputDate from "../form/InputDate";

export default function UpdateModal({
  isOpen,
  setIsOpen,
  title,
  schema,
  confirmText,
  denyText,
  refetch,
  department,
  setLoading,
  faculties,
}) {
  const [data, setData] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setData(department);
    reset();
  }, [department, isOpen, reset, setIsOpen]);

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await httpPutFaculties({
      ...data,
    });
    console.log("put", res);
    if (res) {
      refetch();
      setLoading(false);
    }
  };

  async function confirmUpdate(data) {
    console.log("submit", data);
    onSubmit(data);
    // const result = await deleteFaculty({ data });
    // if (result.ok) {
    //   toast.success("فاکولته موفقانه حذف شد");
    //   refetch();
    // } else {
    //   toast.warning("متاسفانه تغییرات اعمال نشد");
    //   console.log(result.statusText);
    // }
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-vazirBold"
          onClose={closeModal}
          dir="rtl"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900 mb-3"
                  >
                    {title}
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid min-w-full gap-3"
                  >
                    <Input
                      register={register}
                      errors={errors}
                      label="نام استاد (فارسی)"
                      name="fa_name"
                      type="text"
                      defaultValue={data.fa_name}
                    />
                    <Input
                      register={register}
                      errors={errors}
                      dir={"ltr"}
                      label="نام استاد (انگلیسی)"
                      name="en_name"
                      type="text"
                      defaultValue={data.en_name}
                    />
                    <SelectInput
                      name="facultyId"
                      Type={"number"}
                      Controller={Controller}
                      control={control}
                      errors={errors}
                      options={faculties?.map((item) => [
                        item.fa_name,
                        item.id,
                      ])}
                      placeholder="فاکولته"
                      defaultValue={"طب"}
                    />
                    <InputDate
                      register={register}
                      errors={errors}
                      label="تاریخ"
                      name="date"
                      type="Date"
                      useForm={useForm}
                      Controller={Controller}
                      control={control}
                      defaultValue={data.date}
                    />
                  </form>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {denyText}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => confirmUpdate(department)}
                    >
                      {confirmText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}