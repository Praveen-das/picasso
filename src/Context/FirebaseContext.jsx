import { createContext, useContext, useLayoutEffect, useState } from "react";
import { increment, addDoc, collection, arrayUnion, arrayRemove, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where, getDocs } from "firebase/firestore";
import { useEffect } from "react/cjs/react.development";
import { db, auth } from "../Config/Firebase/Firebase";
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
        const email = 'asd@asd.com'
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadContent = async () => {
            let queryRef = query(collection(db, "products"), orderBy('date_modified', 'desc'))
            await onSnapshot(queryRef, (snapshot) => {
                const adminCollections = snapshot.docs.map(doc => {
                    // return doc.data().uid === '123' && { ...doc.data(), id: doc.id }
                    return { ...doc.data(), id: doc.id }
                })
                const allCollections = snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                setAdminProducts(adminCollections.filter(o => o !== false))
                setAllProducts(allCollections)
                setLoading(false)
            })
        }
        loadContent()
    }, [])

    const [userData, setUserData] = useState()
    const [recentlyViewed, setRecentlyViewed] = useState()

    useEffect(() => {
        if (!currentUser) return
        let docRef = doc(db, "userdata", currentUser.uid)
        onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.data())
                if (!snapshot.data().recently_viewed) return
                setRecentlyViewed(snapshot.data().recently_viewed.reverse())
            }
        });
    }, [currentUser])

    const [reviews, setReviews] = useState([])
    const [weightedRating, setWeightedRating] = useState()

    useEffect(() => {
        let queryRef = query(collection(db, "reviews"))
        onSnapshot(queryRef, (snapshot) => {
            setReviews(snapshot.docs.map((doc) => { return { ...doc.data(), review_id: doc.id } }));
        });
    }, [])

    const getAverageRating = (array) => {
        let sum = array.map((o) => o.reduce((x, y) => x + y, 0))
        let rating = (5 * sum[4] + 4 * sum[3] + 3 * sum[2] + 2 * sum[1] + 1 * sum[0]) / (sum[4] + sum[3] + sum[2] + sum[1] + sum[0])
        return rating
    }

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
        if (!searchQuery) return setSearchResult('')
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
    const productRating = (review, rating, productId) => {
        let productIdKey = productId.substring(0, 10)
        let userIdKey = currentUser.uid.substring(0, 10)
        let reviewId = productIdKey.concat(userIdKey)

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

    const searchFor = async (searchQuery) => {
        let queryRef = searchQuery.toLowerCase()
        const q = query(collection(db, "products"), where('name', '>=', queryRef), where('name', '<=', queryRef + '\uf8ff'));
        const data = await getDocs(q)
        const results = data.docs.map(doc => doc.data())
        return results
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
        handleSearch,
        searchResult,
        addUserAddress,
        ///////////////admin cart order
        adminProducts,
        allProducts,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        makeOrder,
        userOrders,
        availableOrders,
        handleOrder,
        handleAvailableQuantity,
        productRating,
        weightedRating,
        reviews,
        getAverageRating,
        handleRecentlyViewed,
        recentlyViewed,
        searchFor,
        getDeliveryDate,
        ///////////////authentication
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
            {!loading && children}
        </Firebase.Provider>
    )
}