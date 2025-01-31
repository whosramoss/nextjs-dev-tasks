import { useState } from "react";

export interface IUseDialogResult {
  openedList: number | null;
  onOpenListById: (id: number) => void;
  openedDialog: number | null;
  onOpenCloseDialogById: (id: number) => void;
}

export default function useDialog(): IUseDialogResult {
  const [openedList, setOpenedList] = useState<number | null>(null);
  const [openedDialog, setOpenedDialog] = useState<number | null>(null);

  function onOpenListById(id: number): void {
    setOpenedDialog(null);
    if (openedList === id) return setOpenedList(null);
    setOpenedList(id);
  }

  function onOpenCloseDialogById(id: number): void {
    if (id === openedDialog) return setOpenedDialog(null);
    setOpenedDialog(id);
  }

  return { openedList, onOpenListById, openedDialog, onOpenCloseDialogById };
}
