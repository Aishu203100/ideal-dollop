Status = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Object";
    input_text = document.getElementById("input_id").value;
}
function modelLoaded(){
    console.log("Model Loaded!!!");
    Status = true;
}
function draw(){
    image(video,0,0,380,380);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
