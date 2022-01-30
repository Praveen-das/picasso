import { createContext, useContext, useState } from "react";
import { addDoc, collection, arrayUnion, arrayRemove, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useEffect } from "react/cjs/react.development";
import { db, storage, auth } from "../Config/Firebase/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, reload, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import ReAuthenticate from "../Components/ReAuthenticate/ReAuthenticate";
import reactDom from "react-dom";

const Firebase = createContext()

export function useFirebase() {
    return useContext(Firebase)
}

export default function FirebaseContext({ children }) {
    const [adminProducts, setAdminProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [uploadProgress, setUploadProgress] = useState()
    const [searchResult, setSearchResult] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [profilePicture, setProfilePicture] = useState()
    const [userOrders, setUserOrders] = useState([])
    const [availableOrders, setAvailableOrders] = useState([])

    const signupUsingEmailPassword = async (credential) => {
        const email = credential.email
        const password = credential.password

        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
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
                handleExceptions(error);
            }
        })
    }

    const updateUserCredentials = async (data) => {
        await updateProfile(auth.currentUser, {
            displayName: data.displayName
        }).catch((error) => handleExceptions(error))

        await updateEmail(auth.currentUser, data.email)
            .catch((error) => handleExceptions(error))
        await resetCurrentUser()
    }

    const updateProfilePicture = async (photoURL) => {
        await updateProfile(auth.currentUser, {
            photoURL: photoURL
        }).catch((error) => handleExceptions(error))

        await resetCurrentUser()
    }

    const userSignIn = (credential) => {
        // const email = credential.email
        // const password = credential.password
        const email = 'praveendask97@gmail.com'
        const password = 'asdasdasd'

        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                handleExceptions(error);
            });
    }

    const reAuthenticateUser = (email, password) => {
        const user = auth.currentUser;

        const credential = EmailAuthProvider.credential(
            'praveendask97@gmail.com',
            'asdasdasd'
        );

        reauthenticateWithCredential(user, credential).then(() => {
            reactDom.unmountComponentAtNode(document.getElementById('portal'))
        }).catch((error) => {
            handleExceptions(error);
        });
    }

    const signout = () => {
        signOut(auth)
    }

    const verifyEmail = async () => {
        await sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('Email verification sent');
            })
            .catch((error) => handleExceptions(error))
        await resetCurrentUser()
    }

    const resetCurrentUser = async () => {
        await reload(currentUser)
            .then(() => {
                setCurrentUser({ ...auth.currentUser })
            })
            .catch((error) => handleExceptions(error))
    }

    const updateUserPassword = (newPassword) => {
        const user = auth.currentUser;
        updatePassword(user, newPassword).then(() => {
            console.log('password updated successfully');
        }).catch((error) => {
            handleExceptions(error);
        });
    }

    const handleExceptions = (error) => {
        console.log(error);
        switch (error.code) {
            case 'auth/requires-recent-login':
                reactDom.render
                    (
                        <ReAuthenticate reAuthenticateUser={reAuthenticateUser} />,
                        document.getElementById('portal')
                    )
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        }, (error) => console.log(error))
        return unsubscribe
    }, [currentUser])

    /////////////////////////////////////////

    useEffect(() => {
        let queryRef = query(collection(db, "products"), orderBy('date_modified', 'desc'))
        onSnapshot(queryRef, (snapshot) => {
            const adminCollections = snapshot.docs.map(doc => {
                // return doc.data().uid === '123' && { ...doc.data(), id: doc.id }
                return { ...doc.data(), id: doc.id }
            })
            const allCollections = snapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
            setAdminProducts(adminCollections.filter(o => o !== false))
            setAllProducts(allCollections)
        });
    }, [])

    const [userData, setUserData] = useState()

    useEffect(() => {
        if (!currentUser) return
        let docRef = doc(db, "userdata", currentUser.uid)
        onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.data())
            }
        });
    }, [currentUser])

    useEffect(() => {
        if (!currentUser) return
        const q1 = query(collection(db, "orders"), where("user_id", "==", currentUser.uid));
        const q2 = query(collection(db, "orders"), where("seller_id", "==", 'asdasdasdasd'));

        onSnapshot(q1, (snapshot) => {
            setAvailableOrders(snapshot.docs.map((doc) => {
                return { ...doc.data(), order_id: doc.id }
            }))
        })

        onSnapshot(q2, (snapshot) => {
            setUserOrders(snapshot.docs.map((doc) => {
                return { ...doc.data(), order_id: doc.id }
            }))
        })

    }, [currentUser])

    const handleSearch = (searchQuery) => {
        var result = adminProducts.filter((product) => {
            return filterSearch(searchQuery, product.name, product.id)
        })

        if (result)
            return setSearchResult(result)
        if (result.length === 0)
            return setSearchResult('')
    }

    const filterSearch = (q, item1, item2) => {
        const length = q.length
        const item1Ref = item1.substring(0, length)
        const item2Ref = item2.substring(0, length)
        if ((q === item1Ref) || (q === item2Ref))
            return true
    }

    const addProductToDatabase = async (data) => {
        try {
            const productRef = collection(db, 'products')
            const product = {
                ...data,
                date_modified: serverTimestamp()
            }
            addDoc(productRef, product).then(() => {
                console.log('product added successfully');
            })
        } catch (error) {
            console.log(error);
        }
    }

    const removeProduct = (id) => {
        try {
            deleteDoc(doc(db, "products", id))
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async (productId, updates) => {
        const productRef = doc(db, 'products', productId);
        await updateDoc(productRef, updates)
    }

    const uploadImage = (file) => {
        return Promise.all(file.map((data) => feedImages(data)))
    }

    const feedImages = (file) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `user/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress)
                },
                (error) => {
                    console.log(error)
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                })
        })
    }

    const addToWishlist = (product) => {
        const docRef = doc(db, 'userdata', currentUser.uid)
        setDoc(docRef, { wishlist: arrayUnion(product) }, { merge: true })
            .then(() => console.log('added to wishlist'))
            .catch((err) => console.log(err))
    }

    const removeFromWishlist = (product) => {
        const docRef = doc(db, 'userdata', currentUser.uid)
        setDoc(docRef, { wishlist: arrayRemove(product) }, { merge: true })
            .then(() => console.log('removed from wishlist'))
            .catch((err) => console.log(err))
    }
    const addToCart = (product) => {
        const docRef = doc(db, 'userdata', currentUser.uid)
        setDoc(docRef, { cart: arrayUnion(product) }, { merge: true })
            .then(() => console.log('added to cart'))
            .catch((err) => console.log(err))
    }

    const removeFromCart = (product) => {
        const docRef = doc(db, 'userdata', currentUser.uid)
        setDoc(docRef, { cart: arrayRemove(product) }, { merge: true })
            .then(() => console.log('removed from cart'))
            .catch((err) => console.log(err))
    }

    const addUserAddress = (data) => {
        const docRef = doc(db, 'userdata', currentUser.uid)
        setDoc(docRef, { address: arrayUnion(data) }, { merge: true })
            .then(() => console.log('new address added'))
            .catch((err) => console.log(err))
    }

    const makeOrder = (checkoutData) => {
        // console.log(checkoutData);
        let orderId = Math.floor(Math.random() * 9999999999 + 1)
        try {
            const docRef = collection(db, 'orders')
            addDoc(docRef, checkoutData, { merge: true })
                .then(() => console.log('new order received'))
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }


    const value = {
        addProductToDatabase,
        removeProduct,
        updateProduct,
        uploadImage,
        uploadProgress,
        handleSearch,
        searchResult,
        addUserAddress,
        ///////////////
        adminProducts,
        allProducts,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        makeOrder,
        userOrders,
        availableOrders,
        ///////////////
        currentUser,
        userData,
        signupUsingEmailPassword,
        userSignIn,
        signout,
        updateUserCredentials,
        updateProfilePicture,
        profilePicture,
        verifyEmail,
        updateUserPassword
    }

    return (
        <Firebase.Provider value={value}>
            {children}
        </Firebase.Provider>
    )
}