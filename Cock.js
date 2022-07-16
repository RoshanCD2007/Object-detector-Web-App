status_1 = "";
img = "";
objects = [];

function preload(){
    img = loadImage("Ac.jpg");
}

function setup(){
    canvas = createCanvas(500 , 500);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status3").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    status_1 = true;
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img , 0 , 0 , 500 , 500);
    if(status_1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img , gotResult);

        for(i = 0; i<objects.length; i++){
            document.getElementById("status3").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects3").innerHTML = "There is one big object in the image from which cocossd model has detected " + objects.length + " object";
            percent = floor(objects[i].confidence * 100);
            fill(r,g,b);
            text(objects[i].label + " " + percent + "%" , objects[i].x -50 , objects[i].y + 10);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x +350 , objects[i].y + 10 , objects[i].width - 600, objects[i].height - 10);
        }
    }
}

function back(){
    window.location.replace("index.html");
    
}

