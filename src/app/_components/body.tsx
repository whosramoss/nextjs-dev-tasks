"use client";

import React, { useEffect } from "react";
import { FadeIn } from "@ui/fade-in";
import { useTaskStore } from "src/stores/task-store";
import useDialog from "@hooks/useDialog";
import { cn } from "@utils/utils";
import { Button } from "@ui/buttons";
import { Task } from "@ui/task";
import Header from "@app/_components/header";

export default function Body() {
  const dialog = useDialog();

  const { lists, isSorted } = useTaskStore((state) => state);


  const sortTaskLists = () => {
    if (!isSorted) return lists;
    return [...lists].sort((e1, e2) =>
      e1.title.toLowerCase() > e2.title.toLowerCase() ? 1 : -1,
    );
  };



  return (
    <div className="app">
      <FadeIn.Root>
        <FadeIn.Item>
          <Header >
            <Button.Sort />
          </Header>
          <main className="main my-12">
            <Task.Form />
            {lists.length ? (
              <ul className="lists title">
                {sortTaskLists().map((group) => {
                  const isCurrentId = dialog.openedList === group.id;
                  return (
                    <Task.Group key={group.id} group={group} {...dialog}>
                      <ul
                        className={cn("task_group", {
                          "hidden--list hidden": !isCurrentId,
                        })}
                      >
                        {group.tasks.map((task) => (
                          <Task.Item
                            key={task.id}
                            groupId={group.id}
                            task={task}
                          />
                        ))}
                      </ul>

                      <Button.Add
                        isOpen={isCurrentId}
                        className="add-list-item"
                        groupId={group.id}
                      >
                        New Task
                      </Button.Add>
                    </Task.Group>
                  );
                })}
              </ul>
            ) : (
              <EmptyList />
            )}
          </main>
        </FadeIn.Item>
      </FadeIn.Root>
    </div>
  );
}

function EmptyList() {
  return (
    <p className="title empty-list">The list is empty, add some to-do :)</p>
  );
}
