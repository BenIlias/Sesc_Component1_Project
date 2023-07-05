const express = require('express')
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const NewStudent = require('./models/newStudent')
const rn = require('random-number');
var randomstring = require("randomstring");
let sendUser = '';



const dbUrl = 'mongodb+srv://benuser:test1234@cluster0.cjdvpuq.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbUrl).then(() => {
    console.log('Connected to db');
    app.listen(3000);

}).catch(err => console.log(err))



// setup view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// routes


app.get('/', (req, res) => {
    res.redirect('/loginFrm')
});


app.get('/library', (req, res) => {
    res.render('library')
})

app.get('/enrolled', (req, res) => {
    res.render('enrolled')
})

app.get('/myenrollement', (req, res) => {
    NewStudent.findById(sendUser._id)
    .then(student => {
        res.render('myenrollement', {student})
    })
    
});


app.post('/enrollement', (req, res) => {
    const body = req.body
    res.render('enrollement', {body})

});


app.get('/enrollement/:idUser/:titleForm/:courseDetails/:courseFees', (req, res) => {
    const params = req.params;
    const ranNumber = randomstring.generate({
        length: 8,
        capitalization: 'uppercase'
    });

    NewStudent.findById(params.idUser)
        .then(student => {
            if (!student.invoiceRef) {
                student.invoiceRef = ranNumber
                student.titleForm = params.titleForm
                student.courseDetails = params.courseDetails
                student.courseFees = params.courseFees
                student.save()
                
                return student
            } else {
                student.invoiceRef = student.invoiceRef
                return student;
            }
        }).then(student => {
            res.json({ student, redirection: '/enrolled', params })
        })


});

app.post('/checkerPage', (req, res) => {
    const newStudent = new NewStudent(req.body);
    const ranNumber = rn({ min: 100000, max: 999999, integer: true });
    newStudent.idStudent = `c7${ranNumber}`;
    
    newStudent.save().then(result => {
        res.render('congraFrm', { userName: newStudent.userName })
    }).catch(err => {
        
        res.render('registerFrm', { checkVar: 'This user is already exist' })

    })

});

app.get('/loginFrm', (req, res) => {
    res.render('loginFrm', { checkVar: false })
});



app.get('/registerFrm', (req, res) => {
    res.render('registerFrm', { checkVar: '' });

});

app.get('/home', (req, res) => {
    res.render('home', { sendUser })

});

app.get('/homeE', (req, res) => {
    res.render('homeE', { sendUser })

});

app.get('/studentProfile', (req, res) => {
    res.render('studentProfile', {sendUser})
})

app.get('/courses', (req, res) => {
    res.render('courses')
});


app.post('/studentProfile', (req, res) => {
    const params = req.body;
    NewStudent.findByIdAndUpdate(sendUser._id, {
        userName: params.userName,
        emailAddress: params.emailAddress
    }).then(result => {
        return NewStudent.findById(result._id)
    }).then(user => {
        sendUser = user
        res.render('studentProfile', {sendUser: user})
    })
})

app.get('/graduation', (req, res) => {
    res.render('graduation')
})

app.post('/checkerLogin', (req, res) => {
    let checker = false
    const userData = req.body;

    NewStudent.find()
        .then(users => {
            users.forEach(user => {
                if (((user.userName === userData.emailOrUser) || (user.emailAddress === userData.emailOrUser)) && (user.passWord === userData.passWord)) {
                    checker = true
                    sendUser = user
                    console.log(user)
                    console.log(userData)
                }
            });
            if (checker) {
                if (!sendUser.invoiceRef) {
                    res.render('home', { sendUser })
                } else {
                    res.render('homeE', { sendUser })

                }



            } else {
                res.render('loginFrm', {checkVar: 'The infos are wrong, please try again'})
            }
        })
});


