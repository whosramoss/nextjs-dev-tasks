"use state";
import { useTaskStore } from "src/stores/task-store";
import { cn, ICommons, createNewId } from "@utils/utils";

interface IButtonAdd extends ICommons {
  groupId?: number;
  isOpen: boolean;
}

export default function ButtonAdd({
  className,
  children,
  groupId = 0,
  isOpen,
}: IButtonAdd) {
  const onAddTaskItem = useTaskStore((state) => state.onAddTaskItem);

  const onClick = () => {
    const newTask = { id: createNewId(), content: "", isDone: false };
    onAddTaskItem && onAddTaskItem(groupId, newTask);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "button title button--add",
        { "hidden--list hidden": !isOpen },
        className,
      )}
    >
      <svg
        className="button--add__icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>plus</title>
        <path d="M18 10h-4v-4c0-1.104-0.896-2-2-2s-2 0.896-2 2l0.071 4h-4.071c-1.104 0-2 0.896-2 2s0.896 2 2 2l4.071-0.071-0.071 4.071c0 1.104 0.896 2 2 2s2-0.896 2-2v-4.071l4 0.071c1.104 0 2-0.896 2-2s-0.896-2-2-2z"></path>
      </svg>
      {children}
    </button>
  );
}
