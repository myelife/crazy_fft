function preload(){
  sound = loadSound('crazy.mp3');
}

function setup(){
  let cnv = createCanvas(600,400);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);
}

function draw(){
  background(220);

  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 0);
  console.log(spectrum.length);
  
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
    //console.log(height, width);
  }

  
  let waveform1 = fft.waveform();
  noFill();
  beginShape();
  stroke(2);
  
  for (let i = 0; i < waveform1.length; i++){
    let x = map(i, 0, waveform1.length, 0, width);
    let y = map( waveform1[i], -1, 1, 0, height);
    vertex(x,y);
   // console.log(x);
  }
  
  endShape();

  text('tap to play', 20, 20);
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
