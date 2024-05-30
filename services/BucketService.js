import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

// Upload Image to Buckets
export const handleUploadOfImage = async (uri, fileName) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        }
        xhr.responseType = "blob";
        xhr.open("GET", uri, true)
        xhr.send(null);
    })

    const uploadRef = ref(storage, fileName)
    const uploadResult = await uploadBytes(uploadRef, blob)

    blob.close()

    console.log(await getDownloadURL(uploadRef))

}
