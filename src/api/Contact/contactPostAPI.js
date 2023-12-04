const BASE_URL = 'https://6537334fbb226bb85dd2ebda.mockapi.io/fer_lab';
const API_KEY = '';

const contactPostAPI = {

  add(data) {
    const url = `${BASE_URL}/contact`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${API_KEY}`,
      },
  
      body: JSON.stringify(data),
      credentials: 'same-origin'
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

export default contactPostAPI;
