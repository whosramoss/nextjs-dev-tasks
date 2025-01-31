"use client";

import React, { useEffect } from "react";
import { ApiTasks } from "@models/tasks";
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
        <Header title="Error" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="app">
        <Header title="Loading" />
      </div>
    );
  }

  return <Body />
}
