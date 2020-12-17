export const collectIdAndData = (doc) => {
  console.log(doc.data().createdAt);
  return { id: doc.id, ...doc.data() };
};
