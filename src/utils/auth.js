const BACKEND_URL = "https://auth.nomoreparties.co"

function changeRes(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`${res.status}`)
}

export const registration = (email, password) => {
  return fetch(`${BACKEND_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(changeRes)
}

export const login = (email, password) => {
  return fetch(`${BACKEND_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(changeRes)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token)
        return data
      }
    })
}

export const changeToken = (jwt) => {
  return fetch(`${BACKEND_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(changeRes)
}