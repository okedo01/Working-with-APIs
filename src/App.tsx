import { useQuery } from '@tanstack/react-query'
import './App.css'

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todo'], queryFn: () => fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch resources");
        }
        return res.json();
      })
  })

  if(error) return <div>There was an error</div>

  if(isLoading) return <div>Loading...</div>

  return (
    <>
      {data.map((todo: any) => (
        <div className="bg-gray-400 rounded-2xl p-2 m-3 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-1" key={todo.id}>
          <h1>ID: {todo.id}</h1>
          <h1>TITLE: {todo.title}</h1>
        </div>
      ))}
    </>
  )
}

export default App
