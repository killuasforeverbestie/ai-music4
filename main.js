song1="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist = 0;
songstatus = "";
songstatus2 = "";
function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
canvas = createCanvas(600,500);
canvas.position(1000,400);
video = createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelloaded);
poseNet.on('pose',gotposes);
}

function draw(){
image(video,0,0,600,500);
fill("#FF0000");
stroke("#FF0000");
songstatus = song1.isPlaying(true);
if(scoreleftwrist>0.2){
circle(leftwristx, leftwristy,20);
song2.stop();
if(songstatus==false){
song1.stop();
song2.play();
}
if(songstatus2==false){
song2.stop();
song1.play();
}
}

}

function modelloaded(){
console.log("posenetinitilized");
}

function gotposes(results){
if(results.length>0){
console.log(results)
scoreleftwrist = results[0].pose.keypoints[9].score
console.log("scoreleftwrist = "+scoreleftwrist)
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy)
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
console.log("rightwristx="+rightwristx+"rightwristy="+rightwristy)
}
}