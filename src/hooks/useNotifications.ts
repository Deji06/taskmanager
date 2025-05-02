import { useEffect } from "react";
import { Todo } from "../types/todo";

export function useNotifications(todos: Todo[]) {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();

      todos.forEach((todo) => {
        if (!todo.dueDate || todo.completed) return; 

        const dueDate = new Date(todo.dueDate);
        const isDueToday = dueDate.toDateString() === now.toDateString();
        const isOverdue = dueDate < now;

        if ((isDueToday || isOverdue) && Notification.permission === "granted") {
          new Notification("Task Reminder", {
            body: isDueToday
              ? `"${todo.title}" is due today!`
              : `⚠️ "${todo.title}" is overdue!`,
            icon: "/favicon.ico",
          });
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);
}
