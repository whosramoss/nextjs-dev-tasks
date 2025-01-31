"use client";
import { useState } from "react";
import { createNewId } from "@utils/utils";
import { useTaskStore } from "src/stores/task-store";
import { Button } from "@ui/buttons";

export default function TaskForm() {
  const onAddList = useTaskStore((state) => state.onAddList);
  const [listTitle, setListTitle] = useState<string>("");

  function onSubmitForm(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (listTitle === "") return;

    setListTitle("");
    onAddList({
      id: createNewId(),
      title: listTitle,
      tasks: [],
    });
  }

  return (
    <form onSubmit={onSubmitForm} className="form form-add-task">
      <input
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
        placeholder="New Group Task"
        className="input title "
        type="text"
      />
      <Button.Add
        isOpen={true}
        className="form-add-todo__btn"
        groupId={createNewId()}
      >
        Add
      </Button.Add>
    </form>
  );
}
