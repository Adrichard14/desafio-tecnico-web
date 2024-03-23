export default function getGenreTitles(genreArr: number[], genreMap: Map<number, string>) {
  if (genreArr?.length > 0) {
    let genreStr: string = "";
    genreArr.map((id: number, index: number) => {
      if (index === genreArr.length - 1) {
        genreStr += genreMap.get(id);
      } else {
        genreStr += genreMap.get(id) + ", ";
      }
    });
    return genreStr;
  }
}