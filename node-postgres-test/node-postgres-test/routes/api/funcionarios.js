//dependencies
const express = require('express');
const router = express.Router();
const pg = require("pg");
const cs = "postgres://postgres:2846@localhost:5433/trabd";

router.get("/login", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`SELECT (pessoa).documento, cargo \
      FROM public.funcionario \
      WHERE login = '${req.query.login}' AND senha = '${req.query.senha}';`)
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
            res.json('Deu erro na query login!');
        } else {
            if (rows.length !== 0) {
                res.json(rows);
                } else {
                res.json('Usuário não encontrado!');
            }
        }
      });
});

router.get("/all", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    let erro;
    client.connect();
    client
      .query(`SELECT login, (pessoa).nome, (pessoa).documento, cargo, cargahr \
      FROM public.funcionario WHERE status = 'A';`)
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
      .query(`SELECT login, (pessoa).nome, (pessoa).documento, cargo, cargahr \
      FROM public.funcionario \
      WHERE (pessoa).documento='${req.query.documento}' and status = 'A';`)
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
      .query(`INSERT INTO public.funcionario (pessoa, login, senha, cargo, cargahr)
        VALUES (('${req.body.documento}', '${req.body.nome}', 'A'), 
        '${req.body.login}', '${req.body.senha}', '${req.body.role}', '${req.body.cargahr}');`)
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
    .query(`UPDATE public.funcionario
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

router.post("/update", async (req, res, next) => {
  const client = new pg.Client(cs);
  const rows = [];
  let erro;
  client.connect();
  client
    .query(`UPDATE public.funcionario
    SET pessoa.nome = '${req.body.nome}', login = '${req.body.login}', senha = '${req.body.senha}',
    cargahr = '${req.body.cargahr}', cargo = '${req.body.role}'
    WHERE (pessoa).documento = '${req.body.documento}' and status = 'A';`)
    .then(result => {
      result.rows.map(r => {
          rows.push(r);
      });
      client.end();
      res.json('UPDATE feito!');
      })
      .catch(err => {
      client.end();
      res.json('Houve um erro na query update!');
      });
});

module.exports = router;