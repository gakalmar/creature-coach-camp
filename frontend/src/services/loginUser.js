export default async function loginUser(messageBody) {
    try {
        const res = await fetch('/api/v1/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageBody)
        })

        const data = await res.json();

        if (data.error) {
            return alert(data.error)
        }

        if (!res.ok) {
            return alert("Can't log in !")
        }

        alert('User logged in successfully!')
        return data;

    } catch (error) {
        console.error(`Error durring login ${error}`);
    }
};