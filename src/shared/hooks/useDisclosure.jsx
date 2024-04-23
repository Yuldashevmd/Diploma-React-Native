import { useState } from "react";

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  // OPEN
  const open = () => {
    setIsOpen(true);
  };
  // CLOSE
  const close = () => {
    setIsOpen(false);
  };

  // TOGGLE
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // RETURN
  return { isOpen, open, close, toggle };
};
