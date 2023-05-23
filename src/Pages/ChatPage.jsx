import React from 'react'
import Messenger from '../Components/Messenger/Messenger'
import useCurrentUser from '../Hooks/useCurrentUser'

function ChatPage() {
    const { currentUser } = useCurrentUser()

    return (
        <>
            <Messenger uid={currentUser.data?.id} />
        </>
    )
}
export default ChatPage


