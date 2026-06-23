export async function fetchHomeData() {
  try {
    const res = await fetch("/api/", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
