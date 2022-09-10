import { collection, getDocs } from "firebase/firestore";

import db from "../services/firebase.service";

export const fetchFamousPeople = async () => {
  const famousPeopleCollection = collection(db, "famous_people");
  const famousPeopleSnapshot = await getDocs(famousPeopleCollection);
  const famousPeopleArray = famousPeopleSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return famousPeopleArray;
}
