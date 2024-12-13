create database player_musicas;
use player_musicas;

CREATE TABLE IF NOT EXISTS `artista` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`nome` varchar(256) NOT NULL,
	`pais` varchar(2) NOT NULL,
	`data_nasc` date NOT NULL,
	`foto` varchar(1024) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `album` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`titulo` varchar(256) NOT NULL,
	`genero` varchar(20) NOT NULL,
	`capa` varchar(1024) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `musica` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`titulo` varchar(256) NOT NULL,
	`arquivo` varchar(1024) NOT NULL,
	`duracao` int NOT NULL,
	`genero` varchar(40) NOT NULL,
	`id_album` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `artista_musica` (
	`id_artista` int NOT NULL,
	`id_musica` int NOT NULL,
	PRIMARY KEY (`id_artista`, `id_musica`)
);



ALTER TABLE `musica` ADD CONSTRAINT `musica_fk5` FOREIGN KEY (`id_album`) REFERENCES `album`(`id`);
ALTER TABLE `artista_musica` ADD CONSTRAINT `artista_musica_fk0` FOREIGN KEY (`id_artista`) REFERENCES `artista`(`id`);

ALTER TABLE `artista_musica` ADD CONSTRAINT `artista_musica_fk1` FOREIGN KEY (`id_musica`) REFERENCES `musica`(`id`);