import { useQuery } from '@tanstack/react-query'
import React, { useState, type ChangeEvent } from 'react'
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const CreatePost: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const getTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  }

  const { data: todos, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  })

  if(error) return <div>Error: {error.message}</div>

  if(isLoading) return <div>Loading...</div>

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <Input type="text" onChange={handleSearchInput} />
        <Button value="Submit"/>
      </form>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {todos.map((todo: any) => (
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