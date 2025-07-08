import React, { useEffect, useState } from 'react'
// import { Input } from './components/ui/input'
import type { User } from './Type';


const SearchField: React.FC = () => {
    const [ data, setData ] = useState<User[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(true);
    
    if(!loading) <div>Loading...</div>
    
    if(!error) <div>Error: { error }</div>

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if(!response.ok) {
                    throw new Error("Failed to fetch");
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }, [])

  return (
    <div>
        {/* <Input placeholder="Search..."/> */}
            { data.map((item) => (
                <li key={item.id}>
                    <p>
                        { item.name }
                    </p>
                </li>
            ))}
    </div>
  )
}

export default SearchField