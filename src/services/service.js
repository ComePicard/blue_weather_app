export const getCityByName = async function({
    name,
    number
}){
    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + name + "&count=" + number, {method: "GET"});

    if (response.ok){
        return await response.json();
    }
    else {
        console.log("https://geocoding-api.open-meteo.com/v1/search?name=" + name);
        throw new Error("Erreur lors du getCityByName");
    }
};


export const getCityCurrentWeather = async function({
    latitude,
    longitude
}){
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current_weather=true", {method: "GET"});

    if (response.ok){
        return await response.json();
    }
    else {
        throw new Error("Erreur lors du GetCityCurrentWeather");
    }
};

