const authData = {
  "email": "admin@admin.com",
  "password": "admin2005"
}

const userRegister = {
    "name": "Diego",
    "age": 22,
    "email": "admin@admin.com",
    "password": "admin2005"
}

const userAdminRegister = {
    "name": "David",
    "age": 22,
    "email": "david@admin.com",
    "password": "admin2000",
    "role": "admin"
}

const trackDumb = {
  name: "Test track",
  album: "Test track",
  cover: "http://image.com",
  artist: {
    name: "Test track",
    nickname: "Test track",
    nationality: "SV",
  },
  duration: {
    start: 1,
    end: 3,
  },
  mediaId: "",
}

const storageDumb = {
  url: "http://localhost:3001/file-test.mp3",
  filename: "file-test.mp3"
}

module.exports = {authData, userRegister, userAdminRegister, trackDumb, storageDumb}