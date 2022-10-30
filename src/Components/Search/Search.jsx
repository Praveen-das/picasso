import react, { useEffect, useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './search.css'

function Search({ onKeyUp = () => null, onSearch = () => null }) {
    const [active, setActive] = useState(null)
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
            onSearch(query)
            setActive(false)
            handleClose()
            return
        }
        setActive(!active)
    }

    const handleClose = () => {
        setActive(!active)
        // setQuery('')
        clearTimeout(timer.current)
        // input.current.value = ''
    }

    return (
        <>
            <div
                className="searchbox_hitarea"
                style={{ display: active ? 'unset' : 'none' }}
                onClick={handleClose}
            />
            <div className='searchbox_wrapper'>
                <input
                    id='searchbox'
                    type="text"
                    autoComplete='off'
                    onKeyUp={(e) => handleSearch(e)}
                    ref={input}
                    className={
                        active === null ? '' :
                            active ? 'searchbox--expand' :
                                'searchbox--shrink'}
                />
                <IconButton onClick={() => handleQuery()}>
                    <SearchIcon id='search' sx={{ fontSize: 20 }} />
                </IconButton>
            </div>
        </>
    )
}

export default Search