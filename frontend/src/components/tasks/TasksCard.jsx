import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Calendar, Edit2, Loader, Loader2, MoreVertical, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api/apiClient';
import { toast } from 'sonner';


const STATUS_CONFIG = {
    'pending': {
        variant: 'secondary',
        label: 'Pending',
        color: 'text-yellow-500'
    },
    'in_progress': {
        variant: 'default',
        label: 'In Progress',
        color: 'text-blue-500'
    },
    'completed': {
        variant: 'Outline',
        label: 'Completed',
        color: 'text-green-500'
    }

}



const TasksCard = ({ task, onEdit, onStatusChange ,onLoading = false  }) => {


    const [deleteLoading , setDeleteLoading] = useState(false);
    const [showDeleteDialog , setShowDeleteDialog] = useState(false);
    const queryClient = useQueryClient();

    const statusConfig = STATUS_CONFIG[task?.status] || STATUS_CONFIG['pending'];    

    const formatDate = ( dateString) => {
    if(!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

const Overdue = (dueDate) => {
    if(!dueDate  || task?.status === 'completed') return false;
    return new Date(dueDate) < new Date();
}

const dueDate = formatDate(task?.dueDate);
const overdue = Overdue(task?.dueDate);

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const response = await api.delete(`/tasks/delete/${task._id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            toast.success('Task deleted successfully');
        },
        onError: (error) => {
            toast.error('Failed to delete task: ' + error.message);
            console.error('Failed to delete task:', error);
        }
    })

const handleDeleteConfirm = async () => {
    try{
        await deleteMutation.mutateAsync(task._id);
        setShowDeleteDialog(false);
    }catch(error){
        console.error('Error Confirming Delete:', error);
        toast.error('Error confirming delete: ' + error.message);
    }
}
  return (
    <>
        <Card className="w-full transition-shadow hover:shadow-md">
            <CardHeader className= "pb-3">
                    <div className='flex items-start justify-between'>
                        <CardTitle className='text-lg leading-tight'>{task?.title}</CardTitle>

                        <div className='flex items-center gap-4'>
                             <Badge variant={statusConfig.variant} className={`shrink-0 bg-${statusConfig.color.replace('-', '')} ${statusConfig.color}`}>
                                {statusConfig.label}
                             </Badge>

                             {/* DropDown */}

                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0">
                                     <span className="sr-only">Open menu</span>
                                     <MoreVertical  className='h-4 w-4'/>

                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem
                                        onClick={()=> onEdit(task)}
                                    >
                                        <Edit2  className='mr-2 h-4 w-4'/>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                            onClick={() => setShowDeleteDialog(true)}
                                        >
                                        <Trash  className='mr-2 h-4 w-4'/>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>

                             </DropdownMenu>
                        </div>
                    </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Description */}
                {
                    task.description && (
                        <p className='text-sm text-muted-foreground leading-relaxed'>{task.description}</p>
                    )
                }
                {/* due Date */}
                {
                    dueDate && (
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <Calendar className='h-4 w-4 text-muted-foreground'/>
                            <span className="text-sm text-muted-foreground">Due:</span>
                            <Badge
                                variant={overdue ? 'destructive' : 'outline'}
                                className="text-xs"
                            >
                                {dueDate}
                                {overdue && ' (Overdue)'}

                            </Badge>
                        </div>
                    )
                }


                {/* simple status indicator */}

                <div className="flex items-center justify-between text-xs pt-2 border-t text-muted-foreground">
                    <span>Created at: {formatDate(task?.createdAt)}</span>
                    <span className={statusConfig.color}>
                        {statusConfig.label}
                    </span>
                </div>
            </CardContent>

        </Card>
            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>

                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the task "{task.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                        
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                        >

                            {deleteMutation.isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    Deleting...
                                </span>
                            ) : (
                                'Delete'
                            )}

                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

    </>
  )
}

export default TasksCard