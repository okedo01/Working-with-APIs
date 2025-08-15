import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Button } from './components/ui/button'

const getData = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos")
    if(!res.ok) throw new Error("Failed to fetch data")

    return res.json();
}

const ReactQuery: React.FC = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: getData,
    })

    const { mutate, isPending, isError, isSuccess } = useMutation({
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
        },
        // onSuccess: (newPost) => {
        //     QueryClient.setQueryData(["posts"], (oldPost) => [...oldPost, newPost])
        // }
    })

    if (!data) return <div>{error?.message}</div>

    if (error || isError) return <div>There is an error</div>

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            {isPending && <div>Data is being Added</div>}
            <Button className="w-full" onClick={() => {
                mutate({
                    "userId": 100,
                    "id": 200,
                    "title": "TITLE",
                    "body": "BODY"
                })
            }}>Add Post</Button >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((todo: any) => (
                    <div key={todo.id} className="bg-gray-400 rounded-2xl p-2 m-3">
                        <h1>ID: {todo.id}</h1>
                        <h3>TITLE: {todo.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReactQuery