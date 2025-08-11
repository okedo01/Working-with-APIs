import React, { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';
import type { User } from './Type';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from './components/ui/input';

const SearchField: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500); // ⏳

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        if (!res.ok) throw new Error("Failed to Load Resource");
        return res.json();
      })
      .then(data => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Run filtering ONLY when debounced value changes
  useEffect(() => {
    const filtered = data.filter(user =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredData(filtered);
  }, [debouncedSearch, data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
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
