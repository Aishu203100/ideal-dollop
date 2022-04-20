
objects = [];
status = "";


function setup() {
  canvas = createCanvas(280, 280);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(280,280);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status - Detecting Objects";
  object_name = document.getElementById("object_found").value;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status - Objects have been detected";
          
          fill(r, g, b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r, g, b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

         
          if(objects[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_found").innerHTML = object_name + "has been Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "has been found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("object_found").innerHTML = object_name + " has not been found";
          }          
         }
      }
}
