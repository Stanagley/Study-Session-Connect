import React, { useState } from 'react';

function SearchBar({ onSearch, query, onInputChange, querySuggestions, showSuggestions }) {
    const handleSearch = () => {
        if (query.trim() !== '') {
            onSearch(query);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        onSearch(suggestion);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={onInputChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
            {showSuggestions && querySuggestions.length > 0 && (
                <ul className="suggestions">
                    {querySuggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
