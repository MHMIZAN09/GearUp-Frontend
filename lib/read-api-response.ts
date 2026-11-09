export async function readApiResponse<T>(response: Response): Promise<T> {
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`Backend request failed with ${response.status}: ${body.slice(0, 200)}`);
  }

  try {
    return JSON.parse(body) as T;
  } catch {
    throw new Error(`Backend returned an invalid JSON response: ${body.slice(0, 200)}`);
  }
}
