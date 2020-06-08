
const API_KEY = "9f9324cd";


//fetch search data from omdb api
export const fetchMovies = async (response, page) => {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${response}`;
  try {
    let response = await fetch(url);
    if(page) {
      response = await fetch(url + `&page=${page}`)
    }
    const { Search } = await response.json();
    return Search;
  } catch (err) {
    return console.log(err);
  }
};

//fetch ID from omdb api
export const fetchById = async id => {
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (err) {
    return console.log(err);
  }
};