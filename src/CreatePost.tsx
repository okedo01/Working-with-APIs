import { useQuery } from '@tanstack/react-query'
import React from 'react'

const CreatePost: React.FC = () => {

  const getTodos = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");

    if(!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  }

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  })

  return (
    <main>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      { todos.map((todo: any) => (
        <div key={todo.id} className="bg-gray-400 rounded-2xl p-2 m-3">
          <h2>ID: { todo.id }</h2>
          <h2>TITLE: { todo.title }</h2>
        </div>
      ))}
    </section>
    </main>
  )
}

export default CreatePost