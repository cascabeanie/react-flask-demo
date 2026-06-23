export async function fetchImages() {
  try {
    const res = await fetch("/api/species/images", {
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
