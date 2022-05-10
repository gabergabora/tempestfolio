function clipText(text){
   if(text) return navigator.clipboard.writeText(text);
}

function setClipTextOnElement(element, text, eventType="click"){
    return element.addEventListener(eventType, ()=>{clipText(text)}) 
}