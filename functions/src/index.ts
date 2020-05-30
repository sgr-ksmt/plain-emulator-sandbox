import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const userCreated = functions.firestore.document('users/{userID}').onCreate(async (snapshot, context) => {
  const userRef = admin.firestore().collection('users').doc(context.params.userID)
  const user = await userRef.get()
  console.log(`user: ${user.data()}`)
  await userRef.update({ age: 30 })
  return undefined
})