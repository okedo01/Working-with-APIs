import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ReactQuery: React.FC = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: async() => {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos")
            if(!res.ok) throw new Error("Failed to fetch data");
            return res.json(); 
        }
    })

    if (error) return <div>There is an error</div>

    if (isLoading) return <div>Loading...</div>

    if (!data) return <div>No data Found</div>

    return (
        <>
            {data.map((todo: any) => (
                <div key={todo.id}>
                    <h1>{todo.name}</h1>
                </div>
            ))}
        </>
    )
}

export default ReactQuery