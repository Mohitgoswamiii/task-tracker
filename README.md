# Task Tracker

Task Tracker is a web application that helps users manage their tasks efficiently. It features user authentication via Supabase, an interactive dashboard that displays task statistics, and a comprehensive task management system. Users can create, update, delete, search, and filter tasks, and the application supports both light and dark modes.

## Features

- **User Authentication:**  
  Sign up, sign in, and profile management are handled by Supabase.

- **Dashboard:**  
  View task statistics including Total Tasks, Completed Tasks, Pending Tasks, and Tasks In Progress.

- **Task Management:**  
  Create new tasks, edit existing tasks inline, update task status via a dropdown, and delete tasks.

- **Search & Filter:**  
  Quickly search for tasks by title and filter tasks by status.

- **Dark Mode Support:**  
  The UI adapts to both light and dark themes based on user preference or system settings.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Running Locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Mohitgoswamiii/task-tracker.git
   cd task-tracker
2. Install Dependencies:
   
    npm install
    # or
    yarn install

3. Set Up Environment Variables:

  Create a .env.local file in the root directory and add:

  NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
  Replace your-supabase-project-url and your-supabase-anon-key with your actual Supabase project credentials.

4.Run the Development Server:

  npm run dev
  # or
  yarn dev

  
Project Functionality Overview
Dashboard & Statistics:
The dashboard provides an overview of your task data:

Total Tasks: Total number of tasks.

Completed Tasks: Number of tasks marked as "Completed".

Pending Tasks: Number of tasks marked as "Pending".

Tasks In Progress: Number of tasks marked as "In Progress".

Task List:
The main interface displays a list of tasks that belong to the logged-in user. Each task card allows you to:

Edit: Update the task title and description inline.

Update Status: Change the task status using a dropdown (located in the top-right corner of the card).

Delete: Remove the task from the list.

Create Task:
A toggleable form enables you to add new tasks. New tasks are created with a default status of "Pending" and appear immediately in the task list after creation.

Search & Filter:
A search bar allows you to filter tasks by title (case-insensitive), and a dropdown filter lets you select tasks by their status (All, Pending, In Progress, Completed).

Dark Mode:
The UI supports both light and dark themes. By default, the application runs in light mode (white background with dark text). When dark mode is enabled (via user settings or system preferences), the UI switches to a dark theme.

Deployment
This application is configured for deployment on Vercel. Make sure to set the required environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) in your Vercel project settings.
