const socket = io.connect();
let URL_BASE = '';

function clickDesloguear() {
  window.location.replace("/logout");
  return false;
}

socket.on('initApp', data => { 
  URL_BASE = `http://localhost:${data.PORT}`;
});

if(window.location.pathname.split('/').pop() == 'index') {
  // Al agregar items recibo los eventos 'listProducts' o 'listMensajes' y actualizo la interface.
  socket.on('listProducts', data => { renderProducts(data) });
  socket.on('listMensajes', data => { renderMensajes(data) });

  async function renderProducts(data) {
    const archivo = await fetch('plantillas/tabla.hbs');
    const archivoData = await archivo.text();
    const template = Handlebars.compile(archivoData);
    const result = template({ productos: data });
    document.getElementById('productos').innerHTML = result;
  }

  async function renderMensajes(data) {
    const archivo = await fetch('plantillas/mensajes.hbs');
    const archivoData = await archivo.text();
    const template = Handlebars.compile(archivoData);
    const result = template({ mensajes: data });
    document.getElementById('mensajes').innerHTML = result;
  }
};


// Agregar un nuevo producto.
function addProduct(e) {
  const inputTitle = document.getElementById('title');
  const inputPrice = document.getElementById('price');
  const inputThumb = document.getElementById('thumbnail');
  if (inputTitle.value == '' || inputPrice.value == '' || inputThumb.value == '') {
    alert('Por favor complete el formulario para agregar un nuevo producto.')
  } else {
    const newProd = {
      "title": inputTitle.value,
      "price": inputPrice.value,
      "thumbnail": inputThumb.value
    };
    agregarProducto(`${URL_BASE}/api/productos/graphql`, newProd)
    .then(() => {
      socket.emit('postProduct');
      inputTitle.value = '';
      inputPrice.value = '';
      inputThumb.value = '';
    }).catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
  return false;
}

// Actualizar un producto
function updateProduct(e) {
  const inputID = document.getElementById('idUp');
  const inputTitle = document.getElementById('titleUp');
  const inputPrice = document.getElementById('priceUp');
  const inputThumb = document.getElementById('thumbnailUp');
  if (inputID.value == "") {
    alert('Por favor ingresa el ID del producto a actualizar.')
  }  else if (inputTitle.value == "" && inputPrice.value == "" && inputThumb.value == "") {
    alert('Por favor seleccione algun campo para actualizar.')
  } else {
    const newProd = {};
    if (inputID.value != "") {
      newProd._id = inputID.value;
    }
    if (inputTitle.value != "") {
      newProd.title = inputTitle.value;
    }
    if (inputPrice.value != "") {
      newProd.price = inputPrice.value;
    }
    if (inputThumb.value != "") {
      newProd.thumbnail = inputThumb.value;
    }
    actualizarProducto(`${URL_BASE}/api/productos/graphql`, newProd)
    .then(() => {
      socket.emit('updateProduct');
      inputID.value = '';
      inputTitle.value = '';
      inputPrice.value = '';
      inputThumb.value = '';
    }).catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
  return false;
}

// Eliminar producto.
function deleteProduct(e) {
  const inputID = document.getElementById('id');
  if (inputID.value == '') {
    alert('Por favor complete el formulario para eliminar el producto.')
  } else {
    eliminarProducto(`${URL_BASE}/api/productos/graphql`, inputID.value)
    .then(() => {
      socket.emit('deleteProduct');
      inputID.value = '';
    }).catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
  return false;
}

// Agregar un nuevo mensaje.
function addMensaje(e) {
  const inputUsuario = document.getElementById('username');
  const inputTexto = document.getElementById('texto');
  
  if (inputUsuario.value == '' || inputTexto.value == '') {
    alert('Por favor complete el formulario para enviar un mensaje.')
  } else {
    const newMensaje = { username: inputUsuario.value, texto: inputTexto.value };
    agregarMensaje(`${URL_BASE}/api/mensajes/graphql`, newMensaje)
    .then(() => {
      socket.emit('postMensaje');
      inputTexto.value = '';
      inputTexto.focus();
    }).catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
  return false;
}

// Funcion para hacer el POST de producto
async function agregarProducto(url = '', data = {}) {
  await axios.post(url, {
    query: `mutation postProduct($title:String!, $price:Int!, $thumbnail:String!) {
      postProduct(title:$title, price:$price, thumbnail:$thumbnail) {
        title
        price
        thumbnail
        _id
      }
    }`,
    variables: {
      title: data.title,
      price: parseInt(data.price),
      thumbnail: data.thumbnail
    }
  },{
    headers: { 'Content-Type': 'application/json' }
  })
  .then(function(res) {
    if(res.status==200) {
      console.log(res);
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

// Funcion para hacer el PUT de producto
async function actualizarProducto(url = '', data = {}) {
  await axios.post(url, {
    query: `mutation updateProduct($_id:String!, $title:String, $price:Int, $thumbnail:String) {
      updateProduct(_id: $_id, title: $title, price: $price, thumbnail: $thumbnail) {
        title
        price
        thumbnail
        _id
      }
    }`,
    variables: {
      _id: data._id,
      title: data.title,
      price: parseInt(data.price),
      thumbnail: data.thumbnail
    }
  },{
    headers: { 'Content-Type': 'application/json' }
  })
  .then(function(res) {
    if(res.status==200) {
      console.log(res);
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

// Funcion para hacer el DELETE de producto
async function eliminarProducto(url = '', id) {
  await axios.post(url, {
    query: `mutation deleteProduct($_id:String!) {
      deleteProduct(_id: $_id) {
        title
        price
        thumbnail
        _id
      }
    }`,
    variables: {
      _id: id
    }
  },{
    headers: { 'Content-Type': 'application/json' }
  })
  .then(function(res) {
    if(res.status==200) {
      console.log(res);
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

// Funcion para hacer el POST de mensaje
async function agregarMensaje(url = '', data = {}) {
  await axios.post(url, {
    query: `mutation postMensaje($username:String!, $texto:String!) {
      postMensaje(username:$username, texto:$texto) {
        username
        texto
        fecha
        _id
      }
    }`,
    variables: {
      username: data.username,
      texto: data.texto
    }
  },{
    headers: { 'Content-Type': 'application/json' }
  })
  .then(function(res) {
    if(res.status==200) {
      console.log(res);
    }
  })
  .catch(function(err) {
    console.log(err);;
  });
}


async function destroySession() {
  try {
    const res = await fetch(`${URL_BASE}/api/auth/logout`);
    if (res.status == 200) {
      redirectLogin();
    } else {
      alert("Hubo un problema al cerrar sesion.");
    }
  } catch (err) {
    alert(err)
  }
}

function redirectLogin() {
  setTimeout(function() {
    window.location.replace("/login");
  }, 2000);
}