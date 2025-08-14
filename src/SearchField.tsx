import React, { useEffect, useState, useCallback } from 'react';
import type { User } from './Type';
import debounce from 'lodash.debounce';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from './components/ui/input';

const SearchField: React.FC = () => {
    const [data, setData] = useState<User[]>([]);
    const [filteredData, setFilteredData] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to Load Resource");
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setFilteredData(data); // initially all data
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // The actual search function
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        if (!value.trim()) {
            setFilteredData(data);
            return;
        }
        const results = data.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(results);
    };

    // Debounced version
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            handleSearch(value);
        }, 500),
        [data]
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Input
                placeholder="Search..."
                defaultValue={searchTerm}
                onChange={(event) => debouncedSearch(event.target.value)}
                className="mb-5"
            />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {filteredData.map(value => (
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
    );
};

export default SearchField;
