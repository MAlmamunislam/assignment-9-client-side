export const FetchAllData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/allidea`);
    const data = await res.json();
    return data;
}
