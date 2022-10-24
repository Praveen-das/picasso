import { onAuthStateChanged } from "firebase/auth"
import { collection, doc, limit, onSnapshot, where } from "firebase/firestore"
import { auth, db } from "../../Config/Firebase/Firebase"
import { myQuery } from "../../HelperFunctions__XXX/fetchData"

export const setUserData = (set, uid) => {
    let docRef = doc(db, "userdata", uid)
    onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
            set({
                userData: {
                    ...snapshot.data(),
                    address: snapshot.data().address?.reverse()
                }
            })
        }
    })
}

const getSnapshotData = (query, callback, error) => {
    onSnapshot(query, (snapshot) => {
        let snapshotData = (snapshot?.docs.reduce((pre, doc) => {
            let newData = doc.data()
            newData.id = doc.id
            pre.push(newData)
            return pre
        }, []))
        callback(snapshotData)
    }, err => {
        error(err.code);
    })
}

const getDataFromDB = (set, uid) => {
    const adminProducts = myQuery(undefined, collection(db, "products"), where('uid', '==', uid))
    const userOrders = myQuery(undefined, collection(db, "orders"), where("user_id", "==", uid), limit(10))
    const sellerOrders = myQuery(undefined, collection(db, "orders"), where("seller_id", "==", uid), limit(10))
    const allProducts = myQuery(undefined, collection(db, "products"), limit(10))
    const reviews = myQuery(undefined, collection(db, "reviews"), limit(10))

    getSnapshotData(adminProducts, (data) => {
        set(pre => ({ database: { ...pre.database, sellerProducts: data } }))
    }, err => console.log(err))
    getSnapshotData(userOrders, (data) => {
        set(pre => ({ database: { ...pre.database, userOrders: data } }))
    }, err => console.log(err))
    getSnapshotData(sellerOrders, (data) => {
        set(pre => ({ database: { ...pre.database, sellerOrders: data } }))
    }, err => console.log(err))
    getSnapshotData(allProducts, (data) => {
        set(pre => ({ database: { ...pre.database, allProducts: data } }))
    }, err => console.log(err))
    getSnapshotData(reviews, (data) => {
        set(pre => ({ database: { ...pre.database, reviews: data } }))
    }, err => console.log(err))
}

export const AuthSlice = (set) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserData(set, user.uid)
            getDataFromDB(set, user.uid)
            set(state => ({
                auth: {
                    ...state.auth,
                    user: user,
                    status: 'INITIALIZED'
                }
            }))
            return
        }
        set({
            auth: {
                user: null,
                status: 'NOT_INITIALIZED'
            }
        })
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