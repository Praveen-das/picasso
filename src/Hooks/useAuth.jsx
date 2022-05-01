import React, { useState } from 'react'
import { createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, reload, sendEmailVerification, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import reactDom from "react-dom";
import ReAuthenticate from "../Components/ReAuthenticate/ReAuthenticate";
import { auth, db } from "../Config/Firebase/Firebase";
import { useStore } from "../Context/Store";
import { useDatabase } from './useDatabase'
import { useExceptionHandler } from './useExceptionHandler';

export const useAuth = () => {
    const user = useStore(state => state.auth.user)
    const set = useStore.setState
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { setActionExpiryDate } = useDatabase()

    const resetCurrentUser = async () => {
        await reload(user)
            .then(() => {
                set(state => ({
                    auth: {
                        ...state.auth,
                        user: { ...user },
                        status: 'INITIALIZED'
                    }
                }))
            })
            .catch((error) => console.log(error.message))
    }

    const email = 'q@q.com'
    const password = 'asdasdasd'

    const signin = (credential) => {
        set(state => ({ auth: { ...state.auth, status: 'PENDING' } }))

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                set(state => ({ auth: { ...state.auth, status: 'INITIALIZED' } }))
            })
            .catch((error) => {
                set(state => ({ auth: { ...state.auth, error: error } }))
            })
    }

    const signout = () => {
        signOut(auth)
        set(state => ({ auth: { ...state.auth, status: 'INITIALIZED' } }))
    }
    const signup = (credential) => {
        const email = credential.email
        const password = credential.password

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            updateProfile(auth.currentUser, {
                displayName: credential.username
            }).catch((error) => console.log(error))
            try {
                const userRef = doc(db, 'userdata', userCredential.user.uid)
                const user_data = {
                    uid: userCredential.user.uid,
                    username: credential.username,
                    email: credential.email,
                    wishlist: []
                }
                setDoc(userRef, user_data).then(() => {
                    console.log('user data added to database');
                })
            } catch (error) {
                console.log(error);
            }
        })
    }

    const updateDisplayName = (firstName, middleName, surname) => {
        setLoading(true)
        return new Promise((res, rej) => {
            let fullname

            fullname = `${firstName} ${middleName} ${surname}`

            try {
                if (!firstName && !middleName && !surname) {
                    throw new Error('textField/empty-input')
                }
                if (!firstName) {
                    throw new Error('textField/firstname not provided')
                }
                if (!middleName) {
                    fullname = `${firstName} ${surname}`
                }
                if (!surname) {
                    fullname = `${firstName} ${middleName}`
                }
                if (!surname && !middleName) {
                    fullname = `${firstName}`
                }
            } catch (error) {
                setLoading(false)
                rej(error.message)
                return
            }

            updateProfile(user, { displayName: fullname })
                .then(() => {
                    res(true)
                    setLoading(false)
                    // setActionExpiryDate()
                    useStore.setState(state => ({
                        alert: {
                            ...state.alert,
                            toggled: true,
                            message: 'Display name changed successfully'
                        }
                    }))
                })
                .catch((error) => {
                    setLoading(false)
                    rej(error.code)
                    useStore.setState(state => ({
                        alert: {
                            ...state.alert,
                            toggled: true,
                            type: 'error',
                            message: 'Something went wrong. Please refresh.'
                        }
                    }))
                })
        })
    }

    const updateUserEmail = (data) => {
        setLoading(true)
        return new Promise((res, rej) => {

            try {
                if (data === '' || !data) {
                    throw new Error('textField/empty-input')
                }
                if (data === user?.email) {
                    throw new Error('auth/email-already-in-use')
                }
            } catch (error) {
                rej(error.message)
                setLoading(false)
                return
            }

            updateEmail(user, data)
                .then(() => {
                    setLoading(false)
                    useStore.setState(state => ({
                        alert: {
                            ...state.alert,
                            type:'success',
                            toggled: true,
                            message: 'Email changed successfully'
                        }
                    }))
                    res(true)
                })
                .catch((error) => {
                    setLoading(false)
                    rej(error.code)
                })
        })
    }

    const updateUserPassword = (pass1, pass2) => {
        setLoading(true)
        return new Promise((res, rej) => {
            try {
                if (!pass1 && !pass2)
                    throw new Error('textField/empty-input')
                if (!pass1)
                    throw new Error('textField/password-empty-input')
                if (!pass2)
                    throw new Error('textField/confirmPassword-empty-input')
                if (pass1 !== pass2)
                    throw new Error('password mismatch')
            } catch (error) {
                setLoading(false)
                rej(error.message);
                return
            }

            updatePassword(user, pass1).then(() => {
                setLoading(false)
                useStore.setState(state => ({
                    alert: {
                        ...state.alert,
                        toggled: true,
                        message: 'Password updated successfully'
                    }
                }))
                res(true)
            }).catch((error) => {
                setLoading(false)
                rej(error.code);
            });
        })
    }

    const verifyEmail = () => {
        return new Promise((res, rej) => {
            setLoading(true)
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    res(true)
                    setLoading(false)
                    useStore.setState(state => ({
                        alert: {
                            ...state.alert,
                            type: 'info',
                            toggled: true,
                            message: `We have sent an email to ${user.email}`
                        }
                    }))
                })
                .catch((error) => {
                    setLoading(false)
                    rej(error.code)
                })
        })
    }

    const updateProfilePicture = async (photoURL) => {
        await updateProfile(auth.currentUser, {
            photoURL: photoURL
        }).catch((error) => console.log(error))
        await resetCurrentUser()
    }

    return {
        loading,
        signin,
        signout,
        signup,
        verifyEmail,
        updateProfilePicture,
        updateDisplayName,
        updateUserEmail,
        updateUserPassword,
    }
}
