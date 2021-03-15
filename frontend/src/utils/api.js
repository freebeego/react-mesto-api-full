class Api {
  constructor() {
    this.url = 'https://api.freebeego.students.nomoredomains.monster/';
  }

  _fetch(path, queryParams = {}) {
    const config = {};
    config.headers = { 'Accept': 'application/json' };
    config.credentials = 'include';
    if (queryParams.method) config.method = queryParams.method;
    if (queryParams.headers) config.headers = { ...config.headers, ...queryParams.headers };
    if (queryParams.body) config.body = JSON.stringify(queryParams.body);

    return fetch(this.url + path, config)
      .then(res => {
      if (res.ok) return res.json();

      return res.json().then(res => Promise.reject(res.message));
      });
  }

  signUp(email, password) {
    return this._fetch('signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email,
          password,
        }
      },
    );
  }

  signIn(email, password) {
    return this._fetch('signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email,
          password,
        }
      },
    );
  }

  signOut() {
    return this._fetch('signout');
  }

  getCards() {
    return this._fetch('cards');
  }

  getMyInfo() {
    return this._fetch('users/me');
  }

  editProfile(name, about) {
    return this._fetch('users/me',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          name,
          about
        }
      }
    );
  }

  addCard(name, link) {
    return this._fetch('cards',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          name,
          link
        }
      }
    );
  }

  deleteCard(cardId) {
    return this._fetch(`cards/${cardId}`,
      {
        method: 'DELETE'
      }
    );
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._fetch(`cards/${cardId}/likes`,
      {
        method: isLiked ? 'DELETE' : 'PUT'
      }
    );
  }

  updateAvatar(url) {
    return this._fetch('users/me/avatar',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          avatar: url
        }
      }
    );
  }
}

const api = new Api();

export default api;
