// GroupForm.jsx

import React from 'react';


const GroupForm = () => {

  return (
    <form>
        <label>
          Nombre del grupo:
          <input type="text" name="groupName" />
        </label>
        <label>
          Descripción:
          <input type="text" name="description" />
        </label>
        <label>
          Agregar usuarios:
            <input type="text" name="users" />
        </label>
        <input type="submit" value="Crear Grupo" />
      </form>
  );
};

export default GroupForm;
