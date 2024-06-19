export default async function fetchCreatures(){
    try {
        const res = await fetch('/api/v1/creatures');
        return await res.json();
    } catch (err) {
        console.error(`Error fetching creatures! ${err}`);
    }
}