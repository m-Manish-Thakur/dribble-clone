// utils/cloudinary.js

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
    formData.append("folder", process.env.NEXT_PUBLIC_FOLDER_NAME);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.error);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading image");
  }
};
