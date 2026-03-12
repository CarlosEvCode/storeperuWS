CREATE DATABASE storeperu;
USE storeperu;
CREATE TABLE marcas (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    nombreM VARCHAR(30)
) ENGINE = INNODB;

CREATE TABLE productos (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    id_marca    INT NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    precio      DOUBLE NOT NULL,
    stock       INT,
    garantia    TINYINT,

    CONSTRAINT fk_productos_marcas
    FOREIGN KEY (id_marca)
    REFERENCES marcas(id)

) ENGINE = INNODB;

INSERT INTO marcas (nombreM) VALUES
('Samsung'),
('LG'),
('Sony'),
('HP'),
('Lenovo');

INSERT INTO productos (id_marca, descripcion, precio, stock, garantia) VALUES
(1,'Televisor 55 pulgadas',2500,10,12),
(2,'Refrigeradora LG',1800,5,24),
(3,'PlayStation 5',3200,7,12),
(4,'Laptop HP i5',2800,8,12),
(5,'Laptop Lenovo Ryzen 5',2600,6,12);

SELECT * FROM marcas;
SELECT * FROM productos;
