import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import api from '../../lib/api/apiClient'
import { extractErrorMessage } from '@/util/errorUtils'
import toast from 'react-hot-toast'
import axios from 'axios'
import { create } from 'zustand'
import useAuthStore from '@/lib/store/authStore'

const TASK_STATUSES = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In_Progress' },
    { value: 'completed', label: 'Completed' }
];


const TaskForm = ({ task, open = true, onOpenChange }) => {


    // State for form values

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
    })
    
    const [validationError, setValidationError] = useState(null)

    const {token} = useAuthStore()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }


    const handleStatusChange = (value) => {

        setFormValues({
            ...formValues,
            status: value
        })

    }

    const handleCancel = () => {
        onOpenChange?.(false)
    }

    // create mutation
    const createMutation = useMutation ({
        mutationFn: async(taskData) => {
            const response = await api.post('/tasks/create', taskData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response;
        },
        onSuccess: (data) => {
            console.log("Task created successfully:", data)
        },
        onError: (error) => {
            console.error("Error creating Task, Try again", error)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formValues.title) {
            setValidationError('Title is Required');
            return ;
        }

        const taskData =   {
            title: formValues.title.trim(),
            description: formValues.description.trim() || '',
            status: formValues.status,
            dueDate: formValues.dueDate ? new Date(formValues.dueDate).toISOString() : null
        }

        createMutation.mutate(taskData)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Create New Task
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Fill in the details below to create a new task.
                    </DialogDescription>
                </DialogHeader>

                {/* inputs */}

                <form  onSubmit={handleSubmit} className="space-y-6">

                    {/* {displayError && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {displayError}
                        </div>
                    )} */}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formValues.title}
                            onChange={handleInputChange}
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            type="text"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="Enter task description"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Select
                            value={formValues.status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {TASK_STATUSES.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={formValues.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <DialogFooter className="flex justify-end space-x-2">

                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="outline" >
                            submit
                        </Button>


                        {/* <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    {task ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                task ? 'Update Task' : 'Create Task'
                            )}
                        </Button> */}

                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TaskForm