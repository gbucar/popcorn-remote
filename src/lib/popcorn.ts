export const opt = {
    username: "popcorn",
    password: "popcorn",
    ip: "127.0.0.1",
    port: "8008",
    debug: false
};

export const APIcall = async (api_method: any, api_params: any = undefined, callback: any = undefined) => {
    const request = {
        id: Math.floor((Math.random() * 100) + 1),
        jsonrpc: '2.0',
        method: api_method,
        params: (api_params) ? api_params : []
    };

    const opt = {
        ip: localStorage.getItem("ip"),
        port: localStorage.getItem("port"),
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
    }

    const headers = new Headers();
    headers.set("Authorization", `Basic ${btoa(opt.username + ":" + opt.password)}`);
    headers.set("Accept", "application/json");

    const options = {
        method: "POST",
        withCredentials: true,
        headers: headers,
        body: JSON.stringify(request)
    }

    try {
        const response = await fetch(`http://${opt.ip}:${opt.port}`, options).then(a => a.json());
        if (callback) callback(response);

        return response;

    } catch (e) {
        return false;
    }

}

export const ping = async (callback: any) => { return await APIcall("ping", false, callback); };
export const enter = async () => { return await APIcall("enter"); };
export const back = async () => { return await APIcall("back"); };
export const getviewstack = async (callback: any) => { return await APIcall("getviewstack", false, callback); };
export const getgenres = async (callback: any) => { return await APIcall("getgenres", false, callback); };
export const getsorters = async (callback: any) => { return await APIcall("getsorters", false, callback); };
export const gettypes = async (callback: any) => { return await APIcall("gettypes", false, callback); };
export const getcurrenttab = async (callback: any) => { return await APIcall("getcurrenttab", false, callback); };
export const getfullscreen = async (callback: any) => { return await APIcall("getfullscreen", false, callback); };
export const getplayers = async (callback: any) => { return await APIcall("getplayers", false, callback); };
export const startstream = async (params: any) => { return await APIcall("startstream", params); };
export const setplayer = async (params: any) => { return await APIcall("setplayer", params); };
export const listennotifications = async (callback: any) => { return await APIcall("listennotifications", false, callback); };
export const nextseason = async () => { return await APIcall("nextseason"); };
export const previousseason = async () => { return await APIcall("previousseason"); };
export const selectepisode = async (params: any) => { return await APIcall("selectepisode", params); };
export const togglequality = async () => { return await APIcall("togglequality"); };
export const watchtrailer = async () => { return await APIcall("watchtrailer"); };
export const getselection = async (params: any, callback: any) => { if (typeof params === "function") { callback = params; params = false; } return await APIcall("getselection", params, callback); };
export const getcurrentlist = async (params: any, callback: any) => { if (typeof params === "function") { callback = params; params = false; } return await APIcall("getcurrentlist", params, callback); };
export const getsubtitles = async (callback: any) => { return await APIcall("getsubtitles", false, callback); };
export const togglemute = async () => { return await APIcall("togglemute"); };
export const togglefullscreen = async () => { return await APIcall("togglefullscreen"); };
export const toggleplaying = async () => { return await APIcall("toggleplaying"); };
export const volume = async (params: any, callback?: any) => { if (typeof params === "function") { callback = params; params = false; } return await APIcall("volume", params, callback); };
export const getplaying = async (callback: any) => { return await APIcall("getplaying", false, callback) };
export const seek = async (params: any) => { return await APIcall("seek", params); };
export const subtitleoffset = async (params: any) => { return await APIcall("subtitleoffset", params); };
export const setsubtitle = async (params: any) => { return await APIcall("setsubtitle", params); };
export const getstreamurl = async (callback: any) => { return await APIcall("getstreamurl", false, callback); };
export const toggletab = async () => { return await APIcall("toggletab"); };
export const showslist = async () => { return await APIcall("showslist"); };
export const animelist = async () => { return await APIcall("animelist"); };
export const movieslist = async () => { return await APIcall("movieslist"); };
export const showwatchlist = async () => { return await APIcall("showwatchlist"); };
export const showfavourites = async () => { return await APIcall("showfavourites"); };
export const showabout = async () => { return await APIcall("showabout"); };
export const showsettings = async () => { return await APIcall("showsettings"); };
export const togglewatched = async () => { return await APIcall("togglewatched"); };
export const togglefavourite = async () => { return await APIcall("togglefavourite"); };
export const clearsearch = async () => { return await APIcall("clearsearch"); };
export const filtergenre = async (params: any) => { return await APIcall("filtergenre", params); };
export const filtersorter = async (params: any) => { return await APIcall("filtersorter", params); };
export const filtertype = async (params: any) => { return await APIcall("filtertype", params); };
export const filtersearch = async (params: any) => { return await APIcall("filtersearch", params); };
export const setselection = async (params: any) => { return await APIcall("setselection", params); };
export const up = async () => { return await APIcall("up"); };
export const down = async () => { return await APIcall("down"); };
export const right = async () => { return await APIcall("right"); };
export const left = async () => { return await APIcall("left"); };

