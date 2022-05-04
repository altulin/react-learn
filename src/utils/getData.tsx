interface Value {
  email?: string;
  password?: string;
}

export async function getData(url: string, value: Value) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });

    const json = await response.json();

    if (json.success) {
      return json;
    } else {
      return Promise.reject(`Ошибка ${json.status}`);
    }
  } catch (err) {
    console.error('Ошибка:', err);
  }
}
