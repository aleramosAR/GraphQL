function productoDTO(producto) {
	return {
		...producto,
		title: producto.title.toUpperCase()
	};
}

export default productoDTO;