import { onAuthStateChanged } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"
import { auth, db } from "../../Config/Firebase/Firebase"

export const setUserData = (set, uid) => {
    let docRef = doc(db, "userdata", uid)

    onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
            set({ userData: snapshot.data() })
        }
    });
}

export const authListener = (set) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserData(set, user.uid)
            set(state => ({
                auth: {
                    ...state.auth,
                    user: user,
                    status: 'INITIALIZED'
                }
            }))
            return
        }
        set(state => ({
            auth: {
                ...state.auth,
                user: user,
                status: 'NOT_INITIALIZED'
            }
        }))
    }, (error) => {
        set(state => {
            state.userAuth.status = 'NOT_INITIALIZED'
            state.userAuth.error = error
            return {
                auth: {
                    user: undefined,
                    unsubscribe: undefined
                },
                userData: null
            }
        })

    })
}