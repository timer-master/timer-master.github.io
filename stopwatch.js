   //STOPWATCH
   let startBtn = document.getElementById('start');
   let stopBtn = document.getElementById('stop');
   let resetBtn = document.getElementById('reset');
   let lapBtn = document.getElementById('lap');
   
   let hour = 0;
   let minute = 0;
   let second = 0;
   let count = 0;
   let laphour = 0;
   let lapminute = 0;
   let lapsecond = 0;
   let lapcount = 0;
   let lapnum = 1;

   startBtn.addEventListener('click', function () {
    if (count == 0 && second == 0 || timer == false){
        timer = true;
       stopWatch();
    }    
   });
   
   stopBtn.addEventListener('click', function () {
       timer = false;
   });
   
   resetBtn.addEventListener('click', function () {
       timer = false;
       hour = 0;
       minute = 0;
       second = 0;
       count = 0;
       lapnum = 1;
       laphour = 0;
       lapminute = 0;
       lapsecond = 0;
       lapcount = 0;
       document.getElementById('hr').innerHTML = "00";
       document.getElementById('min').innerHTML = "00";
       document.getElementById('sec').innerHTML = "00";
       document.getElementById('count').innerHTML = "00";
       document.getElementById('laphr').innerHTML = "00";
       document.getElementById('lapmin').innerHTML = "00";
       document.getElementById('lapsec').innerHTML = "00";
       document.getElementById('lapcount').innerHTML = "00";
   });
   
   function stopWatch() {
       if (timer) {
           count++;
           lapcount++;
   
           if (count == 100) {
               second++;
               lapsecond++;
               count = 0;
               lapcount = 0;
           }
   
           if (second == 60) {
               minute++;
               lapminute++;
               second = 0;
               lapsecond = 0;
           }
   
           if (minute == 60) {
               hour++;
               laphour++;
               minute = 0;
               second = 0;
               lapminute = 0;
               lapsecond = 0;
           }
   
           let hrString = hour;
           let minString = minute;
           let secString = second;
           let countString = count;
   
           if (hour < 10) {
               hrString = "0" + hrString;
           }
   
           if (minute < 10) {
               minString = "0" + minString;
           }
   
           if (second < 10) {
               secString = "0" + secString;
           }
   
           if (count < 10) {
               countString = "0" + countString;
           }
   
           document.getElementById('hr').innerHTML = hrString;
           document.getElementById('min').innerHTML = minString;
           document.getElementById('sec').innerHTML = secString;
           document.getElementById('count').innerHTML = countString;
           setTimeout(stopWatch, 10);
       }
   }
    lapBtn.addEventListener('click', function (){

        let laphrString = laphour;
        let lapminString = lapminute;
        let lapsecString = lapsecond;
        let lapcountString = lapcount;

        if (laphour < 10) {
            laphrString = "0" + laphrString;
        }

        if (lapminute < 10) {
            lapminString = "0" + lapminString;
        }

        if (lapsecond < 10) {
            lapsecString = "0" + lapsecString;
        }

        if (lapcount < 10) {
            lapcountString = "0" + lapcountString;
        }

         laphour = 0;
         lapminute = 0;
         lapsecond = 0;
         lapcount = 0;

            document.getElementById('laphr').innerHTML = laphrString;
            document.getElementById('lapmin').innerHTML = lapminString;
            document.getElementById('lapsec').innerHTML = lapsecString;
            document.getElementById('lapcount').innerHTML = lapcountString;
    });