  
   const boxingDayDate = new Date("December 26, 2023 00:00:00").getTime();

 
   const countdownInterval = setInterval(function() {
       const now = new Date().getTime();
       const distance = boxingDayDate - now;

       const days = Math.floor(distance / (1000 * 60 * 60 * 24));

       document.getElementById("countdown-text").innerHTML = `Days until Boxing Day: ${days}`;

     
       if (distance < 0) {
           clearInterval(countdownInterval);
           document.getElementById("countdown-text").innerHTML = "Boxing Day has arrived!";
       }
   }, 1000);