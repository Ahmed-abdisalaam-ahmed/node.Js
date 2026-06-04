import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import TasksCard from "@/components/tasks/TasksCard";
import api from "@/lib/api/apiClient";
import Task from "@/Task";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";

const DashboardPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleForClose = () => {
    setShowCreateForm(false);
    setEditingTask(null);
  };
  const handleCreateTaskClick = () => {
    setShowCreateForm(true);
  };

  const taskQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get("/tasks/get");
      return response.data;
    },
    retry: 1,
  });

  console.log("Tasks Data", taskQuery.data);

  console.log("Tasks Query error", taskQuery.error);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowCreateForm(true);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    // Toto: MUTATION UPDATE TASK STATUS
    // 1. Make API call to update task status
    // 2. Refetch tasks after successful update
    // 3. Handle loading and error states as needed
    // Example:
    // try {
    //   await api.put(`/tasks/update/${taskId}`, { status: newStatus });
    //   taskQuery.refetch(); // Refetch tasks after updating status
    // } catch (error) {
    //   console.error('Failed to update task status:', error);
    // }
  };
  if (taskQuery.isLoading) {
    return (
      <div className="flex h-screen  items-center justify-center">
        <Loader className=" animate-spin" />
      </div>
    );
  }
  if (taskQuery.isError) {
    return (
      <div className="flex h-screen  items-center justify-center">
        <p className="text-red-500">
          Error Loading tasks: ${taskQuery.error.message}
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <DashboardHeader />

      {/* main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* welcome Section */}
        <DashboardWelcome
          showCreateForm={showCreateForm}
          onCreateTask={handleCreateTaskClick}
        />

        {/* Tasks Section */}
        <div>
          <TaskList
            tasks={taskQuery.data || []}
            isLoading={taskQuery.isLoading}
            onEdit={handleEditTask}
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>

      {/* task Dialog form*/}
      <TaskForm
        task={editingTask}
        open={showCreateForm || !!editingTask}
        onOpenChange={handleForClose}
      />
    </div>
  );
};

export default DashboardPage;
