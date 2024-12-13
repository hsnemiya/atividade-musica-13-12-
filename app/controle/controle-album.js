const Album = require("../modelo/album");
const getPool = require("./controle-db").getPool;

exports.insertAlbum = async function(album) {
    var pool = getPool();

    var sql = "INSERT INTO album (titulo, genero, capa) VALUES (?, ?, ?)";
    var values = [album.titulo, album.genero, album.capa];

    var result = await pool.execute(sql, values);

    pool.end();

    return result[0].insertId;
}

exports.selectAllAlbums = async function() {
    var pool = getPool();

    var sql = "SELECT * FROM album";
    var [rows, fields] = await pool.execute(sql);

    // var lista_artistas = []
    // for (r of rows) {
    //     var a = new Artista(r.nome, r.pais, r.data_nasc, r.foto);
    //     a.id = r.id;

    //     lista_artistas.push(a);
    // }

    pool.end();

    return rows;
    // return lista_artistas;
}