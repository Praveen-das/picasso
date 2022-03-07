import React, { useEffect, useRef, useState } from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './search.css'

function Search({ onTheFly, callback }) {
    const previousValue = useRef()
    const searchbox_wrapper = useRef()
    const searchbox = useRef()
    const [searchQuery, setSearchQuery] = useState()
    const [active, setActive] = useState(false)

    document.onclick = (e) => {
        if (!active) return
        if (searchbox_wrapper.current && !searchbox_wrapper.current.contains(e.target)) {
            if (onTheFly) {
                if (!searchQuery)
                    setActive(false)
                    // callback('')
                return
            }
            setActive(false)
            setSearchQuery()
            searchbox.current.value = ''
        }
    }

    const onEnterKeyPressed = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter')
            return callback(searchQuery)
    }

    const handleSearch = (input) => {
        callback(input)
        setSearchQuery(input)
    }
    const handleClearSearch = () => {
        setActive(false)
        searchbox.current.value = ''
        setSearchQuery()
        callback('')
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
                <input onKeyUp={(e) => onEnterKeyPressed(e)} onChange={(e) => {
                    onTheFly ?
                        handleSearch(e.target.value)
                        :
                        setSearchQuery(e.target.value)
                }}
                    ref={searchbox} autoComplete='off' id='searchbox' type="text" />
                {
                    onTheFly ?
                        searchQuery ?
                            <IconButton onClick={() => handleClearSearch()}>
                                <ClearIcon id='search' sx={{ fontSize: 20 }} />
                            </IconButton> :
                            <IconButton onClick={() => searchQuery ? callback(searchQuery) : setActive(!active)}>
                                <SearchIcon id='search' sx={{ fontSize: 20 }} />
                            </IconButton> :
                        <IconButton onClick={() => searchQuery ? callback(searchQuery) : setActive(!active)}>
                            <SearchIcon id='search' sx={{ fontSize: 20 }} />
                        </IconButton>

                }
            </span>
        </>
    )
}

export default Search