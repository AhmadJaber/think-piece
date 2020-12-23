## firebase.

### Features to try -

- Authentication
- Cloud Firestore
- storage (for storing image or other files)
- Cloud Functions, write backend code in firebase. Like - make api end-point, when data changes i want to trigger all this other actions. very similar to `AWS`, `lamda` etc.

> firebase also support `ios`, `android`. some of the concepts we r working on will apply to `react native` also.

### Cloud Firestore's(no sql database) Data Model.

- It designed for scalability. Awesome thing is, if i change my database instantly events are pushed to all connected clients. Firestore is based on the idea of `collections`. There will be a top level `collection` and as many as sub-collections.
- collection & document, `collection`(usually array of things) is group of objects, where the objects are called `documents`. In a created collection we create documents with unique id.
- `Query`, is a async request we make to firesotre to give us something from database.
- after quering, firesotre gives us two types of objects -
  > query reference - is an object which doesn't have the actual data of the collections or documents. it gives us the information about the data or method to get the `snapshot object`.
  > query snapshot - which gives us the data we r looking for.

we use the **query-reference** object to tell the firesotre whether to get the data or save data. also **query-reference** means **document-reference** has it's parent called **collection-reference**.

in **document-reference** objects we perform our firesotre `CRUD` methods,
`set()`, `get()`, `update()`, `delete()`

get() - is for retriving the data, meaning pulling out the snapshot object.
`document-reference.get()` we get `document snapshot`
`collection-reference.get()` we get `query snapshot`

we can **add documents** to collection useing, **collection-reference** object - `add()`

> To structure this collections, think about the user interface and what i want to show the user and structure the data based on that.

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

### security rules of firestore (what a given user allowed to do)

- there is bunch of rules we can white list, by default everything is blacklisted.
- if i enabale `read` - i will give the user ability to **get** a given a document and **list** all the document in a collection. but i can get a more granular, meaning, _user can get a list documents, but they can not scan through every one of them, only the one they know._
- if i enable `write` - i will enabale `create`, `update` & `delete` for the user. i can also get granular here.

```js
service cloud.firesotre {
  match /database/{database}/documents {
    match /posts/{postId} {
      match /comments/{comment} {
        allow read, write: if <condition>
      }
    }
  }
}

//  if i want to go to an arbitrary depth, then i can use
match /{document=**}

// another idea
service cloud.firesotre {
  match /database/{database}/documents {
    // allow the user access documents in the "posts" collection only
    // they are authenticated
    match /posts/{postId} {
      allow read, write; if request.auth.uid != null
    }
  }
}

// only modify your own data
service cloud.firesotre {
  match /database/{database}/documents {
   match /users/{userId} {
     allow read, update, delete: if request.auth.uid == userId;
     allow create: if request.auth.uid != null;
   }
  }
}
```

**validating based on the document**

- `resource.data`, will have all the fields that are currently in the database.
- `request.resource.data`, will have the incoming document.
  > so if user modifying data then `resource.data` or `request.resource.data`, if creating one only `request.resource.data`.

**accessing other documents**

```js
// will verify that document exists or not
exists(/databases/$(database)/documents/users/$(request.auth.uid))

// get data from another dodument
get(/databases/$(database)/documents/users/${request.auth.uid})
```

**Testing notes**

- security rules are all or nothing, white list or black list;
- i can **limit my query size** so that malicious users can't run expensive queries.
  `allow list: if request.query.limit <= 10;`

> in `Authentication` menu, if i go to template section, i will see the info about how i will handle `password-reset`, `email-verification`, `email address change`, `SMTP settings`;

**TODOS**

- enable error handling for all async tasks
- enable minimal form validation for fields
