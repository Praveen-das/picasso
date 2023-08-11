import ImageKit from "imagekit-javascript";

var imagekit = new ImageKit({
    publicKey: process.env.REACT_APP_PUBLIC_KEY,
    urlEndpoint: process.env.REACT_APP_URL_ENDPOINT,
    authenticationEndpoint: process.env.REACT_APP_AUTH_ENDPOINT
});

export default imagekit