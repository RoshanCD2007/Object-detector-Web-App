status_2 = "";
img2 = "";
objects2 = [];

function preload(){
    img2 = loadImage("Tv.jpg");
}

function setup(){
    canvas = createCanvas(500 , 500);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status2").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    status_2 = true;
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects2 = results;
    }
}

function draw(){
    image(img2 , 0 , 0 , 500 , 500);
    if(status_2 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img2 , gotResult);

        for(f = 0; f<objects2.length; f++){
            document.getElementById("status2").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects2").innerHTML = "There is one big object in the image from which cocossd model has detected " + objects2.length + " object";
            percent = floor(objects2[f].confidence * 100);
            fill(r,g,b);
            text(objects2[f].label + " " + percent + "%" , objects2[f].x +50 , objects2[f].y - 10);
            noFill();
            stroke(r,g,b);
            rect(objects2[f].x +400 , objects2[f].y - 10 , objects2[f].width - 1500, objects2[f].height - 50);
        }
    }
}

function back(){
    window.location.replace("index.html");
    
}
