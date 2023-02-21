import "./main.scss";

const xwindow = document.querySelector(".window");

window.addEventListener("load", onLoad);
function onLoad(e){
  // position in center of screen
  const rect = xwindow.getBoundingClientRect()
  xwindow.style.left = rect.left + (window.innerWidth/2-rect.width/2) + "px"
  xwindow.style.top = rect.top + (window.innerHeight/2-rect.height/2)  + "px"

  onResize();
  window.addEventListener("resize", onResize);
}

function onResize (e){
  // size painting within screen bounds
  xwindow.style.maxWidth=window.innerWidth;
  xwindow.style.maxHeight=window.innerHeight;
  runQueries();
}

// "media queries"
function runQueries() {
  if (xwindow.offsetWidth < 250) {
    xwindow.classList.remove("medium");
    xwindow.classList.remove("large");
  }
  if (xwindow.offsetWidth > 250) {
    xwindow.classList.add("medium");
    xwindow.classList.remove("large");
  }
  if (xwindow.offsetWidth > 650) {
    xwindow.classList.add("large");
    xwindow.classList.remove("medium");
  }
}

const cover = document.querySelector(".cover")
cover.addEventListener("mousedown", mousedown)

function mousedown(e){
  window.addEventListener("mousemove", mousemove)
  window.addEventListener("mouseup", mouseup)
  let prevX = e.clientX
  let prevY = e.clientY
  function mousemove(e){
    let newX = e.clientX - prevX
    let newY = e.clientY - prevY
    const rect = xwindow.getBoundingClientRect()
    xwindow.style.left = rect.left + newX + "px"
    xwindow.style.top = rect.top + newY + "px"
    prevX = e.clientX
    prevY = e.clientY
  }
  function mouseup(){
    window.removeEventListener("mousemove", mousemove)
    window.removeEventListener("mouseup", mouseup)
  }
}

const resizers = document.querySelectorAll(".resizer")

for (let resizer of resizers){
  resizer.addEventListener("mousedown", mousedown)
  function mousedown(e){
    let currentResizer = e.target
    let prevX = e.clientX
    let prevY = e.clientY
    window.addEventListener("mousemove", mousemove)
    window.addEventListener("mouseup", mouseup)
    function mousemove(e){
      const rect = xwindow.getBoundingClientRect()
      if(currentResizer.classList.contains("br")){
        xwindow.style.width = rect.width + (e.clientX - prevX) + "px"
        xwindow.style.height = rect.height + (e.clientY - prevY) + "px"
      }
      else if(currentResizer.classList.contains("bl")){
        xwindow.style.width = rect.width + (prevX - e.clientX) + "px"
        xwindow.style.height = rect.height + (e.clientY - prevY) + "px"
        xwindow.style.left = rect.left + (e.clientX - prevX) + "px"
      }
      else if(currentResizer.classList.contains("tr")){
        xwindow.style.width = rect.width + (e.clientX - prevX) + "px"
        xwindow.style.height = rect.height + (prevY - e.clientY) + "px"
        xwindow.style.top = rect.top + (e.clientY - prevY) + "px"
      }
      else if(currentResizer.classList.contains("tl")){
        xwindow.style.width = rect.width + (prevX - e.clientX) + "px"
        xwindow.style.height = rect.height + (prevY - e.clientY) + "px"
        xwindow.style.top = rect.top + (e.clientY - prevY) + "px"
        xwindow.style.left = rect.left + (e.clientX - prevX) + "px"
      }
      else if(currentResizer.classList.contains("t")){
        xwindow.style.height = rect.height + (prevY - e.clientY) + "px"
        xwindow.style.top = rect.top + (e.clientY - prevY) + "px"
      }
      else if(currentResizer.classList.contains("b")){
        xwindow.style.height = rect.height + (e.clientY - prevY) + "px"
      }
      else if(currentResizer.classList.contains("l")){
        xwindow.style.width = rect.width + (prevX - e.clientX) + "px"
        xwindow.style.left = rect.left + (e.clientX - prevX) + "px"
      }
      else if(currentResizer.classList.contains("r")){
        xwindow.style.width = rect.width + (e.clientX - prevX) + "px"
      }
      prevX = e.clientX
      prevY = e.clientY
      runQueries()
    }
    function mouseup(){
      window.removeEventListener("mousemove", mousemove)
      window.removeEventListener("mouseup", mouseup)
    }
  }
}