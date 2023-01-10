import { getMainElement } from "./common"

export default function showHeader(){
const mainContent = getMainElement()

const header = document.createElement('header')
header.classList.add('flex', 'column')
header.textContent = 'Todo list'
mainContent.appendChild(header)
}