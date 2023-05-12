import {  collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState , useEffect} from 'react';
import { db } from '../config/firebase';

const useStorage = (data) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(null);

  useEffect(() => {
    
    const storageRef = ref(getStorage(), `${data.itemImage.name}`);

    uploadBytes(storageRef, data.itemImage)
      .then((snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);

        getDownloadURL(storageRef)
          .then(async (imgUrl) => {
            const createdAt = new Date().toLocaleString();
            delete data.itemImage;

            const docRef = doc(collection(db, "auctions"),`${data.title}`);
            const docData = {
              ...data,
              itemImage: imgUrl,
              createdAt: createdAt,
            };

            await setDoc(docRef, docData);
            setIsCompleted(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [data]);

  return { progress, isCompleted };
};

export default useStorage;
