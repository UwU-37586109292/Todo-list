import editIcon from '../assets/pencil.png';
import deleteIcon from '../assets/delete.png';

export function getMainElement(){
    return document.getElementById('content')
}

export function createEditIcon(){
    return createIcon(editIcon)
}

export function createDeleteIcon(){
    return createIcon(deleteIcon)
}

function createIcon(path){
    const icon = new Image();
    icon.src = path;
    icon.style.display = 'block'
    icon.classList.add('icon')
    return icon
}