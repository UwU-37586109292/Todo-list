import editIcon from '../assets/pencil.png';
import deleteIcon from '../assets/delete.png';
import saveIcon from '../assets/save.png';
import checkIcon from '../assets/tick.png';
import closeIcon from '../assets/close.png';

export function getMainElement(){
    return document.getElementById('content')
}

export function createEditIcon(){
    return createIcon(editIcon)
}

export function createDeleteIcon(){
    return createIcon(deleteIcon)
}
export function createSaveIcon(){
    return createIcon(saveIcon)
}
export function createCheckIcon(){
    return createIcon(checkIcon)
}
export function createCloseIcon(){
    return createIcon(closeIcon);
}

function createIcon(path){
    const icon = new Image();
    icon.src = path;
    icon.style.display = 'block'
    icon.classList.add('icon')
    return icon
}