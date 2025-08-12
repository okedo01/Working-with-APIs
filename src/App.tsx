import { useQuery, useMutation } from '@tanstack/react-query'
import './App.css'

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todo'], queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch resources");
        }
        return res.json();
      })
      .catch(err => {
        console.log(err.message);
      })
  })

  const { mutate } = useMutation({mutationFn: (newPost: any) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost)
    }).then(res => {
      res.json();
    })
  }})

  if (error) return <div>There was an error</div>

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <button className="bg-gray-400 px-4 py-2 rounded text-gray-600 cursor-pointer hover:text-gray-900">Add Post</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((todo: any) => (
          <div className="bg-gray-400 rounded-2xl p-2 m-3" key={todo.id}>
            <h1>ID: {todo.id}</h1>
            <h3>TITLE: {todo.title}</h3>
            <p className="py-4 text-gray-600">{todo.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
