import { increment, addDoc, collection, arrayUnion, arrayRemove, deleteDoc, doc, serverTimestamp, setDoc, updateDoc, Timestamp, limit, query, where, startAfter, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase/Firebase";
import { myQuery } from "../HelperFunctions__XXX/fetchData";
import { useStore } from "../Context/Store";
import { useHelper } from "./useHelper";
import { useState } from "react";


export const useDatabase = () => {
    const user = useStore(state => state.auth?.user)
    const { getDeliveryDate } = useHelper()

    const addToWishlist = (product) => {
        const docRef = doc(db, 'userdata', user.uid)
        setDoc(docRef, { wishlist: arrayUnion(product) }, { merge: true })
            .then(() => console.log('added to wishlist'))
            .catch((err) => console.log(err))
    }

    const removeFromWishlist = (product) => {
        const docRef = doc(db, 'userdata', user.uid)
        setDoc(docRef, { wishlist: arrayRemove(product) }, { merge: true })
            .then(() => console.log('removed from wishlist'))
            .catch((err) => console.log(err))
    }

    const addProductToDatabase = async (data) => {
        // try {
        //     const productRef = collection(db, 'products')
        //     const product = {
        //         ...data,
        //         date_modified: serverTimestamp()
        //     }
        //     addDoc(productRef, product).then(() => {
        //         console.log('product added successfully');
        //     })
        // } catch (error) {
        //     console.log(error);
        // }
        // const res = await fetch(
        //     'http:/localhost:3001/products',
        //     {
        //         method: "POST",
        //         body: data
        //     }).then(o => o.json())
        // console.log(res);
        console.log(data);
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

    const addToCart = (product) => {
        return new Promise((res, rej) => {
            const docRef = doc(db, 'userdata', user.uid)
            setDoc(docRef, { cart: arrayUnion(product) }, { merge: true })
                .then(() => {
                    useStore.setState(state => ({
                        alert: {
                            ...state.alert,
                            toggled: true,
                            message: 'Product successfully added to your shopping cart'
                        }
                    }))
                    res(true)
                })
                .catch((err) => rej(err.code))
        })
    }

    const removeFromCart = (product) => {
        return new Promise((res, rej) => {
            const docRef = doc(db, 'userdata', user.uid)
            setDoc(docRef, { cart: arrayRemove(product) }, { merge: true })
                .then(() => {
                    useStore.setState(state => ({
                        alert: {
                            ...state.alert,
                            toggled: true,
                            message: 'Product successfully removed from your shopping cart'
                        }
                    }))
                    res(true)
                })
                .catch((err) => rej(err.code))
        })
    }

    const setDefaultAddress = (data) => {
        const docRef = doc(db, 'userdata', user.uid)
        setDoc(docRef, { defaultAddress: data }, { merge: true })
            .then(() => {
                useStore.setState(state => ({
                    alert: {
                        ...state.alert,
                        toggled: true,
                        message: 'Default address changed successfully'
                    }
                }))
            })
            .catch((err) => console.log(err.code))
    }

    const addUserAddress = (data, isDefault) => {
        return new Promise((res, rej) => {
            try {
                if (
                    !data.name ||
                    !data.phoneNumber ||
                    !data.email ||
                    !data.pincode ||
                    !data.address1 ||
                    !data.cdt ||
                    !data.state
                )
                    throw new Error('textField/empty-input')
                if (!data.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
                    throw new Error('auth/invalid-email')
            } catch (error) {
                rej(error.message)
                return
            }

            if (isDefault.current) setDefaultAddress(data)

            const docRef = doc(db, 'userdata', user.uid)
            setDoc(docRef, { address: arrayUnion(data) }, { merge: true })
                .then(() => res(true))
                .catch((err) => rej(err.code))
        })
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
        const docRef = doc(db, "orders", orderId);
        await updateDoc(docRef, { status: status })
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
        let userIdKey = user.uid.substring(0, 10)
        let reviewId = productIdKey.concat(userIdKey) + 'zxczxczxc'

        const docRef = doc(db, 'reviews', reviewId)
        setDoc(docRef, {
            rating: rating,
            review: review,
            user_id: user.uid,
            username: user.displayName,
            user_image: user.photoURL,
            product_id: productId
        }, { merge: true }).then(() => console.log('product rated'))
    }

    const addToRecentlyViewed = (product) => {
        const docRef = doc(db, 'userdata', user?.uid)
        setDoc(docRef, { recently_viewed: arrayUnion(product) }, { merge: true })
            .then(() => console.log('new product added'))
            .catch((err) => console.log(err))
    }

    const setActionExpiryDate = () => {
        var today = new Date()
        var expiryDate
        var total_days = 60
        expiryDate = today.getTime() + (total_days * 24 * 60 * 60 * 1000)

        const docRef = doc(db, 'userdata', user.uid)
        setDoc(docRef, { actionExpiryDate: expiryDate }, { merge: true })
            .then(() => console.log('expirydate set'))
            .catch((err) => console.log(err))
    }

    const getDataFromQuery = async (id) => {
        const q = query(collection(db, 'products'), where('id', '==', id))
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs?.map(o => o.data())[0]
    }

    const getProductsById = async (data) => {
        if (!data) return
        if (Array.isArray(data)) {
            let docs = await Promise.all(data.map(o => getDataFromQuery(o)))
            docs = docs.filter(o => o !== undefined)
            return docs
        }
    }

    return {
        addToWishlist,
        removeFromWishlist,
        AddProductReview,
        addToRecentlyViewed,
        addProductToDatabase,
        removeProduct,
        updateProduct,
        addToCart,
        removeFromCart,
        addUserAddress,
        setDefaultAddress,
        makeOrder,
        handleOrder,
        handleAvailableQuantity,
        setActionExpiryDate,
        getProductsById
    }
}