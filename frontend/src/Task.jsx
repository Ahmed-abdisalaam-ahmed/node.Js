import { shouldThrowError, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'

async function createTodo(newTask) {
    const response = await fetch('http://localhost:5000/api/tasks/create', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTask)
    })
    if(!response) throw new Error("Failed to create todo")
    return response.json();
}

const Task = () => {
    const [task, setTask] = useState("")

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey : ['tasks'] })
        }
    })


    const handleAdd = () => {
        mutation.mutate({title: task, completed: false})
    } 
  return (
    <div>
        <Input variant={"defualt"} type="text" onChange={(e)=> setTask(e.target.value)} />
        <Button onClick={handleAdd}>Add Task</Button>
    </div>
  )
}

export default Task