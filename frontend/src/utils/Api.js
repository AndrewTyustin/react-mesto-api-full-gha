class Api {яяя
  constructor(apiAddress) {
    this._link = apiAddress;
  }
  _processingServerResponse (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  getInitialCards() {
    return fetch(`${this._link}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(this._processingServerResponse)
  }
  addNewCard(name, link) {
    return fetch(`${this._link}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({ name, link }),
    })
    .then(this._processingServerResponse)
  }
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(this._processingServerResponse)
  }
  getUserData() {
    return fetch(`${this._link}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(this._processingServerResponse)
  }
  sendUserData(userName, userAbout) {
    return fetch(`${this._link}users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({ name: userName, about: userAbout }),
    })
    .then(this._processingServerResponse)
  }
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
    .then(this._processingServerResponse)
  }
  changeLikeCardStatus(cardId, isLiked) {
    const methodUsed = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._link}cards/${cardId}/likes`, {
      method: methodUsed,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(this._processingServerResponse)
  }
}

const apiConnect = new Api('https://api.andrewtyust.students.nomoredomains.monster/');
export default apiConnect;
