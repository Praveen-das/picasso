import { Box, IconButton } from "@mui/material";
import { Search as SearchIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import Card from "../Card";
import "./search.css";
import SearchResults from "./SearchResults";

function Search({
  onInput = () => null,
  onSearch,
  onClear = () => null,
  results = [],
  placeholder = "Search for Paintings",
  enableDropdown = false,
}) {
  const [query, setQuery] = useState("");
  const [dropdown, toggleDropdown] = useState(false);

  const input = useRef();
  const timer = useRef;

  const handleSearch = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") return handleQuery();

    clearTimeout(timer.current);
    setQuery(e.target.value);

    timer.current = setTimeout(() => {
      onInput(e.target.value);
    }, 300);
  };

  const handleQuery = () => {
    if (query !== "") {
      if (onSearch) {
        onSearch(query);
        clearQuery();
      }
      return;
    }
  };

  function clearQuery() {
    setQuery("");
    toggleDropdown(false);

    input.current.blur();
    input.current.blur();
  }

  function handleClearingQuery() {
    onClear();
    clearQuery();
  }

  return (
    <>
      <Box sx={{ overflow: "visible" }} id="search_wrapper">
        <Box id="searchbox_wrapper">
          <Box p={0.75} display="flex">
            <SearchIcon size={20} />
          </Box>
          <input
            onFocus={() => toggleDropdown(true)}
            id="searchbox"
            type="text"
            autoComplete="off"
            onInput={(e) => handleSearch(e)}
            onKeyUp={(e) => handleSearch(e)}
            value={query}
            ref={input}
            placeholder={placeholder}
          />
          {query && (
            <IconButton size="small" onClick={handleClearingQuery}>
              <X size={20} />
            </IconButton>
          )}
        </Box>

        {enableDropdown && dropdown && (
          <Card
            sx={{
              position: "absolute",
              left: 0,
              top: "100%",
              width: "100%",
              bgcolor: "background.paper",
              zIndex: 1,
              boxShadow: "0 5px 10px 0px #0000002b",
              py: 2,
            }}
          >
            <SearchResults
              query={query}
              results={results}
              onSelect={(selectedQuery) => {
                onSearch(selectedQuery);
                clearQuery()
              }}
            />
          </Card>
        )}

        {dropdown && <Box onClick={() => toggleDropdown(false)} sx={{ position: "fixed", inset: 0 }} />}
      </Box>
    </>
  );
}

export default Search;
