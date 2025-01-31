"use client";

import { useState } from "react";
import { useTaskStore } from "src/stores/task-store";
import { Task } from "@models/tasks";
import { Button } from "@ui/buttons";

interface ITaskItem {
  task: Task;
  groupId: number;
}

export default function TaskItem({ task, groupId }: ITaskItem) {
  const { onEditTask, onDeleteTaskItem } = useTaskStore((state) => state);
  const [todoContent, setTaskContent] = useState<string>(task.content);
  const [isDeleteAnimation, setIsDeleteAnimation] = useState<boolean>(false);

  function onDeleteTaskAfterAnimation(
    e: React.AnimationEvent<HTMLLIElement>,
  ): void {
    if (e.nativeEvent.animationName.trim() === "to-do-deleted")
      onDeleteTaskItem(groupId, task.id);
  }

  return (
    <li
      onAnimationEnd={onDeleteTaskAfterAnimation}
      className={`task_group__item ${
        isDeleteAnimation ? "task_group__item--deleted" : ""
      }`}
    >
      <Button.Task task={task} groupId={groupId} />

      <span
        className={`task_group__item__content ${task.isDone ? "strike" : ""}`}
      >
        {todoContent}
      </span>

      <input
        style={{ width: `${todoContent.length || 13}ch` }}
        placeholder="Write some task..."
        onBlur={() => onEditTask(groupId, task.id, todoContent)}
        onChange={(e) => setTaskContent(e.target.value)}
        value={todoContent}
        className="task_group__item__edit input-placeholder"
        type="text"
      />

      <Button.Default
        className="task_group__item__delete"
        onClick={() => setIsDeleteAnimation(!isDeleteAnimation)}
      >
        -
      </Button.Default>
    </li>
  );
}
