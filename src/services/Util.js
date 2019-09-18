// IMPORTANTE
// En este fichero encontrarás utilidades que te ayudarán a completar la práctica. Lee con atención todas las funciones antes de empezar a realizar la práctica.

export const HOST = "http://localhost:3000";
export const API = `apiv1`;
export const LOGIN_PATH = 'usuarios/login/';
export const ADS_PATH = 'anuncios';

export const API_USER = 'admin@example.org';
export const API_PASSWORD = '1234';
export const API_TOKEN = "currentToken";

export const USER_SESSION_KEY = "currentUser";
export const MESSAGES_SESSION_KEY = "messages";
export const FAVOURITE_TAG = "tag";

export const EIGHTEEN_YEARS_IN_MILLISECONDS = 18 * 365 * 24 * 60 * 60 * 1000;

export const isOldThan18YearsOld = (birthday) => {
    const past = new Date(Date.now() - EIGHTEEN_YEARS_IN_MILLISECONDS).getTime();
    return new Date(birthday).getTime() <= past;
};

export const signedIn = () => {
    const user = sessionStorage.getItem(USER_SESSION_KEY);
    return user && JSON.stringify(user) !== JSON.stringify({});
};

export const checkIfUserHasSignIn = (history) => {
    if (!signedIn()) {
        history.push("/sign-in")
    }
};

export const logout = () => {
    sessionStorage.clear();
};

export const currentUser = () => {
    return JSON.parse(sessionStorage.getItem(USER_SESSION_KEY));
};


export const apiToken = () => {
    return JSON.parse(localStorage.getItem(API_TOKEN));
}

export const getSavedMessages = () => {
    return JSON.parse(sessionStorage.getItem(MESSAGES_SESSION_KEY)) || [];
};

export const saveMessages = (messages) => {
    return sessionStorage.setItem(MESSAGES_SESSION_KEY, JSON.stringify(messages));
};

export const apiLogIn = () => {
    return (
        fetch(`${HOST}/${API}/${LOGIN_PATH}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: API_USER,
                password: API_PASSWORD
            })
        })
    ).then(res => res.json());
  }

export const authOnApi = () => {
    apiLogIn().then((data) => localStorage.setItem(API_TOKEN, JSON.stringify(data.result)))
}