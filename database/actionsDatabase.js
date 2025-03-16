import sendMessageToTelegram from "@/telegram/contact";
import {
  calculateAverageByDate,
  getAverages,
  transformData,
} from "@/utils/funcs";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  get,
  remove,
} from "firebase/database";

export async function writeNewPost(
  uid,
  username,
  picture,
  title,
  body,
  contacts
) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    contacts: contacts,
    starCount: 0,
    authorPic: picture,
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), "posts")).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/posts/" + newPostKey] = postData;
  updates["/user-posts/" + uid + "/" + newPostKey] = postData;

  await sendMessageToTelegram({
    name: username,
    email: username,
    message: body,
    id_mess: newPostKey,
  });

  return update(ref(db), updates);
}
export function addComment(uid, email, title, body, gender) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    email: email,
    id: uid,
    text: body,
    title: title,
    gender: gender,
    dislikeCount: null,
    likeCount: null,
    dateTime: Date.now(),
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), "reviews")).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/reviews/" + newPostKey] = postData;
  updates["/user-reviews/" + uid + "/" + newPostKey] = postData;

  return update(ref(db), updates);
}
export function rateCategory(uid, category, rate) {
  const db = getDatabase();
  const currentMonth =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2);

  const postData = {
    [currentMonth]: {
      [category]: rate,
    },
  };

  const updates = {};
  updates["/rates/" + category + "/" + uid] = postData;
  updates[
    "/user-rates/" + uid + "/rates" + "/" + currentMonth + "/" + category
  ] = rate;

  return update(ref(db), updates);
}
export async function getUserRateCategory(uid, category) {
  console.log(category);
  const dbRef = ref(getDatabase());
  const currentMonth =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2);

  const rate = await get(
    child(dbRef, `user-rates/${uid}/rates/${currentMonth}/${category}`)
  )
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return rate;
}
export async function getAllRateCategory(category) {
  console.log(category);
  const dbRef = ref(getDatabase());
  const currentMonth =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2);

  const rate = await get(child(dbRef, `rates/${category}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const result = getAverages(rate, category);
  console.log(result);
  return result;
}

export function getPosts() {
  const dbRef = ref(getDatabase());
  const posts = get(child(dbRef, `posts`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return posts;
}
export async function getReviews() {
  const dbRef = ref(getDatabase());

  let posts = await get(child(dbRef, `reviews`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(posts);
  posts = transformData(posts);
  return posts;
}
export async function getUserPosts(id) {
  const dbRef = ref(getDatabase());
  const posts = await get(child(dbRef, `user-posts/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return posts;
}
export function deleteUserPost(id, uid) {
  const dbRef = ref(getDatabase());
  remove(child(dbRef, `user-posts/${uid}/${id}`));
  remove(child(dbRef, `posts/${id}`));
}
