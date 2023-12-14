const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3006";

const loginApi = async (email, password) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
};

const registerApi = async (
    username,
    email,
    mobile,
    password,
    passwordVerify
) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                mobile,
                password,
                passwordVerify,
            }),
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
};

const logoutApi = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error(
                `ERROR en la solicitud: ${response.status} - ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
};

//Obtener tus grupos

const getMyGroups = async () => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/groups/my-groups`, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error("Error al obtener grupos");
        }
    } catch (error) {
        console.error("Error en la peticion de grupos", error.message);
        throw error;
    }
};


//Obtener informacion del grupo

const getGroupDetails = async (id) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/groups/${id}`, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error("Error al obtener información del grupo");
        }
    } catch (error) {
        console.error("Error en la peticion de grupo", error.message);
        throw error;
    }
}

const getUserDetails = async (id = null) => {
    try {
        let apiUrl;
        if (id) {
            apiUrl = `${VITE_BACKEND_HOST}/users/${id}`;
        } else {
            apiUrl = `${VITE_BACKEND_HOST}/users/me`;
        }
        const response = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error("Error al obtener datos de usuario");
        }
    } catch (error) {
        console.error("Error en la peticion de grupos", error.message);
        throw error;
    }
};

const updateUserDetails = async (data) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/users/me`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            return response;
        } else {
            throw new Error("Error al actualizar datos de usuario");
        }
    } catch (error) {
        console.error("Error en la peticion de grupos", error.message);
        throw error;
    }
}

export { loginApi, registerApi, logoutApi, getMyGroups, getUserDetails, getGroupDetails, updateUserDetails };
