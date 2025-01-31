"use client";

import { useState } from "react";
import { TaskList } from "@models/tasks";
import { IUseDialogResult } from "@hooks/useDialog";
import { useTaskStore } from "src/stores/task-store";
import { Button } from "@ui/buttons";
import { cn } from "@utils/utils";

interface ITaskGroup extends IUseDialogResult {
  group: TaskList;
  children: React.ReactNode;
}

export default function TaskGroup({
  group: { id, title, tasks },
  openedList,
  onOpenListById,
  openedDialog,
  onOpenCloseDialogById,
  children,
}: ITaskGroup) {
  const { onDeleteList, onEditListTitle } = useTaskStore((state) => state);
  const [listTitle, setListTitle] = useState<string>(title);

  function validateOpenCloseDialog(e: React.MouseEvent, id: number): void {
    e.stopPropagation();
    onOpenCloseDialogById(id);
  }

  function validateDeleteList(e: React.MouseEvent, id: number): void {
    e.stopPropagation();
    onDeleteList(id);
  }

  return (
    <li className={cn("item", { "item--active": id === openedList })}>
      {openedDialog === id ? (
        <div className="dialog">
          <Button.Default
            className="dialog__option"
            onClick={(e: React.MouseEvent) => validateDeleteList(e, id)}
          >
            Delete
          </Button.Default>
        </div>
      ) : (
        ""
      )}
      <article
        onClick={() => onOpenListById(id)}
        className={cn("heading", { active: id === openedList })}
      >
        <input
          type="text"
          className="heading__edit-title input-placeholder"
          value={listTitle}
          style={{ width: `${listTitle.length}ch` }}
          placeholder="Write some list title..."
          onBlur={() => onEditListTitle(id, listTitle)}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setListTitle(e.target.value)}
        />

        <span className="heading__num-of-tasks">{tasks.length}</span>

        <Button.Default
          className="heading__more-btn"
          onClick={(e: any) => validateOpenCloseDialog(e, id)}
        >
          ...
        </Button.Default>
      </article>
      {children}
    </li>
  );
}
