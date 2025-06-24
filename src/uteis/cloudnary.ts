import axios from "axios";
import { ImageSignature, VideoSignature } from "../API/uploads";

interface Props {
  file: string | File;
  api_key: string;
  timestamp: number;
  signature: string;
  context: string;
  // folder: string;
  // tags: string;
}

function createFormData({
  file,
  api_key,
  context,
  signature,
  // folder,
  // tags,
  timestamp,
}: Props) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  // formData.append("folder", folder);
  // formData.append("tags", tags);
  formData.append("context", context);
  return formData;
}

interface ImageProps {
  file: string | File;
  // folder:
  //   | "images/users/avatars"
  //   | "images/courses"
  //   | "images/centers"
  //   | "images/events";
  // tags: "profile-pic" | "center-img" | "course-img" | "event-img";
}

export async function handleUploadImage({ file }: ImageProps) {
  try {
    const { data } = await ImageSignature();

    if (!data) {
      // alert(error);      
      return undefined;
    }

    const formData = createFormData({ file, ...data });

    const uploadResponse = await axios.post<{ secure_url: string }>(
      `https://api.cloudinary.com/v1_1/${data.cloud_name}/upload`,
      formData
    );

    return uploadResponse.data.secure_url;
  } catch (error) {
    console.log("Upload failed:", error);
    return undefined;
  }
}

interface VideoProps {
  file: string | File;
  folder: "videos/on-demand" | "videos/posts";
  tags: "on-demand-vid" | "post-vid";
}

export async function handleUploadVideo({ file }: VideoProps) {
  try {
    const { data, error } = await VideoSignature();

    if (!data) {
      alert(error);
      return undefined;
    }

    const formData = createFormData({ file, ...data });

    const uploadResponse = await axios.post<{ secure_url: string }>(
      `https://api.cloudinary.com/v1_1/${data.cloud_name}/upload`,
      formData
    );

    return uploadResponse.data.secure_url;
  } catch (error) {
    console.log("Upload failed:", error);
    return undefined;
  }
}
