/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-06-14 23:45:31
 * @LastEditTime: 2021-08-31 22:29:19
 * @Description: file content
 */
import { useCallback, useState } from "react";

export default function (initState: boolean = false) {
  const [isOpen, setIsOpen] = useState(initState);
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
