import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAjdyKbPj21beOIRKInTwafYfFi2dZmUvg',
    authDomain: 'grocery-list-962c8.firebaseapp.com',
    projectId: 'grocery-list-962c8',
    storageBucket: 'grocery-list-962c8.firebasestorage.app',
    messagingSenderId: '1064157247970',
    appId: '1:1064157247970:web:2cb38240d202a744aa21bb',
    measurementId: 'G-FCZNB8TGKH',
}
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// Safe List:
// iOS: 1064157247970-f5iq31of6hfm7nr7f260iopj7a53n1p8.apps.googleusercontent.com
// Adnroid: 1064157247970-78548fmhe5j5a4fhhpulh24g3afa3u9b.apps.googleusercontent.com