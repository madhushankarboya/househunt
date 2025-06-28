import { useEffect, useState } from 'react';
import api from '../services/api';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties');
        setProperties(response.data.data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading properties...</div>;

  return (
    <div>
      <h2>Available Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            {property.title} - ${property.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
