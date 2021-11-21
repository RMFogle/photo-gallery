# ![](https://github.com/RMFogle/photo-gallery/blob/main/client/src/img/react_photoGallery_home.png)

react photo gallery is a private/personal photo gallery app. 

## Demo: 
Here is a working live demo: https://sad-mestorf-f1ac6b.netlify.app/

## Desktop & Mobile Friendly: 

### Upload Page 
![](https://github.com/RMFogle/photo-gallery/blob/main/client/src/img/uploadImage.png)

### Gallery Page 
![](https://github.com/RMFogle/photo-gallery/blob/main/client/src/img/galleryPage.png)

## Motivation 
- I've had experience using an image uploader library such as React-file-base64 and I wanted to build a custom built image uploader using just javascript, multer and react components. 

## Build with: 
- React Redux
- Axios
- Express 
- Node.js
- mongoDB/mongoose
- Multer
- Moment.js
- JWT
- React-Google-Login-Lite
- Google-Auth-Library
- Nodemailer 
- React-Bootstrap
- Adobe Photoshop and Sparks for logo.
- Heroku for backend deployment. 
- Netlify for frontend deployment.

## Features: 
- Custom built(no library such as React-file-base64) image uploader from desktop or mobile device. Currently works with jpg only. 
- Delete image from gallery. 

## Bugs: 
- Google Login and Login doesn't work. 

Had CORS issue: "cors policy: response to preflight request doesn't pass access control check: no 'access-control-allow-origin' header is present on the requested resource." 

So I added custom preflights for each route. For example: 
![](https://github.com/RMFogle/photo-gallery/blob/main/client/src/img/cors_preflight_googlelogin.png)

The above code seemd to solve the cors issue, but I don't recieve a successful login message and the app fails to redirect to home after logging in. 

Note: For purposes of a partial working demo. I've included links to the upload and gallery in the main nav before login when typically these would only be accessible after successfully logging in. 

## Roadmap: 
- Fix JWT and Google Login. 
- Fix redirect after user logs in. 
- Expand image uploader to include .png and .gif files. 
- Create custom share button for images. Giving the user the ability to securely share an image with another user. 

### Authors: 
Ryan Fogle 

## License 
MIT 