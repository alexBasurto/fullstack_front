import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3006";


const GroupEdit = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_HOST}/groups/${id}`);
        const data = await response.json();
        setGroup(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchGroup();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGroup({ ...group, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${VITE_BACKEND_HOST}/groups/${id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
      });
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <h2>Editar el grupo</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={group.name} onChange={handleInputChange} />
      </label>
        <label>
            Description:
            <input type="text" name="description" value={group.description} onChange={handleInputChange} />
        </label>
      <button type="submit">Save</button>
    </form>
    </>
  );
};

export default GroupEdit;