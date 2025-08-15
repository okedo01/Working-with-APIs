import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

type Posts = {
  title: string,
  body: string
}

const CreatePost: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const getTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  }

  const fetchTodos = async (newPost: Posts) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newPost)
    })

    if (!res.ok) throw new Error("Failed to fetch Data");

    return res.json();
  }

  const { data: todos, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  })

  const { mutate, isError, isPending } = useMutation({
    mutationFn: fetchTodos
  })

  const filterTodos = todos?.filter((todo: any) => {
    return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
  })

  if (error || isError) return <div>Error: {error?.message}</div>

  if (isLoading) return <div>Loading...</div>

  return (
    <main>
      {isPending && <div>Pending...</div>}
      <form onSubmit={handleSubmit}>
        <Input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <Button type='submit' className="mt-4 cursor-pointer" onClick={() => {
          mutate({
            title: searchTerm,
            body: "This is body",
          })
        }}>Add Post</Button>
      </form>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filterTodos?.map((todo: any) => (
          <div key={todo.id} className="bg-gray-400 rounded-2xl p-2 m-3">
            <h2>ID: {todo.id}</h2>
            <h2>TITLE: {todo.title}</h2>
          </div>
        ))}
      </section>
    </main>
  )
}

export default CreatePost