import { createContext, useContext, useState } from "react";
import { arrayUnion, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react/cjs/react.development";
import { db, storage } from "../Config/Firebase/Firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'

const Firebase = createContext()

export function useFirebase() {
    return useContext(Firebase)
}

export default function FirebaseContext({ children }) {
    const [adminProducts, setAdminProducts] = useState()
    const [uploadProgress, setUploadProgress] = useState()
    const [imageUrl, setImageUrl] = useState([])

    useEffect(() => {
        onSnapshot(doc(db, "admin", "praveen"), (doc) => {
            if (doc.exists()) return setAdminProducts(doc.data().products)
        });
    })

    const addProductToDatabase = (data) => {
        try {
            setDoc(doc(db, "admin", "praveen"), { products: arrayUnion(data) }, { merge: true }).then(() => {
                console.log('Product added successfully');
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(imageUrl);
    }, [imageUrl])

    const uploadImage = (file) => {
        const storageRef = ref(storage, `user/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(Math.floor(progress))
            },
            (error) => { console.log(error); },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(pre=>{
                        return [downloadURL,...pre]
                    })
                });
            }
        );
    }

    // const removeProduct = (data) => {

    // }


    const value = {
        addProductToDatabase,
        adminProducts,
        uploadImage,
        uploadProgress,
        imageUrl
    }

    return (
        <Firebase.Provider value={value}>
            {children}
        </Firebase.Provider>
    )
}