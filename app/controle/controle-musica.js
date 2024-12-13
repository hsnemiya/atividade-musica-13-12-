const Musica = require("../modelo/musica");
const getPool = require("./controle-db").getPool;

exports.insertMusica = async function(musica, id_album) {
    console.log(musica);
    console.log(id_album);
    var pool = getPool();

    var sql = "INSERT INTO musica (titulo, arquivo, duracao, genero, id_album) VALUES (?, ?, ?, ?, ?)";
    var values = [musica.titulo, musica.arquivo, musica.duracao, musica.genero, id_album];

    var result = await pool.execute(sql, values);

    pool.end();

    return result[0].insertId;
}

exports.insertMusicaArtista = async function(musica_id, lista_artistas_id) {
    var pool = getPool();

    var sql = "";
    
    var values = null;
    if (Array.isArray(lista_artistas_id)) {
        values = lista_artistas_id.map(item => [musica_id, item]);
        sql = "INSERT INTO artista_musica (id_musica, id_artista) VALUES ?";
    } else {
        values = [musica_id, lista_artistas_id];
        sql = "INSERT INTO artista_musica (id_musica, id_artista) VALUES (?, ?)";
    }

    console.log(values);    

    var result = await pool.execute(sql, values);

    pool.end();

    return result[0].insertId;
}

exports.selectAllMusicas = async function() {
    var pool = getPool();

    var sql = "SELECT * FROM musica";
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

exports.selectMusicasDoAlbum = async function(id_album) {
    var pool = getPool();

    var sql = "SELECT * FROM musica WHERE id_album = ?";
    var [rows, fields] = await pool.execute(sql, [id_album]);

    pool.end();

    return rows;
}