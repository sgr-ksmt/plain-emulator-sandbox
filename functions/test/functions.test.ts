import 'jest'
import * as firebase from '@firebase/testing'

// Please input your firebase project id.
const REAL_FIREBASE_PROJECT_ID = 'your-firebase-project-id'

describe('test user.onCreate', () => {
  let unsubscribe: any
  afterAll(() => {
    firebase.clearFirestoreData({ projectId: REAL_FIREBASE_PROJECT_ID })
    if (unsubscribe) {
      unsubscribe()
    }
  })
  describe('created company', () => {
    test('primary company should be set in user', async done => {
      const db = firebase
        .initializeAdminApp({ projectId: REAL_FIREBASE_PROJECT_ID })
        .firestore()

      const userRef = db.collection('users').doc('bob')
      await userRef.set({ name: 'bob' })

      unsubscribe = userRef.onSnapshot(snap => {
        console.log(snap.data())
        if (snap.data() && snap.data()!.age === 30) {
          done()
        }
      })
    })
  })
})
