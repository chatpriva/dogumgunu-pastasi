const candle = document.getElementById("candle");
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function (stream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    microphone.connect(analyser);
    analyser.fftSize = 256;
    count = 0;
    function detectSound() {
      requestAnimationFrame(detectSound);
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      count += 1;
      console.log(average);
      if (average > 100) {
        if (count > 10) {
          candle.classList.add("fire-off");
        }
      }
    }

    detectSound();
  })
  .catch(function (err) {
    console.error("Mikrofon erişim hatası: ", err);
  });
