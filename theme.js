const body = document.getElementById('wrapper')
const theme = document.getElementById('toggleTheme')
let currentTheme = document.getElementById('currentTheme')
theme.addEventListener('click', toggleTheme)

function toggleTheme(e){
    let src = currentTheme.src
    let currentThemeIcon = src.split('/')
    currentThemeIcon = currentThemeIcon[currentThemeIcon.length - 1]
    console.log(currentThemeIcon)
    console.log(src.split(currentThemeIcon)[0])
    if(currentThemeIcon == 'icon-sun.svg'){
        currentTheme.src = src.split(currentThemeIcon)[0] + 'icon-moon.svg'
        body.className = 'light'
    }else{
        currentTheme.src = src.split(currentThemeIcon)[0] + 'icon-sun.svg'
        body.className = ''
    }
}