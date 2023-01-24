import React from 'react'
import Header from '../Components/Header/Header'
import { Messenger } from '../Components/Messenger/Messenger'
import useUserData from '../Hooks/useUserData'

function ChatPage() {
    const { currentUser } = useUserData()

    return (
        <>
            <Header />
            <Messenger uid={currentUser.data?.id} />
        </>
    )
}
export default ChatPage


