import { collection, onSnapshot, query, where, limit, startAfter } from "firebase/firestore";
import { db } from "../Config/Firebase/Firebase";

export function myQuery(lastVisibleElement, ...queryConstraints) {
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

const getDataFromQuery = (query) => {
    if (query)
    return new Promise((res) => {
        onSnapshot(query, (snapshot) => {
            let snapshotData = (snapshot.docs.reduce((pre, doc) => {
                    let newData = doc.data()
                    newData.id = doc.id
                    pre.push(newData)
                    return pre
                }, []))
                res({
                    data: snapshotData,
                    lastElement: snapshot.docs[snapshot.docs.length - 1]
                })
            }, error => {
                console.log(error);
            })
        })
}

export const fetchData = async (type, next, uid) => {
    let queryRef
    
    if (uid) {
        if (type === 'adminProducts')
            queryRef = myQuery(next, collection(db, "products"), where('uid', '==', uid))
        if (type === 'user_orders')
            queryRef = myQuery(next, collection(db, "orders"), where("user_id", "==", uid), limit(10))
        if (type === 'seller_orders')
            queryRef = myQuery(next, collection(db, "orders"), where("seller_id", "==", uid), limit(10))
    }

    if (type === 'allProducts')
        queryRef = myQuery(next, collection(db, "products"), limit(10))
    if (type === 'productReviews')
        queryRef = myQuery(next, collection(db, "reviews"), limit(10))

    let data = await getDataFromQuery(queryRef)
    return data       
}

export default fetchData