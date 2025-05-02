# Outlook-Style Todo App (Internship Technical Test)

This is a fully functional **Todo Application** built with **React** and **TypeScript**, developed for the Internship Technical Test challenge.

Inspired by the Outlook email task interface, the app lets users manage tasks with features like **priority sorting**, **due dates with notifications**, and **local storage persistence**.

---

## 🚀 Features Implemented

- ✅ **Add, Edit, and Delete** tasks
- ✅ **Mark tasks as Completed / Incomplete**
- ✅ **Search and Filter** tasks by name and status
- ✅ **Priority Sorting** (High > Medium > Low)
- ✅ **Due Dates** for each task
- ✅ **Browser Notifications** for upcoming tasks
- ✅ **Persistent Storage** using `localStorage`
- ✅ **Reusable Components** with TypeScript props
- ✅ Fully typed with **TypeScript** interfaces

---

## 📂 Folder Structure

-- src
|
components->AddTodo.tsx-EditTask.tsx-Filters.tsx-TodoItems.tsx-TodoList.tsx-UserAuth.tsx
|
hooks -> useNotifications.ts
|
types -> todo.ts
|
App.tsx
---

## 📦 Tech Stack

- **React + TypeScript**
- **Fluent UI Icons** (`@fluentui/react-icons`)
- **UUID** (`uuid`) — for unique task IDs
- **LocalStorage** — for persisting tasks across sessions
- **Browser Notifications API** — for reminders

---

## 🔥 How to Run the Project

Follow these steps to clone and run locally:

1. **Clone this repository**
   ```bash
   git clone https://github.com/Deji06/taskmanager.git
   cd taskmanager

#install dependencies
--  npm install
#start the development server
--  npm start

Author
Deji Olawuni

🌟 Acknowledgements
This app was built as part of the Internship Technical Test and is inspired by the task interface in Outlook.

