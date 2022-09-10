import { collection, getDocs, doc, setDoc } from "firebase/firestore";

import db from "../services/firebase.service";
const famousPeopleCollection = collection(db, "famous_people");

export const fetchFamousPeople = async () => {
  const famousPeopleSnapshot = await getDocs(famousPeopleCollection);
  const famousPeopleArray = famousPeopleSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return famousPeopleArray;
};

export const updateFamousPersonVotes = async (id, famousPersonUpdates) => {
  const famousPersonDoc = doc(db, "famous_people", id);
  const updatedFamousPerson = await setDoc(
    famousPersonDoc,
    famousPersonUpdates,
    { merge: true }
  );
  return updatedFamousPerson;
};
