## firebase.

### Features to try -

- Authentication
- Cloud Firestore
- storage (for storing image or other files)
- Cloud Functions, write backend code in firebase. Like - make api end-point, when data changes i want to trigger all this other actions. very similar to `AWS`, `lamda` etc.

> firebase also support `ios`, `android`. some of the concepts we r working on will apply to `react native` also.

### Cloud Firestore's(no sql database) Data Model.

- It designed for scalability. Awesome thing is, if i change my database instantly events are pushed to all connected clients.
- Firestore is based on the idea of `collections`. There will be a top level `collection` and as many as sub-collections. To structure this thik about the user interface and i want to show the user and structure the data based on that.

```js
const db = firebase.firesotre();

db.collection('posts');
db.collection('posts').doc('kdffh4434klkjk');
db.collection('posts').doc('kdffh4434klkjk').collection('comments');
db.collection('posts')
  .doc('kdffh4434klkjk')
  .collection('comments')
  .doc('kldfldfk53455');

// or
db.collection('posts/kdffh4434klkjk/comments');
db.doc('posts/kdffh4434klkjk/comments/kldfldfk53455');
```

- `ordering`, `sorting` & `filtering`, firesotre has `sql` esk queries. we can get data in a particular order. because firesotre under the hood gives every property an index.

```js
const db = firebase.firesotre();

db.collection('posts').orderBy('createdAt', 'desc');
db.collection('posts').limit(10);

// quering, no need to do that in clientside
db.collection('posts').where('stars', '>=', 10);
```

> firesotre will charge me according to how many requests i made. if i have 60million documents firebase will not change me for 60mil unless i am fetching all 60mil. so if i limit the request of documents and `paginate`, i will only pay for that limit.
