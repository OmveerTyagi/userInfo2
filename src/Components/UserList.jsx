import React, { useState, useEffect } from 'react';
import './UserList.css';

const UserList = () => {
    let h = JSON.parse(localStorage.getItem('searchHistory'))
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(h[(h?.length-1)]||'');
    const [searchHistory, setSearchHistory] = useState(
        JSON.parse(localStorage.getItem('searchHistory')) || []
    );
    const [sorted, setSorted] = useState(false);

    useEffect(() => {
        FetchUsers();
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => response.json())
        //     .then(data => setUsers(data));
    }, []);

    const FetchUsers = async () =>{
        const user = await fetch('https://jsonplaceholder.typicode.com/users');
        const json = await user.json();
        console.log(json);
        setUsers(json);
    }

    useEffect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const addSearchTerm = () => {
        if (searchTerm && !searchHistory.includes(searchTerm)) {
            setSearchHistory([...searchHistory, searchTerm]);
        }
       
    };

     

    const toggleSort = () => {
        setSorted(!sorted);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const removeSearchTerm = (index) => {
        const newSearchHistory = [...searchHistory];
        newSearchHistory.splice(index, 1);
        setSearchHistory(newSearchHistory);
    };

    const sortedUsers = sorted
        ? [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name))
        : filteredUsers;

    return (
        <div className="user-list-container">
            <h1>User Info</h1>
            <div className="controls">
                <input
                    className='searcharea'
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name"
                />
                <button className='searchbtn ' onClick={addSearchTerm}>Search</button>
                 
                <button className='sortbtn' onClick={toggleSort}>Sort by Name</button>
            </div>
            <div className="search-history">
                
                
                    {searchHistory.map((term, index) => (
                        
                            <div  key={index} className='history'> 
                        
                           <p onClick={()=>setSearchTerm(term)} className='searchItem'>{term}</p>
                            <button onClick={() => removeSearchTerm(index)}>❌</button>
                         
                        </div>
                    ))}
                
            </div>
            <ul className="user-list">
                {sortedUsers.map(user => (
                    <li key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
