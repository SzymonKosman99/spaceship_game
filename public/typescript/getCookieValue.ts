const getCookieValue = (name: string) => {
    let cookieValue: string | undefined = undefined;
    const allcookies = document.cookie;
    const array = allcookies.split(';');
    array.forEach((cookie) => {
        if (cookie.includes(name)) {
            const index = cookie.indexOf('=');
            const string = cookie.slice(index + 1);
            cookieValue = string;
        }
    });
    return cookieValue;
};

export default getCookieValue;
