status_5 = "";
img5 = "";
objects5 = [];

function preload(){
    img5 = loadImage("clock1.jpg");
}

function setup(){
    canvas = createCanvas(500 , 500);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status5").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    status_5 = true;
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects5 = results;
    }
}

function draw(){
    image(img5 , 0 , 0 , 500 , 500);
    if(status_5 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img5 , gotResult);

        for(g = 0; g<objects5.length; g++){
            document.getElementById("status5").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects5").innerHTML = "There is one big object in the image from which cocossd model has detected " + objects5.length + " object";
            percent = floor(objects5[g].confidence * 100);
            fill(r,g,b);
            text(objects5[g].label + " " + percent + "%" , objects5[g].x - 120 , objects5[g].y -20);
            noFill();
            stroke(r,g,b);
            rect(objects5[g].x-120, objects5[g].y -10 , objects5[g].width +10, objects5[g].height -50);
        }
    }
}

function back(){
    window.location.replace("index.html");
    
}
