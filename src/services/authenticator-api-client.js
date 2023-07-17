const url = process.env.REACT_APP_LOGIN_URL;

const authenticatorClient = {
    isAuthenticated: false,

    login: function (uname, pwd) {
        return new Promise((resolve, reject) => {
            var data = `username=${uname}&password=${pwd}`;

            let fData = {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                body: data
            };

            fetch(url, fData).then((response) => {
                response.json().then((data) => {
                    if (data.status) {
                        window.sessionStorage.setItem("tk", data.user.token);
                        window.sessionStorage.setItem("userId", data.user.id);
                        this.isAuthenticated = data.status;
                        resolve(data.message);
                    } else {
                        reject(data.message);
                    }
                }).catch((err) => {
                    reject("Parsing Error");
                })
            }).catch((err) => {
                reject("Communication Error");
            });
        });
    },

    logout: function () {
        window.sessionStorage.removeItem('tk');
        window.sessionStorage.removeItem('userId');
        this.isAuthenticated = false;
    },

    getToken: function () {
        return window.sessionStorage.getItem('tk');
    },

    getUserId: function () {
        return window.sessionStorage.getItem('userId');
    }
};

export default authenticatorClient;