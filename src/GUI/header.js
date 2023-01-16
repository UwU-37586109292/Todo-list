import { createCheckIcon, getMainElement } from "./common"

export default function showHeader(){
const mainContent = getMainElement()

const header = document.createElement('header')
const wrapper = document.createElement('div')
wrapper.classList.add('flex', 'align-center')
wrapper.appendChild(createCheckIcon())
const title = document.createElement('div')
title.textContent = 'Todo List'
wrapper.appendChild(title)
header.appendChild(wrapper)
mainContent.appendChild(header)
}