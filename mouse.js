status_1 = "";
img = "";
objects = [];

function preload(){
    img = loadImage("mouse.jpg");
}

function setup(){
    canvas = createCanvas(1000 , 500);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status4").innerHTML = "Status : Detecting Objects";
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
    image(img , 0 , 0 , 700 , 500);
    if(status_1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img , gotResult);

        for(i = 0; i<objects.length; i++){
            document.getElementById("status4").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects4").innerHTML = "There is one big object in the image from which cocossd model has detected " + objects.length + " object";
            percent = floor(objects[i].confidence * 100);
            fill(r,g,b);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 10, objects[i].y - 200);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y - 200, objects[i].width - 1500, objects[i].height - 500);
        }
    }
}

function back(){
    window.location.replace("index.html");
    
}
