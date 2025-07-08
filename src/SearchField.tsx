import React, { useEffect, useState } from 'react'
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


const SearchField: React.FC = () => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

    if (!loading) <div>Loading...</div>

    if (!error) <div>Error: {error}</div>

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
            {data.map(value => (
                <Card key={value.id}>
                    <CardHeader>
                        <CardTitle>{ value.name}</CardTitle>
                        <CardDescription>{ value.website }</CardDescription>
                        <CardAction>{ value.company.name }</CardAction>
                    </CardHeader>
                    <CardContent>
                        <p>{ value.email }</p>
                    </CardContent>
                    <CardFooter>
                        <p>{ value.address.city }</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default SearchField