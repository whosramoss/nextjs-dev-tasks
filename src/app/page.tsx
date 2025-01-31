"use client";

import React, { useEffect } from "react";
import { ApiTasks, TaskList } from "@models/tasks";
import Body from "@app/_components/body";
import { useApiFetchFromQuery } from "@hooks/useApiFetchFromQuery";
import Header from "@app/_components/header";
import { useTaskStore } from "src/stores/task-store";


export default function Content() {
  const { data, isLoading, error } = useApiFetchFromQuery<ApiTasks>({
    url: '/api/tasks',
    key: "tasks",
  });

  const { onAddList } = useTaskStore((state) => state);

  useEffect(() => {
    if (data?.data) {
      data?.data.map(onAddList);
    }
  }, [data])


  if (error) {
    return (
      <div className="app">
        <Header />
        <h2 className="py-20 text-xl font-bold">
          Error
        </h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="app">
        <Header />
        <h2 className="py-20 text-xl font-bold">
          Loading
        </h2>
      </div>
    );
  }


  return <Body />

}
