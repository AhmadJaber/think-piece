export const collectIdAndData = (doc) => {
  return { id: doc.id, ...doc.data() };
};
