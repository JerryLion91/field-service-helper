import firebase from '../config/firebase';

export const useFirestore = () => {
  const db = firebase.firestore();
  const userColectionRef = db.collection('users');

  /**
   * User model
   */
  class User {
    constructor(displayName, email, photoURL, apelido, role) {
      this.displayName = displayName;
      this.email = email;
      this.photoURL = photoURL;
      this.apelido = apelido;
      this.role = role;
    }
  }

  // Firestore data converter
  const userConverter = {
    toFirestore: function (userData) {
      return {
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        apelido: userData.apelido,
        role: userData.role,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      return new User(
        data.displayName,
        data.email,
        data.photoURL,
        data.apelido,
        data.role
      );
    },
  };

  /**
   * GET allUsers
   */
  const getAllUsers = async () => {
    const dataUsers = await userColectionRef.get();
    return dataUsers.docs.map((doc) => {
      return { uid: doc.id, user: doc.data() };
    });
  };
  // end: GET allUsers

  /**
   *
   * @param {String} uid
   */
  const getUserByUid = async (uid) => {
    try {
      const dataUser = await userColectionRef
        .doc(uid)
        .withConverter(userConverter)
        .get();
      if (dataUser.exists) {
        // Convert to City object
        return dataUser.data();
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log('Error getting userDocument:', error);
    }
  };
  // end: GET getUserByUid

  /**
   *
   * @param {String} uid
   */
  const getPhoneNumbersByUser = async (uid) => {
    try {
      const phoneNumbers = await userColectionRef
        .doc(uid)
        .collection('phoneNumbers')
        .get();
      return phoneNumbers.docs.map((doc) => {
        return { phoneNumber: doc.id, details: doc.data() };
      });
    } catch (error) {
      console.log('Error getting phoneNumbers:', error);
    }
  };
  // end: GET getPhoneNumbersByUser

  /**
   *
   * @param {String} uid
   * @param {Number} phoneNumber
   */
  const getCallsByPhoneNumber = async (uid, phoneNumber) => {
    phoneNumber = phoneNumber.toString();
    try {
      const calls = await userColectionRef
        .doc(uid)
        .collection('phoneNumbers')
        .doc(phoneNumber)
        .collection('calls')
        .get();
      return calls.docs.map((doc) => {
        return { call: doc.id, details: doc.data() };
      });
    } catch (error) {
      console.log('Error getting calls:', error);
    }
  };
  // end: GET getCallsByPhoneNumber

  /**
   *
   * @param {*} user
   */
  const createUser = async (user) => {
    try {
      const { displayName, email, photoURL, uid } = user;

      const docRef = userColectionRef.doc(uid);
      // check if exists
      const dataUser = await docRef.get();
      if (dataUser.exists) return;

      // Set with userConverter
      const apelido = '';
      const role = '';
      await docRef
        .withConverter(userConverter)
        .set(new User(displayName, email, photoURL, apelido, role));

      console.log('User Document successfully added!');
    } catch (error) {
      console.log('Error creating newUser:', error);
    }
  };
  // end: POST createUserIfNotExists

  /**
   *
   * @param {String} uid
   * @param {Number} firstNumber
   * @param {Number} numbers
   */
  const postNewNumberList = async (uid, firstNumber, numbers) => {
    // Get a new write batch
    const batch = db.batch();
    const phoneNumbersColRef = userColectionRef
      .doc(uid)
      .collection('phoneNumbers');
    const dateNow = firebase.firestore.Timestamp.now();
    for (let i = 0; i < numbers; i++) {
      const newPhoneDocRef = phoneNumbersColRef.doc(`${firstNumber + i}`);
      batch.set(newPhoneDocRef, {
        name: '',
        result: '',
        calls: 0,
        timestamp: dateNow,
      });
    }
    // Commit the batch
    batch
      .commit()
      .then(() => {
        // ...
      })
      .catch((error) => {
        console.log('Error creating newPhoneList:', error);
      });
  };
  // end: POST postNewNumberList

  /**
   *
   * @param {String} uid
   * @param {Number} phoneNumber
   * @param {Object} call
   */
  const addNewCall = async (uid, phoneNumber, call) => {
    phoneNumber = phoneNumber.toString();
    try {
      const callsColRef = userColectionRef
        .doc(uid)
        .collection('phoneNumbers')
        .doc(phoneNumber)
        .collection('calls');
      const dateNow = firebase.firestore.Timestamp.now();
      const docRef = await callsColRef.add({ ...call, date: dateNow });
      return docRef.id;
    } catch (error) {
      console.log('Error posting newCall:', error);
    }
  };

  return {
    getAllUsers,
    getUserByUid,
    getPhoneNumbersByUser,
    getCallsByPhoneNumber,
    createUser,
    postNewNumberList,
    addNewCall,
  };
};
