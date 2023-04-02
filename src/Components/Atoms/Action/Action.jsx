import React, { Fragment, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";

export default function Action({ ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    const hasNode = event.target.closest(".wrapper");
    if (ref.current && !ref.current.contains(event.target) && hasNode) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => setIsVisible(true)}
      >
        {props.title || "Thao tác"}
      </button>
      <Transition
        show={isVisible}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {props.children}
      </Transition>
    </div>
  );
}
