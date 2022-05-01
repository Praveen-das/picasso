import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import reactDom from "react-dom";
import ReAuthenticate from "../Components/ReAuthenticate/ReAuthenticate";
import { auth } from "../Config/Firebase/Firebase";
import { useStore } from "../Context/Store";

const reAuthenticateUser = (email, pass) => {
    console.log(email, pass);

    return new Promise((res, rej) => {
        try {
            if (!email && !pass)
                throw new Error('textField/empty-input')
            if (!email)
                throw new Error('auth/email-empty-input')
            if (!pass)
                throw new Error('auth/password-empty-input')
        } catch (error) {
            rej(error.message)
            return
        }

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(email, pass);

        reauthenticateWithCredential(user, credential)
            .then(() => {
                res(true)
                reactDom.unmountComponentAtNode(document.getElementById('portal'))
            }).catch((error) => {
                rej(error.code)
            });
    })
}

export const handleExceptions = (error) => {
    console.log(error);
    switch (error) {
        case 'auth/requires-recent-login':
            reactDom.render
                (
                    <ReAuthenticate reAuthenticateUser={reAuthenticateUser} />,
                    document.getElementById('portal')
                )
            break;
        case 'auth/network-request-failed':
            useStore.setState(state => ({
                alert: {
                    ...state.alert,
                    toggled: true,
                    type: 'warning',
                    message: 'Network connection interupted.'
                }
            }))
            break;
        case 'auth/too-many-requests':
            useStore.setState(state => ({
                alert: {
                    ...state.alert,
                    toggled: true,
                    type: 'warning',
                    message: 'Too many attempts. Try again later.'
                }
            }))
            break;
        case 'auth/email-empty-input':
            return { email: 'Please enter your email.' }
        case 'auth/password-empty-input':
            return { password: 'Please enter your password.' }
        case 'auth/user-mismatch':
            return { textField: 'Incorrect email or password. Please try again' }
        case 'auth/invalid-email':
            return { email: 'Invalid email id. Try again' }
        case 'auth/wrong-password':
            return { password: 'Incorrect password. Please try again' }
        case 'auth/weak-password':
            return { password: 'Your password should be longer than 6 characters.' }
        case 'auth/email-already-in-use':
            return { email: 'The email you provided is already in use.' }

        case 'textField/empty-input':
            return { textField: 'Please fill the required fields.' }
        case 'textField/firstname not provided':
            return { fName: 'Please provide your first name.' }

        case 'textField/password-empty-input':
            return { newPass: 'Enter your new password.' }
        case 'textField/confirmPassword-empty-input':
            return { confirmPass: 'Confirm your password.' }
        case 'password mismatch':
            return { password: 'Password and Confirm Password should match.' }
        default:
            break;
    }
}