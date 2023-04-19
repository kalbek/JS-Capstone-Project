import "./style.css";
import Shows from "./modules/Shows";

function component() {
  const element = document.createElement("div");
    
  Shows.updateUI();

  
  return element;
}

document.body.appendChild(component());