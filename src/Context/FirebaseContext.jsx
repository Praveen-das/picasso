import { createContext, useContext, useState } from "react";
import { arrayRemove, arrayUnion, deleteField, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react/cjs/react.development";
import { db, storage } from "../Config/Firebase/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const Firebase = createContext()

export function useFirebase() {
    return useContext(Firebase)
}

export default function FirebaseContext({ children }) {
    const [adminProducts, setAdminProducts] = useState()
    const [uploadProgress, setUploadProgress] = useState()

    useEffect(() => {
        onSnapshot(doc(db, "admin", "praveen"), (doc) => {
            if (doc.exists()) return setAdminProducts(doc.data().products)
        });
    }, [])

    const addProductToDatabase = (data) => {
        try {
            setDoc(doc(db, "admin", "praveen"), { products: arrayUnion(data) }, { merge: true }).then(() => {
                console.log('Product added successfully');
            })
        } catch (error) {
            console.log(error);
        }
    }

    const removeProduct = async (product) => {
        const productRef = doc(db, 'admin', 'praveen');
        await updateDoc(productRef, {
            products: arrayRemove(product)
        })
    }

    const uploadImage = (file) => {
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
                }
            )
        })
    }


    const value = {
        addProductToDatabase,
        removeProduct,
        adminProducts,
        uploadImage,
        uploadProgress,
    }

    return (
        <Firebase.Provider value={value}>
            {children}
        </Firebase.Provider>
    )
}