video = "";
Status = "";
object = [];
function preload(){
    video = createVideo("video.mp4");
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function draw(){
image(video, 0,0, 480, 380);
if(Status != ""){
objectDetector.detect(video, gotResults);
for(i=0; i<object.length; i++){
    document.getElementById("status").innerHTML = "Status: Object Detected";
    document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are:" + object.length;
    fill("#FF0000");
    noFill();
    percent = floor(object[i].confidence * 100);
    text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
    stroke("#FF0000");
    rect(object[i].x, object[i].y, object[i].width, object[i].height);
}
}
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelloaded(){
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        object = results;
    }
}