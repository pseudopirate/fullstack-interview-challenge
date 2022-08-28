export async function getData<T>(url: string) {
    const resp = await fetch(url, { method: 'GET' });
    return resp.json() as Promise<T>;
}

export async function sendData<TResp, TData>(url: string, data: TData) {
    const resp = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );

    return resp.json() as Promise<TResp>;
}
