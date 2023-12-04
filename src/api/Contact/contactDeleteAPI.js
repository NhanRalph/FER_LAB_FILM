const BASE_URL = 'https://6537334fbb226bb85dd2ebda.mockapi.io/fer_lab';

const contactGetAPI = {
    remove(id) {
        const url = `${BASE_URL}/contact/${id}`;
    
        return fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${API_KEY}`,
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

export default contactGetAPI;
