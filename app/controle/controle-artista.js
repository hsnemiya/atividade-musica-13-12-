const Artista = require("../modelo/artista");
const getPool = require("./controle-db").getPool;

exports.insertArtista = async function(artista) {
    var pool = getPool();

    var sql = "INSERT INTO artista (nome, pais, data_nasc, foto) VALUES (?, ?, ?, ?)";
    var values = [artista.nome, artista.pais, artista.dataNasc, artista.foto];

    var result = await pool.execute(sql, values);

    pool.end();

    return result[0].insertId;
}

exports.selectAllArtistas = async function() {
    var pool = getPool();

    var sql = "SELECT * FROM artista";
    var [rows, fields] = await pool.execute(sql);

    var lista_artistas = []
    for (r of rows) {
        var a = new Artista(r.nome, r.pais, r.data_nasc, r.foto);
        a.id = r.id;

        lista_artistas.push(a);
    }

    pool.end();

    return lista_artistas;
}

exports.selectArtistaPorID = async function(id) {
    var pool = getPool();

    var sql = "SELECT * FROM artista WHERE id = ?";
    var [rows, fields] = await pool.execute(sql, id);

    var r = rows[0];

    var a = new Artista(r.nome, r.pais, r.data_nasc, r.foto);
    a.id = r.id;

    pool.end();

    return a;
}