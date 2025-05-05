export default function getGenreArray(genreArr: string | undefined) {
    if (genreArr) {
        const strArr: string[] = genreArr.split(",");
        if (strArr?.length > 0) {
            return strArr;
        }
    }
    return [];
}