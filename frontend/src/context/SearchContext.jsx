import React, { createContext, useState, useContext } from 'react';

// Create a Context for the search state
const SearchContext = createContext();

export const useSearch = () => {
	return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const openSearch = () => setIsSearchOpen(true);
	const closeSearch = () => setIsSearchOpen(false);
	const toggleSearch = () => setIsSearchOpen((prev) => !prev);

	return (
		<SearchContext.Provider
			value={{ isSearchOpen, openSearch, closeSearch, toggleSearch }}
		>
			{children}
		</SearchContext.Provider>
	);
};
