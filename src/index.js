import "./main.scss";

const galleries = document.querySelectorAll(".gallery")

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

function onLoad(painting){
  // position in center of screen
  painting.style.left = painting.offsetLeft + (window.innerWidth/2-painting.offsetWidth/2) + "px"
  painting.style.top = painting.offsetTop + (window.innerHeight/2-painting.offsetHeight/2)  + "px"
  // size within screen bounds
  painting.style.maxWidth=window.innerWidth;
  painting.style.maxHeight=window.innerHeight;
  runQueries(painting);
}

// "media queries"
function runQueries(painting) {
  if (painting.offsetWidth < 250) {
    painting.classList.remove("medium");
    painting.classList.remove("large");
  }
  if (painting.offsetWidth > 250) {
    painting.classList.add("medium");
    painting.classList.remove("large");
  }
  if (painting.offsetWidth > 650) {
    painting.classList.add("large");
    painting.classList.remove("medium");
  }
}

for (let gallery of galleries){
  const painting = gallery.querySelector(".painting");
  window.addEventListener("load", onLoad (painting));

  const cover = painting.querySelector(".cover");
  cover.addEventListener("mousedown", mousedown);
  
  function mousedown(e){
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);
    let prevX = e.clientX;
    let prevY = e.clientY;
    function mousemove(e){
      let newX = e.clientX - prevX;
      let newY = e.clientY - prevY;
      const rect = painting.getBoundingClientRect();
      painting.style.left = rect.left + newX + "px";
      painting.style.top = rect.top + newY + "px";
      prevX = e.clientX;
      prevY = e.clientY;
    }
    function mouseup(){
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
  
  const resizers = gallery.querySelectorAll(".resizer");
  
  for (let resizer of resizers){
    resizer.addEventListener("mousedown", mousedown);
    
    function mousedown(e){
      let currentResizer = e.target;
      let prevX = e.clientX;
      let prevY = e.clientY;
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e){
        const rect = painting.getBoundingClientRect()
        if(currentResizer.classList.contains("br")){
          painting.style.width = rect.width + (e.clientX - prevX) + "px";
          painting.style.height = rect.height + (e.clientY - prevY) + "px";
        }
        else if(currentResizer.classList.contains("bl")){
          painting.style.width = rect.width + (prevX - e.clientX) + "px";
          painting.style.height = rect.height + (e.clientY - prevY) + "px";
          painting.style.left = rect.left + (e.clientX - prevX) + "px";
        }
        else if(currentResizer.classList.contains("tr")){
          painting.style.width = rect.width + (e.clientX - prevX) + "px";
          painting.style.height = rect.height + (prevY - e.clientY) + "px";
          painting.style.top = rect.top + (e.clientY - prevY) + "px";
        }
        else if(currentResizer.classList.contains("tl")){
          painting.style.width = rect.width + (prevX - e.clientX) + "px";
          painting.style.height = rect.height + (prevY - e.clientY) + "px";
          painting.style.top = rect.top + (e.clientY - prevY) + "px";
          painting.style.left = rect.left + (e.clientX - prevX) + "px";
        }
        else if(currentResizer.classList.contains("t")){
          painting.style.height = rect.height + (prevY - e.clientY) + "px";
          painting.style.top = rect.top + (e.clientY - prevY) + "px";
        }
        else if(currentResizer.classList.contains("b")){
          painting.style.height = rect.height + (e.clientY - prevY) + "px";
        }
        else if(currentResizer.classList.contains("l")){
          painting.style.width = rect.width + (prevX - e.clientX) + "px";
          painting.style.left = rect.left + (e.clientX - prevX) + "px";
        }
        else if(currentResizer.classList.contains("r")){
          painting.style.width = rect.width + (e.clientX - prevX) + "px";
        }
        prevX = e.clientX;
        prevY = e.clientY;
        runQueries(painting);
      }
      function mouseup(){
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    }
  }
}