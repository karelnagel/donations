import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../idk/config";


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (path: string, file: any) => {
    try {
        const storageRef = ref(storage, path);
        const result = await uploadBytes(storageRef, file)
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}
export const getImageUrl =  async (path: string) => {
    const spaceRef = ref(storage, path);
    return await getDownloadURL(spaceRef)
}