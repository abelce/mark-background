export async function getStorage(key: string) {
    if (process.env.NODE_ENV === 'production') {
        if (chrome) {
            var bg = chrome.extension.getBackgroundPage();
            const res = bg.getAllData();
            return res;
        }
    } else {
       return new Promise((resolve, reject) => {
            const res = localStorage.getItem(key)
            console.log(res);
            resolve(res ? JSON.parse(res) : res);
       })
    }
}

export async function setStorage(key: string, value: any) {
    if (process.env.NODE_ENV === 'production') {
        if (chrome) {
            var bg = chrome.extension.getBackgroundPage();
            const res = await bg.setData(key, value);
            return res;
        }
    } else {
       return new Promise((resolve, reject) => {
            resolve(localStorage.setItem(key, JSON.stringify(value)));
       })
    }
}