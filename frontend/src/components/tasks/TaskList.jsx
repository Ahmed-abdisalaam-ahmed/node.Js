import { ClipboardCheck, ClipboardList, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Tabs ,TabsContent,TabsList, TabsTrigger} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Task from '@/Task';
import TasksCard from './TasksCard';


const TaskList = ({tasks = [], isLoading = false, onEdit , onStatusChange }) => {
    const [SearchTerm, setSearchTerm] = useState("");

    const getTaskStats = () => {

      const AllTasksByStatus = {
        pending : tasks.filter(task => task.status === 'pending').length,
        inProgress : tasks.filter(task => task.status === 'in_progress').length,
        completed :tasks.filter(task => task.status === 'completed').length
      }
      const categorizedTasks = {
        all: tasks,
        pending: tasks.filter(task => task.status === 'pending'),
        inProgress: tasks.filter(task => task.status === 'in_progress'),
        completed: tasks.filter(task => task.status === 'completed')
      }

      const stats = {
        total: tasks.length,
        pending: AllTasksByStatus.pending,
        inProgress: AllTasksByStatus.inProgress,
        completed: AllTasksByStatus.completed
      }

      const total = tasks.length;

      return { total, stats, categorizedTasks};
    }

    const {stats, categorizedTasks, total} = getTaskStats();
  const TaskGrid = ({ tasks, emptyMessage }) => {
    if (tasks.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-sm font-medium text-foreground">
              No tasks found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            tasks.map(task => (
                <TasksCard
                  key={task._id}
                  task={task}
                  onEdit={onEdit}
                  onStatusChange={onStatusChange}
                />
            ))
          }
      </div>
    )
  };

  return (
    <div className='space-y-6'>
      {/* Stats Overview  */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>

        <div className="bg-card p-4 rounded-lg shadow-sm border">
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-muted-foreground'>Total</p>
            <ClipboardList className='text-muted-foreground h-4 w-4'/>
          </div>
            <p className='text-2xl font-bold'>{stats.total}</p>
        </div>
        
        <div className="bg-card p-4 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.pending}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border shadow-sm"> 
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">In-Progress</p>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>  
      </div>
      {/* Search input */}
      <div className="flex items-center gap-4">
        <div className='relative flex-1 max-w-md'>
          <Search  className='absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2'/>

          <Input 
            type="text"
            placeholder='Search tasks...'
            className='pl-8'
            value={SearchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="account" className="w-full">

        <TabsList className="grid w-full grid-cols-4">

          <TabsTrigger value="all" className="flex items-center gap-2">All
            <Badge variant='primary'>{stats.total}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">Pending
            <Badge variant='primary'>{stats.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inProgress" className="flex items-center gap-2">In-Progress
            <Badge variant='primary'>{stats.inProgress}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">Completed
            <Badge variant='primary'>{stats.completed}</Badge>
          </TabsTrigger>


        </TabsList>

          <TabsContent value="all">
            <TaskGrid tasks={categorizedTasks.all} 
            emptyMessage="No tasks found. Create your first task!" 
            />
          </TabsContent>
          <TabsContent value="pending">
            <TaskGrid tasks={categorizedTasks.pending}
            emptyMessage="No pending tasks. Great job!" 
            />
          </TabsContent>
          <TabsContent value="inProgress">
            <TaskGrid tasks={categorizedTasks.inProgress}
            emptyMessage="No tasks in progress. Time to start a new task!" 
            />
          </TabsContent>
          <TabsContent value="completed">
            <TaskGrid tasks={categorizedTasks.completed}
            emptyMessage="No completed tasks yet. Keep up the good work!" 
            />
          </TabsContent>
      </Tabs>


    </div>
  )
}

export default TaskList