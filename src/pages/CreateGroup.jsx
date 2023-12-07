//CreateGroup.jsx

import React from 'react';

function CreateGroup() {
  return (
    <div>
      <h1>Crear grupo</h1>
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
    </div>
  );
}

export default CreateGroup;