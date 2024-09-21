import { useState } from 'react';
import "./Search.css";

const Search = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(inputValue);
        console.log('Form submitted, searching for:', inputValue); 
        setInputValue(''); 
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) =>{
                        console.log('Current input:', e.target.value); 
                        setInputValue(e.target.value)}
                    } 
                    placeholder="Enter city name" 
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;
