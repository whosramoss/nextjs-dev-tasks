import { useTaskStore } from "src/stores/task-store";
import { Task } from "@models/tasks";

interface IButtonTask {
  groupId: number;
  task: Task;
}

export default function ButtonTask({ task, groupId }: IButtonTask) {
  const onMarkDoneTask = useTaskStore((state) => state.onMarkDoneTask);
  return (
    <button
      onClick={() => onMarkDoneTask(groupId, task.id)}
      className="button task_group__btn"
    >
      <svg
        className={`${
          task.isDone ? "task_group__icon--done" : "task_group__icon"
        }`}
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          className="task_group__icon__body"
          cx="18.7896"
          cy="19.4718"
          rx="18.593"
          ry="18.5094"
        />
        <rect
          className="task_group__icon__small-rect"
          x="9.92926"
          y="20.0665"
          width="3.01765"
          height="9.18782"
          rx="0.3"
          transform="rotate(-45 9.92926 20.0665)"
        />
        <rect
          className="task_group__icon__large-rect"
          x="16.15"
          y="3.5"
          width="3.01765"
          height="16.18782"
          rx="0.3"
          transform="rotate(45 9.92926 20.0665)"
        />
      </svg>
    </button>
  );
}
