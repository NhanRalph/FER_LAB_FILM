const BASE_URL = 'https://api.themoviedb.org/3/top_rated?language=en-US&page=1';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTRkY2NmZDlkYTRmMzMyOGE1ZWU5ZDFjYzIwNzZiYSIsInN1YiI6IjY1MmRmZmQ1Y2FlZjJkMDExY2M2NzUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.owN7ACx_gLYCspQdgN3eQ6qDdDsd99OMTm-FSHXvCT8'; // Replace with your API key

const filmTopRateAPI = {
  getMovies() {
    const url = `${BASE_URL}/film/`;

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

  getById(id) {
    const url = `${BASE_URL}/movie/${id}?language=en-US`;

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

  add(data) {
    const url = `${BASE_URL}/films`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
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

  update(data) {
    const url = `${BASE_URL}/films/${data.id}`;

    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
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

  remove(id) {
    const url = `${BASE_URL}/films/${id}`;

    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        throw error;
      });
  },
};

export default filmTopRateAPI;
