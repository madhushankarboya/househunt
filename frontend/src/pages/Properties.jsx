import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function Properties() {
  const [properties, setProperties] = useState([]);

  // Mock data - replace with real API call later
  useEffect(() => {
    setProperties([
      {
        id: 1,
        title: "Modern Apartment",
        price: 1500,
        bedrooms: 2,
        image: "/placeholder.jpg"
      },
      {
        id: 2, 
        title: "Cozy Cottage",
        price: 1200,
        bedrooms: 3,
        image: "/placeholder.jpg"
      }
    ]);
  }, []);

  return (
    <div className="properties-page">
      <h2>Available Properties</h2>
      <div className="property-list">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}