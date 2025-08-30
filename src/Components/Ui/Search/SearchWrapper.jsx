import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductSearch } from "../../../Hooks/useProducts";
import { useRecentSearches } from "../../../Store/useRecentSearches";

import Search from "./Search";
import SearchDialog from "./SearchDialog";

function SearchWrapper({ mode, onSearch }) {
  const [query, setQuery] = useState("");
  const { data: products = [] } = useProductSearch(query + "&limit=5");
  const setRecentSearches = useRecentSearches((s) => s.setRecentSearches);
  const navigate = useNavigate();

  function clearQuery() {
    // deleteFilter("q");
  }

  if (mode === "modal")
    return (
      <SearchDialog
        results={products}
        onInput={(value) => setQuery("q=" + value)}
        onSearch={(query) => {
          setRecentSearches(query);
          navigate(`/results?q=${query}`);
        }}
        onClear={clearQuery}
      />
    );

  return (
    <Search
      enableDropdown
      results={products}
      onInput={(value) => setQuery("q=" + value)}
      onSearch={(query) => {
        if (mode === "inline") return onSearch(query);
        setRecentSearches(query);
        navigate(`/results?q=${query}`);
      }}
      onClear={clearQuery}
    />
  );
}

export default SearchWrapper;
