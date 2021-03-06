import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = useCallback((newTaskTitle: string) => {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((state) => [...state, newTask]);
  }, []);

  const handleToggleTaskDone = useCallback(
    (id: number) => {
      const updatedTasks = tasks.map((task) => ({ ...task }));

      const hasTask = updatedTasks.find((task) => task.id === id);

      if (hasTask) {
        hasTask.done = !hasTask.done;

        setTasks(updatedTasks);
      }
    },
    [tasks]
  );

  const handleRemoveTask = useCallback((id: number) => {
    setTasks((state) => state.filter((task) => task.id !== id));
  }, []);

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
