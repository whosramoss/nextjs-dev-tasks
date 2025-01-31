import { z } from "zod";

export const STask = z.object({
  id: z.number(),
  isDone: z.boolean(),
  content: z.string(),
});

export const STaskList = z.object({
  id: z.number(),
  title: z.string(),
  tasks: z.array(STask),
});

export const SApiTasks = z.object({
  data: z.array(STaskList),
});

export type Task = z.infer<typeof STask>;
export type TaskList = z.infer<typeof STaskList>;
export type ApiTasks = z.infer<typeof SApiTasks>;