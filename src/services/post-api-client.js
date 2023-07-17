const get_posts_url = process.env.REACT_APP_POSTS_API_URL;
const insert_post_url = process.env.REACT_APP_INSERT_POST_API_URL;
const update_posturl = process.env.REACT_APP_UPDATE_POST_API_URL;
const delete_posturl = process.env.REACT_APP_DELETE_POST_API_URL;
const userId = window.sessionStorage.getItem('userId'); 

const postAPIClient = {
    getAllPosts: function (currentPage,pageLimit,searchValue) {
        const request = new Request(get_posts_url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({'currentPage':currentPage,'pageLimit':pageLimit,'searchPost':searchValue,'userId':userId})
        });

        var promise = new Promise((resolve, reject) => {
            return fetch(request).then((res) => {
                var result = res.json();
                result.then((jResult) => {
                    if (jResult.status) {
                        resolve(jResult);
                    }else{
                        reject(jResult.message);
                    }
                }, (err) => {
                    reject("JSON Parse Error");
                });
            }).catch((err) => {
                reject("Error connecting to the API");
            });
        });

        return promise;
    },

    insertPost: function (p) {
        p.userId = userId;

        const request = new Request(insert_post_url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(p)
        });

        var promise = new Promise((resolve, reject) => {
            return fetch(request).then(res => {
                res.json().then((jResult) => {
                    if (jResult.status) {
                        resolve(jResult);
                    }else{
                        reject(jResult.message);
                    }
                }, (err) => {
                    reject("JSON Parse Error");
                })
            }).catch(error => {
                reject("Error connecting to the API");
            });
        });

        return promise;
    },

    updatePost: function (p) {
        p.userId = userId;
        const request = new Request(update_posturl + "?id=" + p.id, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(p)
        });

        var promise = new Promise((resolve, reject) => {
            return fetch(request).then(res => {
                res.json().then((jResult) => {
                    if (jResult.status) {
                        resolve(jResult);
                    }else{
                        reject(jResult.message);
                    }
                }, (err) => {
                    reject("JSON Parse Error");
                })
            }).catch(error => {
                reject("Error connecting to the API");
            });
        });

        return promise;
    },

    deletePost: function (p) {
        p.userId = userId;
        const request = new Request(delete_posturl + "?id=" + p.id, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(p)
        });

        var promise = new Promise((resolve, reject) => {
            return fetch(request).then(res => {
                res.json().then((jResult) => {
                    if (jResult.status) {
                        resolve(jResult);
                    }else{
                        reject(jResult.message);
                    }
                }, (err) => {
                    reject("JSON Parse Error");
                })
            }).catch(error => {
                reject("Error connecting to the API");
            });
        });

        return promise;
    }
}

export default postAPIClient;