import { useQuery } from '@tanstack/react-query'
import './App.css'

function App() {
  const { data } = useQuery({
    queryKey: ['todo'], queryFn: () => fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch resources");
        }
        return res.json();
      })
  })
  return (
    <div className="bg-gray-400">
      {data.map((todo: any) => (
        <div>
          <h1>ID: {todo.id}</h1>
          <h1>TITLE: {todo.title}</h1>
          <h1>{todo.id}</h1>
        </div>
      ))}
    </div>
  )
}

export default App
