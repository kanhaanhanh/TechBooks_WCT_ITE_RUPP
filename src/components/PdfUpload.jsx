// src/components/PdfUpload.js

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {  storage } from '../firebase';
import FileInput from './FileInput';

const PdfUpload = ({ onUpload }) => {
  const handleFileChange = async (file) => {
    const storageRef = ref(storage, `pdfs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Handle progress (optional)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Error uploading file:', error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Send the download URL to the parent component or perform any other action
          onUpload(downloadURL);
        });
      }
    );
  };

  return (
    <FileInput onFileChange={handleFileChange} />
  );
};

export default PdfUpload;
