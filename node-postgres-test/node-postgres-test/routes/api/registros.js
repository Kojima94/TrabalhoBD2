//dependencies
const express = require('express');
const router = express.Router();
const pg = require("pg");
const cs = "postgres://postgres:2846@localhost:5433/trabd";

//functions
const gerarId = require('../../functions/idgenerator');

router.get("/allbydate", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`SELECT id, (funcionario.pessoa).nome, (registro).funcionario, (registro).tipo, (registro).data, (registro).hora
      FROM public.registro, public.funcionario WHERE (registro).status = 'A' AND (registro).data = '${req.query.data}'
	  AND (registro).funcionario = (funcionario.pessoa).documento;`)
      .then(res => {
        res.rows.map(r => {
          rows.push(r);
        });
      })
      .catch(err => {
        erro = err;
        next(err);
      })
      .finally(() => {
        client.end();
        if (erro) {
            res.json('Deu erro na query all!');
        } else {
            if (rows.length !== 0) {
                res.json(rows);
                } else {
                res.json('Nehum registro encontrado!');
            }
        }
      });
});

router.get("/allbydoc", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`SELECT id, (f.pessoa).nome, (r.registro).funcionario, (r.registro).tipo, (r.registro).data, (r.registro).hora
      FROM public.registro r, public.funcionario f  WHERE (r.registro).status = 'A'
	  AND f.status = 'A'
	  AND (f.pessoa).documento = (r.registro).funcionario
	  AND (r.registro).funcionario = '${req.query.documento}';`)
      .then(res => {
        res.rows.map(r => {
          rows.push(r);
        });
      })
      .catch(err => {
        erro = err;
        next(err);
      })
      .finally(() => {
        client.end();
        if (erro) {
            res.json('Deu erro na query all!');
        } else {
            if (rows.length !== 0) {
                res.json(rows);
                } else {
                res.json('Nehum registro encontrado com o funcionário informado!');
            }
        }
      });
});

router.get("/allbydocdate", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`SELECT id, (f.pessoa).nome, (r.registro).funcionario, (r.registro).tipo, (r.registro).data, (r.registro).hora
      FROM public.registro r, public.funcionario f  WHERE (r.registro).status = 'A'
      AND f.status = 'A'
      AND (f.pessoa).documento = (r.registro).funcionario
      AND (r.registro).funcionario = '${req.query.documento}'
      AND (r.registro).data = '${req.query.data}';`)
      .then(res => {
        res.rows.map(r => {
          rows.push(r);
        });
      })
      .catch(err => {
        erro = err;
        next(err);
      })
      .finally(() => {
        client.end();
        if (erro) {
            res.json('Deu erro na query all!');
        } else {
            if (rows.length !== 0) {
                res.json(rows);
                } else {
                res.json('Nehum registro encontrado com o funcionário e dara informados!');
            }
        }
      });
});

router.post("/inserir", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`INSERT INTO public.registro(
        registro)
        VALUES (('${req.body.documento}', '${req.body.tipo}', 'A', '${req.body.data}', '${req.body.hora}'));`)
      .then(result => {
        result.rows.map(r => {
            rows.push(r);
        });
        client.end();
        res.json('INSERT feito!');
        })
        .catch(err => {
        client.end();
        res.json('Houve um erro na query inserir!');
        });
});

router.post("/delete", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`UPDATE public.registro
      SET registro.status='I'
      WHERE (registro).funcionario = '${req.body.documento}' and (registro).data = '${req.body.data}'
      and (registro).hora = '${req.body.hora}';`)
      .then(result => {
        result.rows.map(r => {
            rows.push(r);
        });
        client.end();
        res.json('DELETE feito!');
        })
        .catch(err => {
        client.end();
        res.json('Houve um erro na query delete!');
        });
});

module.exports = router;