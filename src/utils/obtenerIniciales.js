function obtenerIniciales(username) {
    const palabras = username.split(/\s+/); // Dividir por espacios
    let iniciales = "";

    for (let i = 0; i < palabras.length; i++) {
        const palabra = palabras[i];
        if (palabra.length > 0) {
            iniciales += palabra[0].toUpperCase();
        }
    }

    return iniciales;
}

export default obtenerIniciales;