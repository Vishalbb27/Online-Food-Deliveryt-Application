// importing modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const Swal = require("sweetalert2")
// Pre setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));


var dname = ""
var dphone = ""

// connect database
var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '6366vishalbb178198',
        database: "foodDelivery"
})
createDatabase();

// create database
function createDatabase() {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
        con.query("CREATE DATABASE IF NOT EXISTS foodDelivery", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
        createTable();
        insertIntoTable();
    });
}

// create table
function createTable() {

    var sql = "CREATE TABLE IF NOT EXISTS CUSTOMER_DETAILS (C_ID INTEGER PRIMARY KEY AUTO_INCREMENT,C_NAME VARCHAR(20),C_EMAIL VARCHAR(30),C_PASSWORD VARCHAR(20),C_PHONE BIGINT NULL,C_CARD_NO BIGINT NULL,C_ADDRESS VARCHAR(50))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Customer Details table created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS RESTAURANT (R_ID INTEGER PRIMARY KEY AUTO_INCREMENT,R_NAME VARCHAR(20),F_NAME VARCHAR(20),F_PRICE FLOAT(6,2))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Restaurant table created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS FOOD (F_ID INTEGER PRIMARY KEY AUTO_INCREMENT,F_NAME VARCHAR(20),F_PRICE FLOAT(6,2), F_SFNAME VARCHAR(20),RID INTEGER,FOREIGN KEY(`RID`) REFERENCES `RESTAURANT` (`R_ID`) ON DELETE CASCADE)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Food table created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS CART (CART_ID INTEGER AUTO_INCREMENT,CART_FID INTEGER, FOREIGN KEY(`CART_FID`) REFERENCES `FOOD` (`F_ID`), CART_CID INTEGER, FOREIGN KEY (`CART_CID`) REFERENCES `CUSTOMER_DETAILS` (`C_ID`) ON DELETE CASCADE,C_NAME VARCHAR(20),C_PRICE FLOAT(6,2), C_SFNAME VARCHAR(20),PRIMARY KEY(CART_ID))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Cart table created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS ORDER_HISTORY (ORDER_ID INTEGER PRIMARY KEY AUTO_INCREMENT,ORDER_CID INTEGER, FOREIGN KEY (`ORDER_CID`) REFERENCES `CUSTOMER_DETAILS` (`C_ID`) ON DELETE CASCADE,ORDER_NAME VARCHAR(20), ORDER_PRICE INTEGER, ORDER_DATES VARCHAR(20))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Order History table created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS DELIVERY_PERSON (D_ID INTEGER PRIMARY KEY AUTO_INCREMENT,D_NAME VARCHAR(20),D_PHONE BIGINT NOT NULL,D_RID INTEGER,FOREIGN KEY(`D_RID`) REFERENCES `RESTAURANT` (`R_ID`), D_CID INTEGER ,FOREIGN KEY(`D_CID`) REFERENCES `CUSTOMER_DETAILS`(`C_ID`))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Delivery Person table created");
    });
}

// insert table
function insertIntoTable() {
    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Barbecue',100.00,'barbecue')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Margherita',50.00,'margherita')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Pepperoni',125.00,'pepperoni')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Beef Burger',200.00,'beefBurger')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Rancho Burger',175.00,'ranchoBurger')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Hamburger Veggie',225.00,'hamburgerVeggie')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Hazelnut Chocolate',40.00,'hazelnutChocolate')";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Straberry',30.00,'straberry')"    ;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO FOOD (F_NAME, F_PRICE , F_SFNAME) VALUES ('Oreo Choco',45.00,'oreoChoco')"    ;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    console.log("Values inserted into Food Table");

    var sql = "INSERT INTO CART(C_NAME, C_PRICE,C_SFNAME) VALUES (null, null, null)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    console.log("Values inserted into Cart Table");

    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('Burger Lounge','BEEF BURGER',200.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('Hot Burger','RANCHO BURGER',175.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('Burger Bites','HAMBURGER VEGGIE',225.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('The Old House','BARBECUE',100.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('Pizza Corner','MARGHERITA',50.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('Frosting','PEPPERONI',125.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('Polar Bear','HAZELNUT CHOCOLATE',40.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('Polar Bear','STRABERRY',30.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO RESTAURANT (R_NAME,F_NAME,F_PRICE) VALUES ('Polar Bear','OREO CHOCO',45.00)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql = "INSERT INTO DELIVERY_PERSON (D_NAME,D_PHONE) VALUES ('SMITH',9876182672)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO DELIVERY_PERSON (D_NAME,D_PHONE) VALUES ('JOHN',8765298728)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO DELIVERY_PERSON (D_NAME,D_PHONE) VALUES ('BILL',6372910737)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO DELIVERY_PERSON (D_NAME,D_PHONE) VALUES ('HAZELWOOD',8900235467)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO DELIVERY_PERSON (D_NAME,D_PHONE) VALUES ('STARC',9637289989)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO DELIVERY_PERSON (D_NAME,D_PHONE) VALUES ('ROOT',7245290981)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "INSERT INTO DELIVERY_PERSON (D_NAME,D_PHONE) VALUES ('RUTHERFORD',8654556610)";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    console.log("Values inserted into Delivery Person Table");
}


// GET requests
app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "signup", "signup.html"))
})
app.get("/login", function (req, res) {
    if (req.session.loggedin) {
        res.redirect("/home")
	}
    else{
        res.sendFile(path.join(__dirname, "public", "login", "login.html"))
    }
})
app.get("/home", function(req, res) {

    if (req.session.loggedin) {
        res.render("home", {user: global.nameAdd});    
	} 
    else {
        res.redirect("/login")
    }
})
app.get("/directCheckout", function(req, res) {
    var sqlQuery = "SELECT D_NAME, D_PHONE FROM DELIVERY_PERSON WHERE D_CID IS NULL ORDER BY RAND() LIMIT 1"
    con.query(sqlQuery, function(err, result) {
        if (err) throw err;
        else {
            global.deliveyBoyPhone = result[0].D_PHONE;
            global.deliveyBoyName = result[0].D_NAME;
            console.log(result);
        }
    })

    var sqlQuery = "SELECT C_ADDRESS FROM CUSTOMER_DETAILS WHERE C_ID = " + global.cidAdd + ""
    con.query(sqlQuery, function(err, result) {
        if (err) throw err;
        else {
            global.paddress = result[0].C_ADDRESS;
        }
    })


    var sqlQuery = "SELECT CART_ID,C_NAME,C_PRICE,C_SFNAME FROM CART WHERE CART_CID=" + global.cidAdd + "";
    con.query(sqlQuery, function (err, result) {
        global.cardId = result.CART_ID
        if (err) throw err;
        else{
            res.render("checkout", {resultArray: result, user: global.nameAdd, dname: global.deliveyBoyName, dphone: global.deliveyBoyPhone, daddress: global.paddress});
        }
    })
})
app.get("/delete/:foodId", function(req, res) {
    var foodIdToDelete = req.params['foodId']
    var sqlQuery = "DELETE FROM CART WHERE CART_ID=" + foodIdToDelete + "";
    con.query(sqlQuery, function(err, result) {
        if(err) throw err;
    })
    res.redirect("/directCheckout")
})

// POST requests
app.post("/signup", function (req, res) {
    userName = req.body.username
    global.usrName = req.body.username
    email = req.body.email
    global.mail = req.body.email
    password = req.body.password
    phone = req.body.phone
    cardnum = req.body.cardnum
    global.phonenum = req.body.phone
    global.cardnumber = req.body.cardnum
    global.address = req.body.address

    var sql = "INSERT INTO CUSTOMER_DETAILS (C_NAME, C_EMAIL, C_PASSWORD, C_PHONE, C_CARD_NO, C_ADDRESS) VALUES ('" + userName + "', '" + email + "','" + password + "','" + phone + "','" + cardnum + "','" + global.address + "')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Values inserted into customer details table");
        res.redirect("/login")
    });
})
app.post("/login", function (req, res) {
    useremail = req.body.email
    userpassword = req.body.password

    var sqllogin = "SELECT C_ID,C_EMAIL,C_PASSWORD,C_NAME,C_CARD_NO FROM CUSTOMER_DETAILS WHERE C_EMAIL='" + useremail + "' AND C_PASSWORD='" + userpassword + "'"
    con.query(sqllogin, function (err, result) {
        if (err) throw err;
        else {
                if(result.length === 1){
                    global.cidAdd = result[0].C_ID;
                    global.emailAdd = result[0].C_EMAIL;
                    global.passwordAdd = result[0].C_PASSWORD;
                    global.nameAdd = result[0].C_NAME;
                    global.cardnoAdd = result[0].C_CARD_NO;
                    if (useremail == global.emailAdd && userpassword == global.passwordAdd) {
                        req.session.loggedin = true;
                        res.redirect("/home")
                    }
                }
                else if(result.length === 0){
                    res.redirect("/signup")
                }
        }
    });
})


// All requests
app.all("/logout", function(req, res) {
    req.session.loggedin = false
    res.redirect("/")
})
app.all("/checkout/:foodName", function(req, res) {
    global.sfName = req.params['foodName']
    if(global.sfName != "direct") {
        var sqlQuery = "SELECT F_NAME, F_PRICE FROM FOOD WHERE F_SFNAME='" + global.sfName + "'";
        con.query(sqlQuery, function (err, result) {
        if (err) throw err;
        else {
                
                global.foodNameAdd = result[0].F_NAME;
                global.foodPriceAdd = result[0].F_PRICE;

                var sqlInsertCart = "INSERT INTO CART(C_NAME, C_PRICE,C_SFNAME,CART_CID) VALUES ('" + global.foodNameAdd + "'," + global.foodPriceAdd + ",'" + global.sfName + "'," + global.cidAdd + ")";
                con.query(sqlInsertCart, function (err, result) {
                    if (err) throw err;
                })
            }
        })
        res.redirect("/home")
    }
    else {    
        res.redirect("/directCheckout")
    }
})
app.all("/payment", function(req, res) {
    // var sqlQuery = "SELECT D_NAME, D_PHONE FROM DELIVERY_PERSON WHERE D_CID IS NULL ORDER BY RAND() LIMIT 1"
    // con.query(sqlQuery, function(err, result) {
    //     if (err) throw err;
    //     else {
    //         global.deliveyBoyPhone = result[0].D_PHONE;
    //         global.deliveyBoyName = result[0].D_NAME;
    //         console.log(result);
    //     }
    // })
    sqlQuery = "INSERT INTO ORDER_HISTORY (ORDER_CID,ORDER_NAME,ORDER_PRICE) SELECT CART_CID,C_NAME,C_PRICE FROM CART WHERE CART_CID= " + global.cidAdd + ""
    con.query(sqlQuery, function(err, result) {
        if (err) throw err;
    })
    
    var date = new Date()
    global.dates = date.toLocaleDateString()
    
    sqlQuery = "UPDATE ORDER_HISTORY SET ORDER_DATES ='" + global.dates + "' WHERE ORDER_CID= " + global.cidAdd + ""
    con.query(sqlQuery, function(err, result) {
        if (err) throw err;
    })
    sqlQuery = "UPDATE DELIVERY_PERSON SET D_CID =" + global.cidAdd + " WHERE D_NAME= '" + global.deliveyBoyName + "'"
    con.query(sqlQuery, function(err, result) {
        if (err) throw err;
    })
})
app.all("/deleteCart", function(req, res) {
    var sqlQuery = "DELETE FROM CART WHERE CART_CID=" + global.cidAdd + "";
    con.query(sqlQuery, function(err, result) {
        if (err) throw err;
        else{
            res.redirect("/directCheckout")
        }
    })
})
app.all("/profile", function(req, res) {
    var sqlQuery = "SELECT * FROM ORDER_HISTORY WHERE ORDER_CID=" + global.cidAdd + "";
    con.query(sqlQuery, function (err, resultO) {
        console.log(resultO)
        if (err) throw err;
        else{
            res.render("profile", {user: global.nameAdd, email: global.mail, phone: global.phonenum, card: global.cardnumber, address: global.address, resultArrayOrder: resultO})
        }
    })
})
app.all("/changePassword/:pass", function(req, res) {
    pass = req.params['pass']
    var sqlQuery = "UPDATE CUSTOMER_DETAILS SET C_PASSWORD = '" + pass + "' WHERE C_ID = " + global.cidAdd + ""
    con.query(sqlQuery, function(err, result) {
        if (err) throw err;
        else{
            res.redirect("/profile")
        }
    })
})

// SERVER listening
app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening to port 3000")
})