export async function getData<T>(url: string) {
    const resp = await fetch(url, { method: 'GET' });
    return resp.json() as Promise<T>;
}

export async function sendData<T>(url: string, data: T) {
    await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );
}
