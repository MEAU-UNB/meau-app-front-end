import { db } from '../firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const getAllAnimals = {
    fetchAnimals: async () => {
        const animalCollection = collection(db, 'animal');
        const querySnapshot = await getDocs(animalCollection);
        const animalList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return animalList;
    }
};

export default getAllAnimals;
