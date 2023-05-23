class AuthApi {
  constructor(apiAddress) {
    this._authUrl = apiAddress;
  }
  _processingServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  tokenVerification(token) {
    return fetch(`${this._authUrl}users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._processingServerResponse);
  }
  userAuthorization(password, email) {
    return fetch(`${this._authUrl}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    })
      .then(this._processingServerResponse)
      .then((userData) => {
        if (userData.token) {
          localStorage.setItem("token", userData.token);
        }
      });
  }
  userRegistration(password, email) {
    return fetch(`${this._authUrl}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then(this._processingServerResponse);
  }
}

const apiAuth = new AuthApi("http://localhost:3000/");
export default apiAuth;
