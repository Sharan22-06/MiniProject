import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from "firebase/auth"
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit as limitFn, doc, getDoc, onSnapshot } from "firebase/firestore"
import { firebaseConfig } from "./firebaseConfig"

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

const auth = getAuth()
const db = getFirestore()

export { auth }

export async function signUp(email: string, password: string, displayName?: string): Promise<FirebaseUser> {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName && auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName })
  }
  return cred.user
}

export async function signIn(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function publishBook(data: {
  title: string
  author: string
  category?: string
  image?: string
  description?: string
  shelf?: string
  status?: "Available" | "Not Available"
  ownerId?: string
}) {
  const owner = data.ownerId || (auth.currentUser ? auth.currentUser.uid : undefined)
  const docRef = await addDoc(collection(db, "books"), {
    ...data,
    ownerId: owner,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getBooks(options?: { limit?: number }) {
  const q = options?.limit ? query(collection(db, "books"), orderBy("createdAt", "desc"), limitFn(options.limit)) : query(collection(db, "books"), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
}

export function listenBooks(onChange: (books: any[]) => void, options?: { limit?: number }) {
  const q = options?.limit ? query(collection(db, "books"), orderBy("createdAt", "desc"), limitFn(options.limit)) : query(collection(db, "books"), orderBy("createdAt", "desc"))
  const unsub = onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
    onChange(items)
  })
  return unsub
}

export async function getBookById(id: string) {
  const ref = doc(db, "books", id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...(snap.data() as any) }
}

export async function signOut() {
  return firebaseSignOut(auth)
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export async function sendResetEmail(email: string) {
  return sendPasswordResetEmail(auth, email)
}

export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser
}

export default {
  auth,
  signUp,
  signIn,
  signOut,
  onAuthChange,
  sendResetEmail,
  getCurrentUser,
  publishBook,
}
