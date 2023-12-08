const VITE_BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST || "http://localhost:3006";

const loginApi = async (email, password) => {
    try {
      const response = await fetch(`${VITE_BACKEND_HOST}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Verifica si la solicitud fue exitosa (código de estado 2xx) antes de intentar obtener los datos.
      if (response.ok) {
        return response;
      } else {
        // Maneja el caso en el que la solicitud no fue exitosa.
        throw new Error(`ERROR en la solicitud: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      // Maneja errores relacionados con la red o cualquier otra excepción.
      console.error('Error en la solicitud:', error.message);
      throw error; // Puedes manejar el error de otra manera según tus necesidades.
    }
  };

export default loginApi;
