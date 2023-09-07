# KiddFlix

## [See the App!](https://kiddflix.netlify.app/)

![App Logo](https://raw.githubusercontent.com/kekonline/KiddFlix-Client/master/src/assets/KiddFlix_Logo.png)

## Description

Empowering parents with a personalized app, curate tailored playlists for your child's learning and entertainment, ensuring a safe and enriching digital experience.

#### [Client Repo here](https://github.com/kekonline/KiddFlix-Client)

#### [Server Repo here](https://github.com/kekonline/KiddFlix-Server)

## Backlog Functionalities

the ability to subscribe to YouTube channels and add the videos automatically

## Technologies used

HTML, CSS, Javascript, Express, React, axios, bcryptjs, cloudinary, xpress-jwt,mongoose, multer, Materia UI, react-player

# Server Structure

## Models

Child model

```javascript
 {
        name: {
            type: String,
            required: [true, 'Name is required.']
        },

        picture: {
            type: String,
            default: "https://res.cloudinary.com/dfnezrziy/image/upload/v1693817681/KiddFlix/bzvqduc9bfro36l0uzb8.jpg"
        },
        userType: {
            type: String,
            default: "child"
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "Parent"
        }
    }
```

Parent model

```javascript
{
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    yearOfBirth: {
      type: Number,
      required: [true, 'Year of birth is required.']
    },

    picture: {
      type: String,
      default: "https://res.cloudinary.com/dfnezrziy/image/upload/v1693817739/KiddFlix/ucfialncduyflzhixpca.jpg"
    },
    userType: {
      type: String,
      default: "parent"
    }
  }
```

Playlist model

```javascript
{
    {
        name: {
            type: String,
            required: [true, 'Name is required.']
        },
        child: {
            type: Schema.Types.ObjectId,
            ref: "Child"
        },
        video: [{
            type: Schema.Types.ObjectId,
            ref: "Video"
        }]
    }
  }
```

Video model

```javascript
    {
        link: {
            type: String,
            trim: true,
            required: [true, 'Link is required.']
        },
        watched: {
            type: Boolean,
            default: false
        },
        dateAdded: {
            type: Date,
            default: Date.now
        },
        counts: {
            type: Number,
            default: 0
        },
        favorite: {
            type: Boolean,
            default: false
        },


    }
```

## API Endpoints (backend routes)

# API Endpoints

## POST `/api/auth/signin`

- **Description**: Registration
- **Request Body**:
  - `{ name, email, password, yearOfBirth, childName }`
- **Success Status**: 201
- **Error Status**: 400
- **Description**: Registers the user in the Database

---

## POST `/api/auth/login`

- **Description**: Authentication
- **Request Body**:
  - `{ email, password }`
- **Success Status**: 200
- **Error Status**: 400
- **Description**: Validates credentials, creates and sends Token

---

## GET `/api/auth/verify`

- **Description**: Validation Authorization
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: 401
- **Description**: Verifies the user Token

---

## POST `/auth/newPassword`

- **Description**: Password change request
- **Request Body**:
  - `{ password, newPassword }`
- **Success Status**: N/A (Response sent accordingly)
- **Error Status**: N/A (Response sent accordingly)
- **Description**: Handles password change request

---

**Note**: The above API endpoints are defined using Express.js. They handle various operations related to user authentication and profile management.

**Important**: Ensure that necessary validations, middleware, and error handling are in place when implementing these routes in your application.

# Child API Endpoints

## GET `/api/child/all/`

- **Description**: Get all children of a specific parent
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Retrieves all children associated with the authenticated parent.

---

## POST `/api/child/new/`

- **Description**: Create a new child for a specific parent
- **Request Body**:
  - `{ name, picture }`
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Creates a new child associated with the authenticated parent.

---

## GET `/api/child/:childId`

- **Description**: Get information about a specific child
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Retrieves information about a specific child.

---

## DELETE `/api/child/:childId`

- **Description**: Delete a specific child
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Deletes a specific child.

---

## PUT `/api/child/:childId`

- **Description**: Update a specific child
- **Request Body**:
  - `{ name, picture }`
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Updates information about a specific child.

---

**Note**: These endpoints handle operations related to children associated with a specific parent. Ensure proper authentication and error handling mechanisms are in place for these routes to function correctly.

# Parent API Endpoints

## GET `/api/parent/`

- **Description**: Get information about a specific parent
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Retrieves information about the authenticated parent.

---

## PUT `/api/parent/`

- **Description**: Update a specific parent
- **Request Body**:
  - `{ /* Fields to update */ }`
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Updates information about the authenticated parent.

---

## POST `/api/parent/YOBCheck`

- **Description**: Check if the parent's year of birth is correct
- **Request Body**:
  - `{ yearOfBirth }`
- **Success Status**: N/A (Response sent accordingly)
- **Error Status**: N/A (Response sent accordingly)
- **Description**: Compares the provided year of birth with the authenticated parent's year of birth.

---

**Note**: These endpoints handle operations related to the authenticated parent. Ensure proper authentication and error handling mechanisms are in place for these routes to function correctly.

# Playlist API Endpoints

## GET `/api/playlist/all/:childid`

- **Description**: Get all playlists of a specific child
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Retrieves all playlists associated with a specific child, sorted by name.

---

## POST `/api/playlist/new/:childid`

- **Description**: Create a new playlist for a specific child
- **Request Body**:
  - `{ name }`
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Creates a new playlist associated with a specific child.

---

## GET `/api/playlist/:playlistid`

- **Description**: Get information about a specific playlist
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Retrieves information about a specific playlist.

---

## DELETE `/api/playlist/:playlistid`

- **Description**: Delete a specific playlist
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Deletes a specific playlist.

---

## PUT `/api/playlist/:playlistid`

- **Description**: Update a specific playlist
- **Request Body**:
  - `{ name }`
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Updates information about a specific playlist.

---

## GET `/api/playlist/videos/:playlistId`

- **Description**: Get all videos of a specific playlist
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Retrieves all videos associated with a specific playlist.

---

## GET `/api/playlist/oneVideo/:playlistId`

- **Description**: Get one video of a specific playlist
- **Request Body**: None
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Retrieves one video associated with a specific playlist.

---

## PUT `/api/playlist/name/:playlistid`

- **Description**: Update a specific playlist name
- **Request Body**:
  - `{ name }`
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Updates the name of a specific playlist.

---

## GET `/api/playlist/number/:playlistid`

- **Description**: Update a specific playlist name
- **Request Body**: None
- **Success Status**: N/A (Handled in case of error)
- **Error Status**: N/A (Handled in case of error)
- **Description**: [Description pending]

---

**Note**: These endpoints handle operations related to playlists. Ensure proper authentication and error handling mechanisms are in place for these routes to function correctly.

# Upload API Endpoints

## POST `/api/upload`

- **Description**: Upload an image
- **Request Body**:
  - `FormData` with an image file attached to the "image" field.
- **Success Status**: 200
- **Error Status**: N/A (Handled in case of error)
- **Description**: Uploads an image and returns the image URL.

---

**Note**: This endpoint allows authenticated users to upload an image. Ensure proper authentication and error handling mechanisms are in place for this route to function correctly. Additionally, make sure to use a `FormData` object to properly send the image file in the request.

# Video API Endpoints

## GET `/api/video/unwatched/:childid`

- **Description**: Get all unwatched videos of a specific child
- **Request Parameters**:
  - `childid`: The id of the child
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Retrieves a list of unwatched videos for a specific child.

---

## GET `/api/video/latest/:childid`

- **Description**: Get all latest videos of a specific child
- **Request Parameters**:
  - `childid`: The id of the child
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Retrieves a list of latest videos for a specific child.

---

## GET `/api/video/random/:childid`

- **Description**: Get 20 random videos of a specific child
- **Request Parameters**:
  - `childid`: The id of the child
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Retrieves a list of random videos for a specific child.

---

## GET `/api/video/favorite/:childid`

- **Description**: Get favorite videos of a specific child
- **Request Parameters**:
  - `childid`: The id of the child
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Retrieves a list of favorite videos for a specific child.

---

## GET `/api/video/:videoid`

- **Description**: Get information about a specific video
- **Request Parameters**:
  - `videoid`: The id of the video
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Retrieves information about a specific video.

---

## DELETE `/api/video/:videoid`

- **Description**: Delete a specific video
- **Request Parameters**:
  - `videoid`: The id of the video
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Deletes a specific video.

---

## PUT `/api/video/star/:videoid`

- **Description**: Update the favorite status of a specific video
- **Request Parameters**:
  - `videoid`: The id of the video
- **Request Body**:
  - `favorite`: Boolean value indicating if the video is a favorite
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Updates the favorite status of a specific video.

---

## PUT `/api/video/:videoid`

- **Description**: Update a specific video
- **Request Parameters**:
  - `videoid`: The id of the video
- **Request Body**:
  - `watched`: Boolean value indicating if the video has been watched
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Updates a specific video, marking it as watched.

---

## POST `/api/video/new/`

- **Description**: Create a new video and add it to a specific playlist
- **Request Body**:
  - `link`: The link to the video
  - `playlistId`: The id of the playlist to add the video to
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Creates a new video and adds it to a specific playlist.

---

## GET `/api/video/top20/:childid`

- **Description**: Get 20 most viewed videos not in this child's playlists
- **Request Parameters**:
  - `childid`: The id of the child
- **Success Status**: 200
- **Error Status**: Handled in case of error
- **Description**: Retrieves a list of most viewed videos not present in the child's playlists.

## Links

### Collaborators

[kekonline](https://github.com/kekonline)

### Project

[Repository Link Client](https://github.com/kekonline/KiddFlix-Client)

[Repository Link Server](https://github.com/kekonline/KiddFlix-Server)

[Deploy Link](https://kiddflix.netlify.app/)

### Trello

[Link to your trello board](https://trello.com/b/6DHgdgvs/kiddflix)

### Slides

[Slides Link](https://docs.google.com/presentation/d/12SMBXdSX9TFTras3adn3-_gTpP47OKBg2CPeZMjvA8k/edit?usp=sharing)
