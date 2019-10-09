let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SAMPDPK', {useNewUrlParser:true,useUnifiedTopology: true })
             .then(() => console.log(`connected to the database`))
             .catch(err => console.log(`something went wrong ${err.message}`));

let authorSchema = new mongoose.Schema({
    name:{type:String,require:true},
    bio: {type:String,required:true},
    website:{type:String, required:true}
});

let courseSchema = new mongoose.Schema({
    name:{type:String,required:true},
    authorId:{type:authorSchema, required:true}
})
let Author = mongoose.model('Author', authorSchema);
let Course = mongoose.model('CourseByAuthor', courseSchema);

async function CreateAuthor(name,bio,website) {
     let author = new Author({
         name,
         bio,
         website
     });
     let result = await author.save();
     console.log(result);
};
async function CreateCourse(name, authorId) {
    let course = new Course({
        name,
        authorId
    });
    let result = await course.save();
    console.log(result);
}

// CreateAuthor('johnpapa','FullStack Developer', 'www.johnpapa.com');
//  CreateCourse('ReactJs', new Author({
//  name:'sonal',
//  bio:'FullStack Developer',
//  website:'codewithsonal.com'
//  }));
async function AllCourses() {
    let data = await Course
                      .find();
console.log(data);
}

 AllCourses();
