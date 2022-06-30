import axios from 'axios';

export function createPresinedURL(file: File) {
    axios
        .post(`https://xxxxxxxx.execute-api.ap-northeast-2.amazonaws.com/api_stage/presinged_url_test`, {
            filename: file.name,
        })
        .then((response) => {
            const presignedUrl = response.data;
            console.log(presignedUrl);
            uploadImageToS3(presignedUrl, file);
        })
        .catch((error) => console.error(error));
}

function uploadImageToS3(url: string, file: File) {
    axios
        .put(url, file)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
}
