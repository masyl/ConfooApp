s.createServer();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000);
