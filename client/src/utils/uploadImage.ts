// Firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
export const uploadImage = (
  file: File
): Promise<{ downloadURL?: string; error?: Error }> => {
  return new Promise((resolve) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.then(
      (snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => resolve({ downloadURL }))
          .catch((error) => resolve({ error }));
      },
      (error) => {
        resolve({ error });
      }
    );
  });
};
