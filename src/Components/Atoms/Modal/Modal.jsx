import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Button from "../Button";

export default function Modal({
  isVisible,
  handleCancel,
  handleSubmit,
  btnSubmitName,
  btnCancelName,
  isSubmitLoading,
  ...props
}) {
  return (
    <Transition show={isVisible} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-10 overflow-y-auto"
        static
        open={isVisible}
        onClose={handleCancel}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`${props.type} modal inline-block w-full p-6 my-8 overflow-hidden text-left
             transition-all transform bg-white shadow-xl rounded-2xl`}
            >
              <div className="flex justify-between border-default border-b py-4">
                <h5 className="text-xl">{props.title || "Modal Title"}</h5>

                <button type="button" className="close" onClick={handleCancel}>
                  <i aria-hidden="true" className="ki ki-close" />
                </button>
              </div>

              <div className="py-4">{props.children}</div>

              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={handleSubmit}
                  isLoading={isSubmitLoading}
                >
                  {btnSubmitName || "Button Submit"}
                </Button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCancel}
                >
                  {btnCancelName || "Button Cancel"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
