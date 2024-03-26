import imageCompression from 'browser-image-compression';

const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    console.log("🚀 ~ handleImageChange ~ file:", file)
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true,
        };

        // const compressedFile = await imageCompression(file, options);
        return await imageCompression(file, options);
        // console.log("🚀 ~ handleImageChange ~ compressedFile:", compressedFile)
        // const compressedImageUrl: any = URL.createObjectURL(compressedFile);
        // setImage(compressedImageUrl);
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  };