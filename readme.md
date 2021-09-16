# Reformar para usar GraphQL

* #### En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL.

Use GraphQL en las rutas de Mensajes y Productos.<br />
Las rutas de GraphQL de cada uno son:

```http://localhost:8080/api/productos/graphql```
```http://localhost:8080/api/mensajes/graphql```
<br /> <br/>
<hr />
<br />

* #### Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.

El front end esta funcionando ahora con GraphQL, las llamadas las hice desde axios, los scripts estan en:

```/public/js/main.js```
<br /> <br/>
<hr />
<br />

* #### Utilizar GraphQL para realizar la prueba funcional de los querys y las mutaciones.

Las rutas de GraphQL para testear son:

<br />

### Productos
<br />

```http://localhost:8080/api/productos/graphql```

Se puede testear corriendo estos scripts en GraphiQL:

```
query intro {
  intro
}

query viewProducts {
  products {
    ...productosFields
  }
}

query viewProduct {
  product(_id: "1") {
    ...productosFields
  }
}

mutation postProduct {
  postProduct(title: "Manzanas", price: 100, thumbnail: "14") {
    ...productosFields
  }
}

mutation updateProduct {
  updateProduct(_id: "3", title: "pera", price: 1100, thumbnail: "12") {
    ...productosFields
  }
}

mutation deleteProduct {
  deleteProduct(_id: "1") {
    ...productosFields
  }
}

fragment productosFields on Producto {
  title
  price
  thumbnail
  _id
}
```

<br />

### Mensajes
<br />

```http://localhost:8080/api/mensajes/graphql```

Se puede testear corriendo estos scripts en GraphiQL:

```
query intro {
  intro
}

query viewMensajes {
  mensajes {
    ...mensajesFields
  }
}

mutation postMensaje {
  postMensaje(username: "Ale", texto: "Hola") {
    ...mensajesFields
  }
}

fragment mensajesFields on Mensaje {
  username
  texto
  fecha
  _id
}
```