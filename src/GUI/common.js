import editIcon from '../assets/pencil.png';
import deleteIcon from '../assets/delete.png';
import saveIcon from '../assets/save.png';
import showSidebar from './sidebar';
import showMainCanvas from './main-canvas';

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

function createIcon(path){
    const icon = new Image();
    icon.src = path;
    icon.style.display = 'block'
    icon.classList.add('icon')
    return icon
}

export function showMainSection(){
    showSidebar()
    showMainCanvas()
}