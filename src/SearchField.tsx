import React, { useEffect, useState } from 'react';
import type { User } from './Type';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './components/ui/input';

const SearchField: React.FC = () => {
    const [data, setData] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    if (!loading) <div>Loading...</div>

    if (!error) <div>Error: {error}</div>

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if (!response.ok) {
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
            <Input placeholder="Search..." onChange={handleSearch} value={searchTerm} className="mb-5" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {data.map(value => (
                    <Card key={value.id}>
                        <CardHeader>
                            <CardTitle>{value.name}</CardTitle>
                            <CardDescription>{value.website}</CardDescription>
                            <CardAction>{value.company.name}</CardAction>
                        </CardHeader>
                        <CardContent>
                            <p>{value.email}</p>
                        </CardContent>
                        <CardFooter>
                            <p>{value.address.city}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SearchField