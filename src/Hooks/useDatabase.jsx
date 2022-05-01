import { increment, addDoc, collection, arrayUnion, arrayRemove, deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/Firebase/Firebase";
import { useStore } from "../Context/Store";
import { useHelper } from "./useHelper";


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

    const addToCart = (product) => {
        const docRef = doc(db, 'userdata', user.uid)
        setDoc(docRef, { cart: arrayUnion(product) }, { merge: true })
            .then(() => console.log('added to cart'))
            .catch((err) => console.log(err))
    }

    const removeFromCart = (product) => {
        const docRef = doc(db, 'userdata', user.uid)
        setDoc(docRef, { cart: arrayRemove(product) }, { merge: true })
            .then(() => console.log('removed from cart'))
            .catch((err) => console.log(err))
    }

    const addUserAddress = (data) => {
        const docRef = doc(db, 'userdata', user.uid)
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

    const handleRecentlyViewed = (product) => {
        const docRef = doc(db, 'userdata', user.uid)
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

    return {
        addToWishlist,
        removeFromWishlist,
        AddProductReview,
        handleRecentlyViewed,
        addProductToDatabase,
        removeProduct,
        updateProduct,
        addToCart,
        removeFromCart,
        addUserAddress,
        makeOrder,
        handleOrder,
        handleAvailableQuantity,
        setActionExpiryDate
    }
}