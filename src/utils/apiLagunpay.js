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

const registerApi = async (username, email, mobile, password, passwordVerify) => {
    try {
        const response = await fetch(`${VITE_BACKEND_HOST}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, mobile, password, passwordVerify }),
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

export {loginApi, registerApi};
