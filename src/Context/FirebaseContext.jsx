import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { increment, addDoc, collection, arrayUnion, arrayRemove, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where, getDocs, limit, startAfter } from "firebase/firestore";
import { useEffect } from "react/cjs/react.development";
import { db, auth } from "../Config/Firebase/Firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, reload, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import ReAuthenticate from "../Components/ReAuthenticate/ReAuthenticate";
import reactDom from "react-dom";
import Fuse from 'fuse.js'
import { SecurityUpdateWarningOutlined } from "@mui/icons-material";

const Firebase = createContext()

export function useFirebase() {
    return useContext(Firebase)
}

function myQuery(lastVisibleElement, ...queryConstraints) {
    const queryConstraintsStartAfter = queryConstraints.reduce((pre, data, index) => {
        if (index === queryConstraints.length - 1)
            pre.push(startAfter(lastVisibleElement))
        pre.push(data)
        return pre
    }, [])

    if (lastVisibleElement) {
        return query(...queryConstraintsStartAfter)
    }
    return query(...queryConstraints)
}



const useSearch = (target) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [result, setResult] = useState({ data: [], searching: true })
    const { currentUser } = useFirebase()

    useEffect(() => {
        let q

        if (!currentUser) return
        if (target === 'adminProducts')
            q = query(collection(db, "products"), where('uid', '==', currentUser.uid));
        if (target === 'allProducts')
            q = query(collection(db, "products"));

        getDocs(q).then((data) => {
            const searchResult = data.docs.reduce((p, c) => {
                let newResult = c.data()
                newResult.id = c.id
                p.push(newResult)
                return p
            }, [])

            // const fuse = new Fuse(searchResult, {
            //     keys: [
            //         { name: 'name', weight: 3 },
            //         { name: 'tags', weight: 2 },
            //         { name: 'id', weight: 1 }]
            // })

            // const fused = fuse.search(searchQuery)

            // const fusedResult = fused.reduce((p, c) => {
            //     p.push(c.item)
            //     return p
            // }, [])

            // setResult({ data: fusedResult, searching: false })
        })

    }, [target, searchQuery, currentUser])

    return { result, setSearchQuery, }
}

export default function FirebaseContext({ children }) {
    const [currentUser, setCurrentUser] = useState()

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
        const email = 'asd@asd.com'
        const password = 'asdasdasd'

        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                handleExceptions(error);
            });
    }

    const reAuthenticateUser = (email, password) => {
        const user = auth.currentUser;

        const credential = EmailAuthProvider.credential(email, password);

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

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        }, (error) => console.log(error))
        return () => unsubscribe
    }, [currentUser])

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    const useDatabase = (dataType) => {
        const [page, setPage] = useState()
        const [dataLoading, setDataLoading] = useState(true)
        const [data, setData] = useState([])
        let { currentUser } = useFirebase()
        const snapshotRef = useRef()

        const next = useCallback(() => {
            setPage(snapshotRef.current.docs[snapshotRef.current.docs.length - 1])
        }, [])

        useEffect(() => {
            // setDataLoading(true)
            let queryRef
            let docRef

            try {
                if (dataType === 'allProducts')
                    queryRef = myQuery(page, collection(db, "products"), limit(2))
                if (dataType === 'adminProducts')
                    queryRef = myQuery(page, collection(db, "products"), where('uid', '==', currentUser.uid))
                if (dataType === 'productReviews')
                    queryRef = myQuery(page, collection(db, "reviews"), limit(2))
                if (dataType === 'user_orders')
                    queryRef = myQuery(page, collection(db, "orders"), where("user_id", "==", currentUser.uid), limit(2))
                if (dataType === 'seller_orders')
                    queryRef = myQuery(page, collection(db, "orders"), where("seller_id", "==", currentUser.uid), limit(2))
                if (dataType === 'userdata')
                    docRef = doc(db, "userdata", currentUser.uid)

                if (queryRef)
                    onSnapshot(queryRef, (snapshot) => {
                        snapshotRef.current = snapshot
                        let snapshotData = (snapshot.docs.reduce((pre, doc) => {
                            let newData = doc.data()
                            newData.id = doc.id
                            pre.push(newData)
                            return pre
                        }, []))
                        setData(snapshotData)
                        setDataLoading(false)
                    })
                if (docRef) {
                    onSnapshot(docRef, (snapshot) => {
                        if (snapshot.exists()) {
                            setData(snapshot.data())
                            setDataLoading(false)
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }

        }, [page, currentUser, dataType])

        return useMemo(() => ({ data, next, dataLoading }), [data, next, dataLoading])
    }

    const getAverageRating = (array) => {
        if (array === null) return
        let rating = (array[5] * 5 + array[4] * 4 + array[3] * 3 + array[2] * 2 + array[1] * 1) / (array[5] + array[4] + array[3] + array[2] + array[1])
        if (Number.isNaN(rating)) return 0
        return rating
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
        console.log(product);
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

    const makeOrder = async (checkoutData) => {
        const docRef = collection(db, 'orders')
        await addDoc(docRef, {
            ...checkoutData,
            date_ordered: serverTimestamp(),
            delivery_date: getDeliveryDate()
        }, { merge: true })
    }

    const handleOrder = async (status, orderId) => {
        console.log(status);
        const docRef = doc(db, "orders", orderId);
        await updateDoc(docRef, {
            status: status
        })
            .then(() => console.log(`status changed to ${status}`))
            .catch((error) => console.log(error))
    }

    const handleAvailableQuantity = async (productId, quantity) => {
        const docRef = doc(db, "products", productId);
        await updateDoc(docRef, {
            quantity: increment(-quantity)
        }).then(() => console.log('quantity updated'))
    }
    const AddProductReview = (review, rating, productId) => {
        let productIdKey = productId.substring(0, 10)
        let userIdKey = currentUser.uid.substring(0, 10)
        let reviewId = productIdKey.concat(userIdKey) + 'zxczxczxc'

        const docRef = doc(db, 'reviews', reviewId)
        setDoc(docRef, {
            rating: rating,
            review: review,
            user_id: currentUser.uid,
            username: currentUser.displayName,
            user_image: currentUser.photoURL,
            product_id: productId
        }, { merge: true }).then(() => console.log('product rated'))
    }

    const handleRecentlyViewed = (product) => {
        const docRef = doc(db, 'userdata', currentUser.uid)
        setDoc(docRef, { recently_viewed: arrayUnion(product) }, { merge: true })
            .then(() => console.log('new product added'))
            .catch((err) => console.log(err))
    }

    const getDeliveryDate = () => {
        var today = new Date();

        var deliveryDate = today;
        var total_days = 9;
        for (var days = 1; days <= total_days; days++) {
            deliveryDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
            if (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
                total_days++
            }
        }
        return deliveryDate.toDateString() + ' ' + deliveryDate.toLocaleTimeString()
    }

    const value = {
        /////////////////product
        addProductToDatabase,
        removeProduct,
        updateProduct,
        addUserAddress,
        useSearch,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        makeOrder,
        AddProductReview,
        ///////////////admin cart order
        useDatabase,
        handleOrder,
        handleAvailableQuantity,
        getAverageRating,
        handleRecentlyViewed,
        getDeliveryDate,
        ///////////////authentication
        currentUser,
        signupUsingEmailPassword,
        userSignIn,
        signout,
        updateUserCredentials,
        updateProfilePicture,
        verifyEmail,
        updateUserPassword
    }

    return (
        <Firebase.Provider value={value}>
            {!loading && children}
        </Firebase.Provider>
    )
}