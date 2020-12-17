export const collectIdAndData = (doc) => {
  // console.log(doc.data().createdAt);
  // createdAt gives us a firebase-object(timestamp)
  return { id: doc.id, ...doc.data() };
};
