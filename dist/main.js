(()=>{"use strict";const t=document.querySelector(".window");function e(e){t.style.maxWidth=window.innerWidth,t.style.maxHeight=window.innerHeight}window.addEventListener("load",(function(n){const i=t.getBoundingClientRect();t.style.left=i.left+(window.innerWidth/2-i.width/2)+"px",t.style.top=i.top+(window.innerHeight/2-i.height/2)+"px",e(),window.addEventListener("resize",e)})),document.querySelector(".cover").addEventListener("mousedown",(function(e){window.addEventListener("mousemove",s),window.addEventListener("mouseup",(function t(){window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",t)}));let n=e.clientX,i=e.clientY;function s(e){let s=e.clientX-n,l=e.clientY-i;const o=t.getBoundingClientRect();t.style.left=o.left+s+"px",t.style.top=o.top+l+"px",n=e.clientX,i=e.clientY}}));const n=document.querySelectorAll(".resizer");for(let i of n){function s(e){let n=e.target,i=e.clientX,s=e.clientY;function l(e){const l=t.getBoundingClientRect();n.classList.contains("br")?(t.style.width=l.width+(e.clientX-i)+"px",t.style.height=l.height+(e.clientY-s)+"px"):n.classList.contains("bl")?(t.style.width=l.width+(i-e.clientX)+"px",t.style.height=l.height+(e.clientY-s)+"px",t.style.left=l.left+(e.clientX-i)+"px"):n.classList.contains("tr")?(t.style.width=l.width+(e.clientX-i)+"px",t.style.height=l.height+(s-e.clientY)+"px",t.style.top=l.top+(e.clientY-s)+"px"):n.classList.contains("tl")?(t.style.width=l.width+(i-e.clientX)+"px",t.style.height=l.height+(s-e.clientY)+"px",t.style.top=l.top+(e.clientY-s)+"px",t.style.left=l.left+(e.clientX-i)+"px"):n.classList.contains("t")?(t.style.height=l.height+(s-e.clientY)+"px",t.style.top=l.top+(e.clientY-s)+"px"):n.classList.contains("b")?t.style.height=l.height+(e.clientY-s)+"px":n.classList.contains("l")?(t.style.width=l.width+(i-e.clientX)+"px",t.style.left=l.left+(e.clientX-i)+"px"):n.classList.contains("r")&&(t.style.width=l.width+(e.clientX-i)+"px"),i=e.clientX,s=e.clientY}window.addEventListener("mousemove",l),window.addEventListener("mouseup",(function t(){window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",t)}))}i.addEventListener("mousedown",s)}})();