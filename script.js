let mediaRecorder;
let recordedChunks = [];

const recordedVideoElement = document.getElementById("recorded-video");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");

async function startRecording() {
  recordedChunks = [];
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });

  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    recordedVideoElement.src = URL.createObjectURL(blob);
  };

  mediaRecorder.start();

  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopRecording() {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
