export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places");
    const resData = await response.json();

    // checking that server does't throw an error due to many issues
    if (!response.ok) {
        throw new Error("Failed to fetch places...")
    }
    return resData.places;
}

export async function updateUserPlaces(places) {
    // we have to update the fetch configuration to update the data , in get we don't need to do it 
    // but we are using the put http verb soo we have to update it........................
    const response = await fetch("http://localhost:3000/user-places", {
        method: 'PUT',
        //places is an array but we have to conert it to json format
        body: JSON.stringify({places:places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json()

    if (!response.ok) {
        throw new Error('Failed to update the user data .....')
    }
    return resData.message
}