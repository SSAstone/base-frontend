"use client";
import Image from "next/image";
import { useState } from "react";



export default function Home() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!image) {
      setMessage('Please select an image');
      return;
    }
    console.log("🚀 ~ handleSubmit ~ image:", image)

    const formData = new FormData();
    console.log("🚀 ~ handleSubmit ~ formData:", formData)
    formData.append('image', image);

    // try {
    //   const response = await fetch('http://192.168.0.104:5550/others/upload-image', {
    //     method: 'POST',
    //     body: formData
    //   });

    //   const data = await response.json();
    //   console.log("🚀 ~ handleSubmit ~ data:", data)
    //   setMessage(`Image uploaded successfully. Download URL: ${data.downloadURL}`);
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    //   setMessage('An error occurred while uploading the image.');
    // }
  };


  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Hello World </h1>
      <Image src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-fbca2.appspot.com/o/images%2F1711399380228?alt=media&token=3a47caf0-583e-4a7f-b733-26afbd63e2cc" alt="Vercel Logo" width={72} height={16}></Image>
      <div>
        <p>Upload Image</p>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <button type="submit">Upload Image</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
