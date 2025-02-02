-- Insertar datos en la tabla Categorías
INSERT INTO Categorias (Nombre) VALUES
("Mujer"),
("Hombre"),
("Niños"),
("Accesorios");

-- Insertar datos en la tabla Productos
INSERT INTO Productos (Nombre, Descripcion, Precio, ImagenURL, CategoriaID) VALUES
("Vestido de Verano", "Vestido ligero y cómodo para el verano.", 49.99, "/images/vestido_verano.jpg", 1),
("Camisa de Hombre", "Camisa de algodón de alta calidad.", 29.99, "/images/camisa_hombre.jpg", 2),
("Zapatos para Niños", "Zapatos deportivos para niños.", 39.99, "/images/zapatos_ninos.jpg", 3),
("Bolso de Mano", "Bolso de mano elegante.", 59.99, "/images/bolso_mano.jpg", 4),
("Chaqueta de Cuero", "Chaqueta de cuero auténtico.", 89.99, "/images/chaqueta_cuero.jpg", 2),
("Pantalones Cortos", "Pantalones cortos de verano.", 34.99, "/images/pantalones_cortos.jpg", 1);

-- Insertar datos en la tabla Usuarios
INSERT INTO Usuarios (Nombre, Correo, Contrasena) VALUES
("Juan Pérez", "juan.perez@example.com", "contrasena123"),
("María López", "maria.lopez@example.com", "contrasena456"),
("Carlos García", "carlos.garcia@example.com", "contrasena789");

-- Insertar datos en la tabla Pedidos
INSERT INTO Pedidos (UsuarioID) VALUES
(1),
(2),
(3);

-- Insertar datos en la tabla DetallesPedido
INSERT INTO DetallesPedido (PedidoID, ProductoID, Cantidad, PrecioUnitario) VALUES
(1, 1, 2, 49.99),  -- 2 Vestidos de Verano
(1, 2, 1, 29.99),  -- 1 Camisa de Hombre
(2, 3, 1, 39.99),  -- 1 Zapato para Niños
(3, 4, 1, 59.99);  -- 1 Bolso de Mano

use moda; 
select * from Productos;