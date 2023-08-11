import { useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import { ReactComponent as SearchIcon } from '../../Assets/Icons/search.svg';
import './search.css'

function Search({ onKeyUp = () => null, onSearch }) {
    const [query, setQuery] = useState('')
    const input = useRef()

    const timer = useRef;

    const handleSearch = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') return handleQuery()
        clearTimeout(timer.current)
        setQuery(e.target.value)
        timer.current = setTimeout(() => {
            onKeyUp(e.target.value);
        }, 300)
    }

    const handleQuery = () => {
        if (query !== '') {
            if (onSearch)
                onSearch(query)
            return
        }
    }

    return (
        <>
            <div id='search_wrapper'>
                <div id='searchbox_wrapper'>
                    {!onSearch && <SearchIcon style={{ opacity: 0.6 }} width={20} height={20} />}
                    {
                    onSearch &&
                    <IconButton sx={{ p: '4px' }} onClick={() => handleQuery()}>
                        <SearchIcon style={{ opacity: 0.6 }} width={21} height={21} />
                    </IconButton>
                }
                    <input
                        id="searchbox"
                        type="text"
                        autoComplete='off'
                        onKeyUp={(e) => handleSearch(e)}
                        ref={input}
                        placeholder='Search for Paintings'
                    />
                </div>
                
            </div>
        </>
    )
}

export default Search