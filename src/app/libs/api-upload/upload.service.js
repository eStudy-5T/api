import {initializeApp} from 'firebase/app';
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCC7Z5lx3fwveBf3gGtF4uAv4xg3iLrlZE',
  authDomain: 'letmeet-56e11.firebaseapp.com',
  projectId: 'letmeet-56e11',
  storageBucket: 'letmeet-56e11.appspot.com',
  messagingSenderId: '361393152210',
  appId: '1:361393152210:web:67520b649c58ac00730d0b',
  measurementId: 'G-NEE9L139LY'
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const uploadService = {
  uploadFile: (req) => {
    const file = req.image;
    const storageRef = ref(storage, ref + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is pause');
            break;
        }
      },
      (error) => {
        console.log('Upload failed.', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('File available at ', url);
        });
      }
    );
  }
};

export default uploadService;
