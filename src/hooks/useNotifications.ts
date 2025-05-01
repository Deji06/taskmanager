// src/hooks/useNotifications.ts
import { useEffect } from "react";
import { Todo } from "../types/todo";

export function useNotifications(todos: Todo[]) {
  useEffect(() => {
    // Ask permission once when the app loads
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();

      todos.forEach((todo) => {
        if (!todo.dueDate || todo.completed) return; // Skip if no due date or completed

        const dueDate = new Date(todo.dueDate);
        const isDueToday = dueDate.toDateString() === now.toDateString();
        const isOverdue = dueDate < now;

        if ((isDueToday || isOverdue) && Notification.permission === "granted") {
          new Notification("Task Reminder", {
            body: isDueToday
              ? `"${todo.title}" is due today!`
              : `⚠️ "${todo.title}" is overdue!`,
            icon: "/favicon.ico", // You can customize this if you want
          });
        }
      });
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [todos]);
}
