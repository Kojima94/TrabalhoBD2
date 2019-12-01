//dependencies
const express = require('express');
const router = express.Router();
const pg = require("pg");
const cs = "postgres://postgres:2846@localhost:5433/trabd";

//functions
const gerarId = require('../../functions/idgenerator');

module.exports = router;

router.get("/allbydate", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`SELECT id, (t.pessoa).documento, (t.pessoa).nome, (e.extra).dataini, (e.extra).datafim, (e.extra).horaini, (e.extra).horafim
      FROM public.extra e, public.externo t WHERE (e.extra).status = 'A' and (e.extra).dataini = '${req.query.dataini}'
      and (e.extra).externo = (t.pessoa).documento;`)
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
      .query(`SELECT id, (t.pessoa).documento, (t.pessoa).nome, (e.extra).dataini, (e.extra).datafim, (e.extra).horaini, (e.extra).horafim
      FROM public.extra e, public.externo t  WHERE (e.extra).status = 'A'
      AND (t.pessoa).status = 'A'
      AND (e.extra).externo = (t.pessoa).documento
      AND (e.extra).externo = '${req.query.documento}';`)
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
            res.json('Deu erro na query bydoc!');
        } else {
            if (rows.length !== 0) {
                res.json(rows);
                } else {
                res.json('Nehum registro encontrado!');
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
      .query(`SELECT id, (t.pessoa).documento, (t.pessoa).nome, (e.extra).dataini, (e.extra).datafim, (e.extra).horaini, (e.extra).datafim
      FROM public.extra e, public.externo t  WHERE (e.extra).status = 'A'
      AND (t.pessoa).status = 'A'
      AND (e.extra).externo = (t.pessoa).documento
      AND (e.extra).externo = '${req.query.documento}'
      AND (e.extra).dataini = '${req.query.data}';`)
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
            res.json('Deu erro na query bydocdate!');
        } else {
            if (rows.length !== 0) {
                res.json(rows);
                } else {
                res.json('Nehum registro encontrado!');
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
      .query(`INSERT INTO public.extra(
        extra)
        VALUES (('${req.body.documento}', 'A', '${req.body.dataini}', '${req.body.datafim}', '${req.body.horaini}', '${req.body.horafim}'));`)
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
      .query(`UPDATE public.extra
      SET extra.status='I'
      WHERE (extra).externo = '${req.body.documento}' and (extra).dataini = '${req.body.dataini}'
      and (extra).horaini = '${req.body.horaini}';`)
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