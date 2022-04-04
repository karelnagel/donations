import { ProjectInfo } from "../interfaces/ProjectInfo"

import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseConfig } from "../idk/config";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getProjectInfo = async (title: string, projectId: string) => {
    const docRef = doc(db, title, projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as ProjectInfo
    } else {
        console.log("No such document!");
        return null
    }

}

export const postProjectInfo = async (title: string, projectId: string, projectInfo: ProjectInfo) => {
    try {
        await setDoc(doc(db, title, projectId), projectInfo);
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}