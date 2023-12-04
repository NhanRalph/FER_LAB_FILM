const BASE_URL = 'https://6537334fbb226bb85dd2ebda.mockapi.io/fer_lab';
const API_KEY = '';

const contactUpdateAPI = {


    update(data) {
        const url = `${BASE_URL}/contact/${data.id}`;
    
        return fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${API_KEY}`,
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
    

};

export default contactUpdateAPI;
