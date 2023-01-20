import { useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import './search.css'

function Search({ onKeyUp = () => null, onSearch = () => null }) {
    const [focused, setFocused] = useState(null)
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
            setFocused(false)
            handleClose()
            return
        }
        setFocused(!focused)
    }

    const handleClose = () => {
        setFocused(!focused)
        // setQuery('')
        clearTimeout(timer.current)
        // input.current.value = ''
    }

    return (
        <>
            <div
                className="searchbox_hitarea"
                style={{ display: focused ? 'unset' : 'none' }}
                onClick={handleClose}
            />
            <div className='searchbox_wrapper'>
                <IconButton onClick={() => handleQuery()}>
                    <SearchIcon id='search' sx={{ fontSize: 20 }} />
                </IconButton>
                <input
                    id='searchbox'
                    type="text"
                    autoComplete='off'
                    onKeyUp={(e) => handleSearch(e)}
                    ref={input}
                    className={
                        focused === null ? '' :
                            focused ? 'searchbox--expand' :
                                'searchbox--shrink'}
                />
                
            </div>
        </>
    )
}

export default Search