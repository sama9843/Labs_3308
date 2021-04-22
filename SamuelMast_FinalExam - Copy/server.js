var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();


let dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'football_db',
	user: 'postgres',
	password: 'pwd'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


// default page
app.get('/', function(req, res) {
	res.render('pages/home',{
		my_title:"Home Page"
	});
});

// home page
app.get('/home', function(req, res) {
	res.render('pages/home',{
		my_title:"Home Page"
	});
});

app.post('/home/add_review', function(req, res) {
	var review_title = req.body.title;
	var review_text = req.body.review;
	var insert_statement = "INSERT INTO movie_reviews(movie_title, review) VALUES('" + review_title + "','" + review_text +"');";
	
	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement)
        ]);
	})
	
    .then(info => {
    	var query = 'SELECT movie_title, review, review_date FROM movie_reviews;';
		db.any(query)
			.then(function (rows) {
				// render views/store/list.ejs template file
				res.render('pages/reviews',{
					my_title: "Review Page",
					data: rows
				})

			})
			.catch(function (err) {
				// display error message in case an error
				request.flash('error', err);
				response.render('pages/reviews', {
					title: 'Review Page',
					data: ''
				})
			})
    })
    .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('pages/home', {
				title: 'Home Page'
            })
    });


});

// review page
// app.get('/reviews', function(req, res) {
// 	res.render('pages/reviews',{
// 		my_title:"Review Page"
// 	});
// });

app.get('/reviews', function(req, res) {
	var query = 'SELECT movie_title, review, review_date FROM movie_reviews;';
	db.any(query)
        .then(function (rows) {
            // render views/store/list.ejs template file
            res.render('pages/reviews',{
				my_title: "Review Page",
				data: rows
			})

        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            response.render('pages/reviews', {
                title: 'Review Page',
                data: ''
            })
        })

});


//app.listen(3000);
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
