export default function getGenreTitles(genreArr: string | undefined) {
  if (genreArr) {
    const strArr = genreArr.split(",");
    if (strArr?.length > 0) {
      let genreStr: string = "";
      strArr.map((name: string, index: number) => {
        if (index === strArr.length - 1) {
          genreStr += name;
        } else {
          genreStr += name + ", ";
        }
      });
      return genreStr;
    }
  }
}