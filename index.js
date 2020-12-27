const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// data
let comments = [
    {
        username: 'Todd',
        comment: 'lol that is funny',
        id: uuid()
    },
    {
        username: 'Skyler',
        comment: 'I like dogs',
        id: uuid()
    },
    {
        username: 'onlysayswoof',
        comment: 'woof',
        id: uuid()
    }
];

// List all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req,res)=> {
    res.render('comments/new');
});

// Create a new comment
app.post('/comments', (req, res) => {
    // console.log( req.body );
    const { username, comment } = req.body
    comments.push({username,comment,id:uuid()});
    // res.send("it worked");
    res.redirect('/comments');
    // console.log(comments);
});

// Get a commment corresponding to ID
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find( c=> c.id === id);
    res.render('comments/show', { comment } );
});

// PATCH - update one comment
app.patch('/comments/:id', (req,res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;

    const foundComment = comments.find( c=> c.id === id);
    foundComment.comment = newCommentText;

    res.redirect('/comments');
});

// GET to edit a comment for user
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find( c => c.id === id);

    res.render('comments/edit', { comment });
});


// DELETE - destory a comment
app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;

    // creates a new array without the matching id
    comments = comments.filter( c=> c.id != id );

    res.redirect('/comments');
});


app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});