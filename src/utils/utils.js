export const collectIdAndData = doc => {
  return { id: doc.id, ...doc.data() };
};

export const belongsToCurrentUser = (currentUser, postAuthor) => {
  if (!currentUser) return false;

  return currentUser.uid === postAuthor.uid;
};
