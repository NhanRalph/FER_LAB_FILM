const BASE_URL = 'https://6537334fbb226bb85dd2ebda.mockapi.io/fer_lab';

const contactGetAPI = {
  getContact() {
    const url = `${BASE_URL}/contact`;

    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${API_KEY}`,
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

  getContactById(id) {
    const url = `${BASE_URL}/contact/${id}`;

    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${API_KEY}`,z
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

export default contactGetAPI;
