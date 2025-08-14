import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'

const ReactQuery: React.FC = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos")
            if (!res.ok) throw new Error("Failed to fetch data");
            return res.json();
        }
    })

    const { mutate } = useMutation({
        mutationFn: async (newPost: any) => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(newPost)
            })
            if (!res.ok) throw new Error("Failed to fetch data");

            return res.json();
        }
    })

    if (!data) return <div>No data Found</div>

    if (error) return <div>There is an error</div>

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <button onClick={() => {
                mutate({
                    "userId": 100,
                    "id": 200,
                    "title": "TITLE",
                    "body": "BODY"
                })
            }}>Add Post</button >
            <div>
                {data.map((todo: any) => (
                    <div key={todo.id}>
                        <h1>ID: {todo.id}</h1>
                        <h3>TITLE: {todo.title}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ReactQuery