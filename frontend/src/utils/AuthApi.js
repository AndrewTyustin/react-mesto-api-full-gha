class AuthApi {
  constructor(authUrl) {
    this._authUrl = authUrl;
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
        Authorization: `Bearer ${token}`,
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
    }).then(this._processingServerResponse);
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

const apiAuth = new AuthApi("https://auth.nomoreparties.co/");
export default apiAuth;
