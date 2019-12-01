// EXEMPLO UPDATE

app.get("/", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    client.connect();
    client
        .query("UPDATE public.funcionario \
        SET funcionario.login='gkojima' \
        WHERE documento = '44246410999';")
        .then(result => {
        result.rows.map(r => {
            rows.push(r);
        });
        client.end();
        res.json('UPDATE feito!');
        })
        .catch(err => {
        client.end();
        res.json('Houve um erro na query UPDATE!');
        });
});

// EXEMPLO GET
app.get("/", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    client.connect();
    client
      .query("SELECT documento, nome, status, (funcionario).login \
      FROM public.funcionario WHERE documento = '44246410999';")
      .then(res => {
        res.rows.map(r => {
          rows.push(r);
        });
      })
      .catch(err => {
        next(err);
      })
      .finally(() => {
        client.end();
        if (rows.length !== 0) {
          res.json(rows);
        } else {
          res.json('Deu erro no SELECT!');
        }
      });
});

// EXEMPLO INSERT
app.get("/", async (req, res, next) => {
    const client = new pg.Client(cs);
    const rows = [];
    client.connect();
    client
        .query("INSERT INTO public.funcionario( \
          documento, nome, status, funcionario) \
          VALUES ('11111111111', 'Guilherme Cardoso Fuentes', 'A', ('gfuentes', '1234', 'admin', '08:00:00'));")
        .then(result => {
        result.rows.map(r => {
            rows.push(r);
        });
        client.end();
        res.json('INSERT feito!');
        })
        .catch(err => {
        client.end();
        res.json('Houve um erro na query INSERT!');
        });
});

