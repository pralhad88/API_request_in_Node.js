var axios = require("axios");
var readlineSync = require('readline-sync');
var fs = require("fs");


axios.get('http://saral.navgurukul.org/api/courses')
.then((response) => {
    var data = (response.data.availableCourses);
    var id = []
    var cource = []
    for (var i = 0; i < data.length; i++){
        id.push(data[i]['id'])
        cource.push(i + " " + data[i]["name"])
    };
    console.log(cource);
    if (cource.length != 0){
        var answer = readlineSync.question('Choice cource number that you want to learn:- ');
        axios.get("http://saral.navgurukul.org/api/courses/" + id[answer] + "/exercises")
        .then((response) => {
            var array = (response.data.data);
            var slug = [];
            var topic_name = [];
            var childExercises = [];
            for ( var i = 0; i < array.length; i++){
                slug.push(array[i]["slug"])
                topic_name.push(i + " " + array[i]['name'])
                childExercises.push(array[i].childExercises)
            }
            console.log(topic_name)
            var number = readlineSync.question('Choice topic number that you want to learn ');  
            if (topic_name.length != 0) {
                if(childExercises[number] != 0){
                    var topic = [];
                    var child_slug = [];
                    for (var i = 0; i < childExercises[number].length; i++){
                        topic.push(i + " " + childExercises[number][i].name)
                        child_slug.push(childExercises[number][i].slug)
                    }
                    if (child_slug.length != 0){
                        while (true){
                            console.log(topic); 
                            var num = readlineSync.question('choice topic number that you want to learn ');
                            axios.get("http://saral.navgurukul.org/api/courses/" + id[answer] + "/exercise/getBySlug?slug=" + child_slug[num])
                            .then((response) => {
                                console.log(response.data.content);
                            });
                            if(response){
                                var user = readlineSync.question('if you want to learn next topic then press any key or press "exit" ');
                                if(user == 'exit'){
                                        break
                                }
                            }
                        }
                    }
                }
                axios.get("http://saral.navgurukul.org/api/courses/" + id[answer] + "/exercise/getBySlug?slug=" + slug[number])
                .then((response) => {
                        console.log(response.data.content);
                });
            };
        });
    };
})