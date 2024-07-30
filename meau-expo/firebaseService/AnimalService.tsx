import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this file contains your Firebase config and initialization



interface Animal {
    userId: string;
    doencaDoAnimal: string;
    animalName: string;
    action: string;
    image: string;
    species: string;
    sexo: string;
    idade: string;
    porte: string;
    temperamento: Temperament;
    saude: HealthConditions;
    exigencia: Demands;
    sobre: string;
}

interface HealthConditions {
    castrado: boolean;
    doente: boolean;
    vermifugado: boolean;
    vacinado: boolean;
}

interface Temperament {
    calmo: boolean;
    timido: boolean;
    brincalhao: boolean;
    guardiao: boolean;
    amoroso: boolean;
    preguicoso: boolean;
}

interface Demands {
    termoAdocao: boolean;
    fotosCasa: boolean;
    visitaPrevia: boolean;
    acompanhamentoPos: boolean;
    umMes: boolean;
    tresMeses: boolean;
    seisMeses: boolean;
}

interface AnimalFetch {
    id: string;
    animalName: string;
    image: string;
    porte: string;
    idade: string;
    sexo: string;
}

const AnimalService = {
    fetchAnimals: async (): Promise<AnimalFetch[]> => {
        const animalCollection = collection(db, 'animals');
        const querySnapshot = await getDocs(animalCollection);

        if (querySnapshot.empty) {
            console.warn('No animals found');
        }
        const animalList = querySnapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                animalName: data.animalName,
                image: data.image,
                porte: data.porte,
                idade: data.idade,
                sexo: data.sexo,
            };
        });
        console.log('Animal List:', animalList);
        return animalList;
    },
    fetchAnimalById: async (id: string): Promise<Animal> => {
        const docRef = doc(db, 'animals', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data() as Animal;
            return { ...data };
        } else {
            throw new Error('No such document!');
        }
    }
};


export { AnimalService, AnimalFetch, Animal, Temperament, HealthConditions, Demands }; // Export the AnimalService;
