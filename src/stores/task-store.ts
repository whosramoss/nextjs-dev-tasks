
import { Task, TaskList } from "@models/tasks";
import { create } from "zustand";

interface StoreList {
  lists: TaskList[];
}

interface ITaskStore {
  lists: TaskList[];
  isSorted: boolean;

  onAddList: (newList: TaskList) => void;
  onAddTaskItem: (listId: number, newTaskItem: Task) => void;
  onEditTask: (listId: number, taskId: number, newTaskContent: string) => void;
  onDeleteTaskItem: (listId: number, taskId: number) => void;
  onMarkDoneTask: (listId: number, taskId: number) => void;
  onDeleteList: (listId: number) => void;
  onEditListTitle: (listId: number, newTitle: string) => void;
  onSortItems: () => void;
}

export const useTaskStore = create<ITaskStore>((set) => ({
  lists: [],
  isSorted: false,

  onAddList: (newList: TaskList) =>
    set((state: StoreList) => ({ lists: [...state.lists, newList] })),
  onAddTaskItem: (listId: number, newTaskItem: Task) =>
    set((state: StoreList) => {
      const newLists = state.lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTaskItem] }
          : list,
      );
      return { lists: newLists };
    }),
  onEditTask: (listId: number, taskId: number, newTaskContent: string) =>
    set((state: StoreList) => {
      const newLists = state.lists.map((list) => {
        if (list.id === listId) {
          const newTasks = list.tasks.map((task) =>
            task.id === taskId ? { ...task, content: newTaskContent } : task,
          );
          return { ...list, tasks: newTasks };
        }
        return list;
      });
      return { lists: newLists };
    }),
  onDeleteTaskItem: (listId: number, taskId: number) =>
    set((state: StoreList) => {
      const newLists = state.lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== taskId),
          };
        }
        return list;
      });
      return { lists: newLists };
    }),
  onMarkDoneTask: (listId: number, taskId: number) =>
    set((state: StoreList) => {
      const newLists = state.lists.map((list) => {
        if (list.id === listId) {
          const newTasks = list.tasks.map((task) =>
            task.id === taskId ? { ...task, isDone: !task.isDone } : task,
          );
          return { ...list, tasks: newTasks };
        }
        return list;
      });
      return { lists: newLists };
    }),
  onDeleteList: (listId: number) =>
    set((state: StoreList) => {
      const newLists = state.lists.filter((list) => list.id !== listId);
      return { lists: newLists };
    }),
  onEditListTitle: (listId: number, newTitle: string) =>
    set((state: StoreList) => {
      const newLists = state.lists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list,
      );
      return { lists: newLists };
    }),
  onSortItems: () =>
    set((state: { isSorted: boolean }) => ({ isSorted: !state.isSorted })),
}));
