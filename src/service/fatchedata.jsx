export const FetchAllData = async () => {
    const res = await fetch('http://localhost:5000/allidea');
    const data = await res.json();
    return data;
}