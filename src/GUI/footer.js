import Icon from '../assets/icon.png';
import IconRevers from '../assets/icon_light.png';
import { getMainElement } from './common';

export default function showFooter() {
    const footer = document.createElement('footer')
    footer.textContent = 'Created by Zuzka'
    footer.classList.add('footer', 'flex', 'center')

    const githubLink = document.createElement('a')
    githubLink.href = "https://github.com/UwU-37586109292"

    const githubIcon = new Image();
    githubIcon.src = Icon;
    githubIcon.id = 'icon'
    githubIcon.alt = "github-user-link"
    githubIcon.style.display = 'block'


    const githubIconLight = new Image();
    githubIconLight.src = IconRevers;
    githubIconLight.id = 'icon-light'
    githubIconLight.alt = "github-user-link"
    githubIconLight.style.display = 'none'

    githubLink.appendChild(githubIcon)
    githubLink.appendChild(githubIconLight)

    githubIcon.addEventListener('mouseover', function () {
        event.target.style.display = 'none'
        document.getElementsByClassName('footer')[0].style.color = 'white'
        document.getElementById('icon-light').style.display = 'block'
    })
    githubIconLight.addEventListener('mouseleave', function () {
        event.target.style.display = 'none'
        document.getElementsByClassName('footer')[0].style.color = 'black'
        document.getElementById('icon').style.display = 'block'
    })

    footer.appendChild(githubLink)

    const mainContent = getMainElement()
    mainContent.appendChild(footer)
}