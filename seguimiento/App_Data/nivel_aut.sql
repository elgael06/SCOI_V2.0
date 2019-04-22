use seguimiento_2;

create table menus(FOLIO int, MENU varchar(60),ESTADO Char(1));
SELECT * FROM MENUS;

INSERT INTO menus(FOLIO,MENU,ESTADO) VALUES(1,'Gestión Infraestructura',1);
INSERT INTO menus(FOLIO,MENU,ESTADO) VALUES(2,'Gestión Estrategica',1);
INSERT INTO menus(FOLIO,MENU,ESTADO) VALUES(3,'Despliegue de Procesos',1);
INSERT INTO menus(FOLIO,MENU,ESTADO) VALUES(4,'Hoshin Kanri',1);
INSERT INTO menus(FOLIO,MENU,ESTADO) VALUES(5,'Catalogos',1);
INSERT INTO menus(FOLIO,MENU,ESTADO) VALUES(6,'Alimentacion',1);

create table sub_menu(FOLIO int, SUB_MENU varchar(60), FOLIO_MENU TINYINT,ESTADO Char(1));
SELECT * FROM sub_menu;

/**Gestión Infraestructura**********************************/
INSERT INTO sub_menu(FOLIO, SUB_MENU, FOLIO_MENU, ESTADO) VALUES(1,'Gestión de Organigrama',1,1);
INSERT INTO sub_menu(FOLIO, SUB_MENU, FOLIO_MENU, ESTADO) VALUES(2,'Gestión de Usuarios',1,1);
INSERT INTO sub_menu(FOLIO, SUB_MENU, FOLIO_MENU, ESTADO) VALUES(3,'Permisos de Usuarios',1,1);
INSERT INTO sub_menu(FOLIO, SUB_MENU, FOLIO_MENU, ESTADO) VALUES(4,'Gestión de Perfiles',1,1);
INSERT INTO sub_menu(FOLIO, SUB_MENU, FOLIO_MENU, ESTADO) VALUES(5,'Gestión de Relacion CP/UP',1,1);
INSERT INTO sub_menu(FOLIO, SUB_MENU, FOLIO_MENU, ESTADO) VALUES(6,'Nivel Acceso Usuarios',1,1);
/*Gestión Estrategica*/
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(7,'Gestión Unidades de Negocio',2,1);
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(8,'Gestión de Procesos',2,1);
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(9,'Gestión de Evidencias',2,1);
/*Despliegue de Procesos*************************************/
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(10,'Configuración y Despliegue',3,1);
/*Hoshin Kanri*/
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(11,'Mision, Vision, Valores',4,1);
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(12,'Objetivos estrategicos',4,1);
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(13,'Seguimiento Indicadores',4,1);
/*Catalogos*************************************************/
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(14,'Etapas',5,1);
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(15,'Unidades de Inspeccion',5,1);
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(16,'Elementos de Inpeccion',5,1);
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(17,'Matrices',5,1);
/*Alimentacion*/
INSERT INTO sub_menu(FOLIO,SUB_MENU,FOLIO_MENU,ESTADO) VALUES(18,'Alimentacion Matrizs',6,1);

/****/
create table sub_menu_por_usuario(FOLIO smallint, usuario int, FOLIO_SUB_MENU TINYINT,ESTADO BIT);
SELECT * FROM sub_menu_por_usuario;
