export default async function (_id) {
    try {
        const resposne = await fetch(`/api/v1/user/${_id}`)
        const data = await resposne.json()
        return data
    } catch (error) {
        console.error(`Error durring login ${error}`);
    }

}