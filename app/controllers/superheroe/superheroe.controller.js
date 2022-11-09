
const { request } = require('express');
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const getSuperheroe = async (req, res) => {

    try {
        let sql = 'select * from superheroes';
        let result = await _pg.executeSql(sql);
        let rows = result.rows;

        const _excel = new ExcelService();

        await _excel.createWorkSheet(rows);

        return res.send({
            url: 'http://localhost:3001/superheroes.xlsx',
            ok: true,
            message: "Superheroes consultados",
            content: rows,
        })

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando al superheroe",
            content: error,
        })
    }

}

const createSuperheroe = async (req, res) => {
    try {
        let superheroe = req.body;
        let sql = `INSERT INTO public.superheroes (name, email) VALUES ('${superheroe.name}','${superheroe.email}');`;
        let result = await _pg.executeSql(sql);
        if (result.rowCount==1) {
            _email.sendEmail(superheroe.email);
        }
        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Superheroe creado" : "El superheroe no fue creado",
            content: superheroe,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando el superheroe",
            content: error,
        })
    }
}

const updateSuperheroe = async (req, res) => {
    try {
        let id = req.params.id;
        let superheroe = req.body;

        let sql = `UPDATE public.superheroes 
        SET name='${superheroe.name}', email='${superheroe.email}' 
        WHERE id='${id}';`;
        let result = await _pg.executeSql(sql);

        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Datos actualizados" : "El super no fue actualizado",
            content: superheroe,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error modificando al super",
            content: error,
        })
    }
}

const deleteSuperheroe = async (req, res) => {
    try {
        let id =req.params.id;
        let sql = `DELETE FROM public.superheroes WHERE id='${id}';`;
        let result = await _pg.executeSql(sql);

        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Super eliminado" : "El superheroe no fue eiminado",
            content: id,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error eliminando el superheroe",
            content: error,
        })
    }
}

module.exports = { getSuperheroe, createSuperheroe, updateSuperheroe, deleteSuperheroe }