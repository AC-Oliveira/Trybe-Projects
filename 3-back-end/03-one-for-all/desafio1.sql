DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

USE SpotifyClone;

CREATE TABLE Planos (
	`plano_id` INT AUTO_INCREMENT,
    `plano` VARCHAR(200),
    `preço` DECIMAL(3,2),
    PRIMARY KEY (plano_id)
);

CREATE TABLE Usuarios (
	`usuario_id` INT AUTO_INCREMENT,
	`usuario` VARCHAR(200),
    `idade` INT,
	`plano_id` INT,
    PRIMARY KEY (usuario_id),
    FOREIGN KEY (plano_id) REFERENCES Planos(plano_id)
);

CREATE TABLE Artistas (
	`artista_id` INT AUTO_INCREMENT,
    `artista_nome` VARCHAR(200),
    PRIMARY KEY (artista_id)
);

CREATE TABLE Albuns (
	`album_id` INT AUTO_INCREMENT,
    `album_nome` VARCHAR(200),
    `artista_id` INT,
    PRIMARY KEY (album_id),
    FOREIGN KEY (artista_id) REFERENCES Artistas(artista_id)
);

CREATE TABLE Musicas (
	`musica_id` INT AUTO_INCREMENT,
    `musica_nome` VARCHAR(200),
    `album_id` INT,
    PRIMARY KEY (musica_id),
    FOREIGN KEY (album_id) REFERENCES Albuns(album_id)
);

CREATE TABLE Historico (
	`usuario_id` INT,
    `musica_id` INT,
    PRIMARY KEY (usuario_id, musica_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (musica_id) REFERENCES Musicas(musica_id)
);

CREATE TABLE Seguidos (
	`usuario_id` INT,
    `artista_id` INT,
    PRIMARY KEY (usuario_id, artista_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (artista_id) REFERENCES Artistas(artista_id)
);

INSERT INTO Planos (`plano_id`, `plano`, `preço`) 
VALUES
(1, 'gratuito', 0), (2, 'familiar', 7.99), (3, 'universitário', 5.99);

INSERT INTO Usuarios (`usuario_id`, `usuario`, `idade`, `plano_id`)
VALUES 
(1, 'Thati', 23, 1), (2, 'Cintia', 35, 2), (3, 'Bill', 20,3), (4, 'Roger', 45, 1);

INSERT INTO Artistas (`artista_id`, `artista_nome`)
VALUES
(1, 'Walter Phoenix'), (2, 'Peter Strong'), (3, 'Lance Day'), (4, 'Freedie Shannon');

INSERT INTO Albuns (`album_id`,`artista_id`, `album_nome`)
VALUES
(1, 1, 'Envious'), (2, 1, 'Exuberant'), (3, 2, 'Hallowed Steam'), (4, 3, 'Incandescent'),(5, 4, 'Temporary Culture');

INSERT INTO Musicas (`musica_id`, `album_id`, `musica_nome`)
VALUES
(1, 1, 'Soul For Us'), (2, 1, 'Reflections Of Magic'), (3, 1, 'Dance With Her Own'), (4, 2, 'Troubles Of My Inner Fire'), (5, 2, 'Time Fireworks'), (6, 3, 'Magic Circus'), (7, 3, 'Honey, So Do I'), (8, 3, 'Sweetie, Let''s Go Wild'),(9, 3, 'She Knows'), (10, 4, 'Fantasy For Me'), (11, 4, 'Celebration Of More'), (12, 4, 'Rock His Everything'),(13, 4, 'Home Forever'), (14, 4, 'Diamond Power'), (15, 4, 'Honey, Let''s Be Silly'), (16, 5, 'Thang Of Thunder'),(17, 5, 'Words Of Her Life'), (18, 5, 'Without My Streets');

INSERT INTO Historico (`usuario_id`, `musica_id`)
VALUES
(1, 1), (1, 6), (1, 14), (1, 16), (2, 13), (2, 17), (2, 2), (2, 15), (3, 4), (3, 16), (3, 6), (4, 3),(4, 18), (4, 11);

INSERT INTO Seguidos (`usuario_id`, `artista_id`)
VALUES
(1, 1), (1, 4), (1, 3), (2, 1), (2, 3), (3, 2), (3, 1), (4, 4);
