import react, { useEffect, useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './search.css'

function Search({ onKeyUp, onClick }) {
    const previousValue = useRef()
    const searchbox_wrapper = useRef()
    const searchbox = useRef()
    const [searchQuery, setSearchQuery] = useState()
    const [active, setActive] = useState(false)
    let timer;

    document.onclick = (e) => {
        if (!active) return
        if (searchbox_wrapper.current && !searchbox_wrapper.current.contains(e.target)) {
            setActive(false)
            setSearchQuery()
            searchbox.current.value = ''
        }
    }

    const handleSearch = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter')
            return onKeyUp(e)

        clearTimeout(timer)
        
        timer = setTimeout(() => {
            onKeyUp(e);
        }, 300)
    }

    const handleClearSearch = () => {
        setActive(false)
        searchbox.current.value = ''
        setSearchQuery()
        onKeyUp('')
    }

    useEffect(() => {
        if (active) {
            if (previousValue.current === undefined) {
                searchbox.current.classList.add('searchbox--expand')
                previousValue.current = active
                return
            }
            searchbox.current.classList.replace('searchbox--shrink', 'searchbox--expand')
            return
        }
        if (previousValue.current === !active) {
            searchbox.current.classList.replace('searchbox--expand', 'searchbox--shrink')
            return
        }
    }, [active, previousValue])

    return (
        <>
            <span className='searchbox_wrapper' ref={searchbox_wrapper}>
                <input onKeyUp={(e) => handleSearch(e)}
                    ref={searchbox} autoComplete='off' id='searchbox' type="text" />
                {
                    searchQuery ?
                        <IconButton onClick={() => handleClearSearch()}>
                            <ClearIcon id='search' sx={{ fontSize: 20 }} />
                        </IconButton> :
                        <IconButton onClick={() => searchQuery ? onClick(searchQuery) : setActive(!active)}>
                            <SearchIcon id='search' sx={{ fontSize: 20 }} />
                        </IconButton>
                }
            </span>
        </>
    )
}

export default Search