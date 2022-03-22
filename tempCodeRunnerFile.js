     var sql='INSERT INTO LOGIN (EMAIL,PASSWORD) VALUES ('+useremail+','+userpassword+')';

        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Values inserted into table login");
    });
    })