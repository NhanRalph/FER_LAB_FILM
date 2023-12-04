const BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTRkY2NmZDlkYTRmMzMyOGE1ZWU5ZDFjYzIwNzZiYSIsInN1YiI6IjY1MmRmZmQ1Y2FlZjJkMDExY2M2NzUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owN7ACx_gLYCspQdgN3eQ6qDdDsd99OMTm-FSHXvCT8'; // Replace with your API key

const filmByIDAPI = {


  getById(id) {
    const url = `${BASE_URL}/${id}`;
    console.log(url);
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  },
};

export default filmByIDAPI;
