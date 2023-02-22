import "./main.scss";

const galleries = document.querySelectorAll(".gallery")

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
  const p = gallery.querySelector(".window");
  window.addEventListener("load", onLoad (p));

  const cover = p.querySelector(".cover");
  cover.addEventListener("mousedown", mousedown);
  
  function mousedown(e){
    window.addEventListener("mousemove", mousemove)
    window.addEventListener("mouseup", mouseup)
    let prevX = e.clientX
    let prevY = e.clientY
    function mousemove(e){
      let newX = e.clientX - prevX
      let newY = e.clientY - prevY
      const rect = p.getBoundingClientRect()
      p.style.left = rect.left + newX + "px"
      p.style.top = rect.top + newY + "px"
      prevX = e.clientX
      prevY = e.clientY
    }
    function mouseup(){
      window.removeEventListener("mousemove", mousemove)
      window.removeEventListener("mouseup", mouseup)
    }
  }
  
  const resizers = gallery.querySelectorAll(".resizer")
  
  for (let resizer of resizers){
    resizer.addEventListener("mousedown", mousedown)
    
    function mousedown(e){
      let currentResizer = e.target
      let prevX = e.clientX
      let prevY = e.clientY
      window.addEventListener("mousemove", mousemove)
      window.addEventListener("mouseup", mouseup)

      function mousemove(e){
        const rect = p.getBoundingClientRect()
        if(currentResizer.classList.contains("br")){
          p.style.width = rect.width + (e.clientX - prevX) + "px"
          p.style.height = rect.height + (e.clientY - prevY) + "px"
        }
        else if(currentResizer.classList.contains("bl")){
          p.style.width = rect.width + (prevX - e.clientX) + "px"
          p.style.height = rect.height + (e.clientY - prevY) + "px"
          p.style.left = rect.left + (e.clientX - prevX) + "px"
        }
        else if(currentResizer.classList.contains("tr")){
          p.style.width = rect.width + (e.clientX - prevX) + "px"
          p.style.height = rect.height + (prevY - e.clientY) + "px"
          p.style.top = rect.top + (e.clientY - prevY) + "px"
        }
        else if(currentResizer.classList.contains("tl")){
          p.style.width = rect.width + (prevX - e.clientX) + "px"
          p.style.height = rect.height + (prevY - e.clientY) + "px"
          p.style.top = rect.top + (e.clientY - prevY) + "px"
          p.style.left = rect.left + (e.clientX - prevX) + "px"
        }
        else if(currentResizer.classList.contains("t")){
          p.style.height = rect.height + (prevY - e.clientY) + "px"
          p.style.top = rect.top + (e.clientY - prevY) + "px"
        }
        else if(currentResizer.classList.contains("b")){
          p.style.height = rect.height + (e.clientY - prevY) + "px"
        }
        else if(currentResizer.classList.contains("l")){
          p.style.width = rect.width + (prevX - e.clientX) + "px"
          p.style.left = rect.left + (e.clientX - prevX) + "px"
        }
        else if(currentResizer.classList.contains("r")){
          p.style.width = rect.width + (e.clientX - prevX) + "px"
        }
        prevX = e.clientX
        prevY = e.clientY
        runQueries(p)
      }
      function mouseup(){
        window.removeEventListener("mousemove", mousemove)
        window.removeEventListener("mouseup", mouseup)
      }
    }
  }
}