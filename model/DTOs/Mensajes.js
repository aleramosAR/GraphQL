function mensajeDTO(mensaje) {
	return {
		...mensaje,
		texto: mensaje.texto.toUpperCase()
	};
}

export default mensajeDTO;