//dependencies
const express = require('express');
const router = express.Router();
const pg = require("pg");
const cs = "postgres://postgres:2846@localhost:5433/trabd";

router.get("/all", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`SELECT (pessoa).documento, (pessoa).nome, contato
      FROM public.externo where STATUS = 'A';`)
      .then(res => {
        res.rows.map(r => {
          rows.push(r);
        });
        console.log(rows);
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
                res.json('Nehum usuário encontrado!');
            }
        }
      });
});

router.get("/bydoc", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`SELECT (pessoa).documento, (pessoa).nome, (pessoa).status, contato
      FROM public.externo
      WHERE (pessoa).documento='${req.query.documento}';`)
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
                res.json('Nehum usuário encontrado!');
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
      .query(`INSERT INTO public.externo(
        pessoa, contato)
        VALUES (('${req.body.documento}', '${req.body.nome}', 'A'), ${req.body.contato});`)
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
    .query(`UPDATE public.externo
    SET status='I'
    WHERE (pessoa).documento = '${req.body.documento}';`)
    .then(result => {
      result.rows.map(r => {
          rows.push(r);
      });
      client.end();
      res.json('DELETE feito!');
      })
      .catch(err => {
      client.end();
      res.json('Houve um erro na query update!');
      });
});

module.exports = router;