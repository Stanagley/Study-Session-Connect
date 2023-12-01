// Importing React library and the useState hook
import React, { useState } from 'react';

// Functional component for the SearchBar
function SearchBar({ onSearch, query, onInputChange, querySuggestions, showSuggestions }) {
    // Function to handle the search action
    const handleSearch = () => {
        if (query.trim() !== '') {
            onSearch(query);
        }
    };

    // Function to handle key press events, triggering search on 'Enter'
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // Function to handle suggestion clicks, triggering search with the selected suggestion
    const handleSuggestionClick = (suggestion) => {
        onSearch(suggestion);
    };

    // JSX structure for rendering the SearchBar component
    return (
        <div className="search-bar">
            {/* Input field for entering search query */}
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={onInputChange}
                onKeyPress={handleKeyPress}
            />

            {/* Button to initiate the search */}
            <button onClick={handleSearch}>Search</button>

            {/* Display suggestions if showSuggestions is true and there are suggestions available */}
            {showSuggestions && querySuggestions.length > 0 && (
                <ul className="suggestions">
                    {/* Mapping through suggestions and displaying each one */}
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

// Exporting the SearchBar component as the default export
export default SearchBar;
