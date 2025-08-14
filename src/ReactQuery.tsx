import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ReactQuery: React.FC = () => {
    const { data, error, isLoading } = useQuery({queryKey: ["todos"], queryFn: () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => {
            if(!res.ok) {
                throw new Error("Failed to fetch data");
            }
            return res.json();
        })
    }})

if(error) return <div>There is an error</div>

if(isLoading) return <div>Loading...</div>

  return (
    <div>ReactQuery</div>
  )
}

export default ReactQuery