DROP TABLE Usuarios;

CREATE TABLE Usuarios(
	id_us INT AUTO_INCREMENT,
    id_te INT,
    username VARCHAR(20) NOT NULL,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    contrasena VARCHAR(20) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    CONSTRAINT Usuarios_PK PRIMARY KEY(id_us),
    CONSTRAINT Usuarios_UN UNIQUE(username),
    CONSTRAINT Usuarios_Telefonos_FK FOREIGN KEY(id_te) REFERENCES Telefonos(id_te)
);

DROP TABLE Telefonos;

CREATE TABLE Telefonos(
	id_te INT AUTO_INCREMENT,
    prefijo INT NOT NULL,
    numero INT NOT NULL,
    CONSTRAINT Telefonos_PK PRIMARY KEY(id_te)
);

DROP TABLE Prefijos;

CREATE TABLE Prefijos(
	id_pr INT AUTO_INCREMENT,
    pais VARCHAR(56) NOT NULL,
    numero INT NOT NULL,
    CONSTRAINT Prefijos_PK PRIMARY KEY(id_pr),
    CONSTRAINT Numero_Prefijos_UN UNIQUE(numero),
    CONSTRAINT Pais_Prefijos_UN UNIQUE(pais)
);

DROP TABLE Bolsillos;

CREATE TABLE Bolsillos(
	id_bo INT AUTO_INCREMENT,
    id_us INT NOT NULL,
    dinero DOUBLE NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(200),
    CONSTRAINT Bolsillos_PK PRIMARY KEY(id_bo),
    CONSTRAINT Usuarios_Bolsillos_FK FOREIGN KEY(id_us) REFERENCES Usuarios(id_us)
);

DROP TABLE Movimientos;

CREATE TABLE Movimientos(
	id_mo INT AUTO_INCREMENT,
    id_bo INT NOT NULL,
    monto DOUBLE NOT NULL,
    descripcion VARCHAR(200),
    fecha TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT Movimientos_PK PRIMARY KEY(id_mo),
    CONSTRAINT Movimientos_Bolsillos_FK FOREIGN KEY(id_bo) REFERENCES Bolsillos(id_bo)
);

INSERT INTO Usuarios (username, contrasena, correo) VALUES ('haiver', 'haiver123', 'haiver@mail.com');

SELECT * FROM Usuarios;

INSERT INTO Bolsillos (id_us, dinero, nombre) VALUES(1, 3000.1, 'Billar');

SELECT U.username, B.dinero FROM Bolsillos B INNER JOIN Usuarios U ON B.id_us = 1;

INSERT INTO Movimientos (id_bo, monto) VALUES(1, 500);

SELECT * FROM Movimientos;


