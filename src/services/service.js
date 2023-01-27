export const getCityByName = async function({
    name
}){
    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + name, {method: "GET"});

    if (response.ok){
        return await response.json();
    }
    else {
        console.log("https://geocoding-api.open-meteo.com/v1/search?name=" + name);
        throw new Error("Erreur lors du getCity");
    }
};

