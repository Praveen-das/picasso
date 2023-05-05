import React from 'react'
import Header from '../Components/Header/Header'
import Messenger from '../Components/Messenger/Messenger'
import useCurrentUser from '../Hooks/useCurrentUser'

function ChatPage() {
    const { currentUser } = useCurrentUser()

    return (
        <>
            <Header />
            <Messenger uid={currentUser.data?.id} />
        </>
    )
}
export default ChatPage


