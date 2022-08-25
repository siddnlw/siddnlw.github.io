const themeBtn = document.querySelector('.theme');

function getCurrentTheme(){
    let theme = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark':'light';
    localStorage.getItem('default.theme') ? theme = localStorage.getItem('default.theme') : null;
    return theme;
}

function loadTheme(){
    const root = document.querySelector(':root');
    let theme = getCurrentTheme();
    if (theme === "light"){
        themeBtn.innerHTML = '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg id="Layer_1" width="20" height="20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><title>Moon</title><path id="Moon" d="M12.79,25A12.79,12.79,0,0,1,8.93,0,.5.5,0,0,1,9.5.76,10.72,10.72,0,0,0,24.24,15.49a.5.5,0,0,1,.74.58A12.73,12.73,0,0,1,12.79,25ZM8,1.43A11.79,11.79,0,1,0,23.57,17,11.73,11.73,0,0,1,8,1.43Z" stroke="currentColor"/></svg>';
    }
    else{
        themeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    }
    root.setAttribute('color-scheme', `${theme}`);
}

themeBtn.addEventListener('click', () => {
    let theme = getCurrentTheme();
    if(theme === 'dark'){
        theme = 'light';
    }
    else{
        theme = 'dark';
    }
    localStorage.setItem('default.theme', `${theme}`);
    loadTheme(theme);
})

window.addEventListener('DOMContentLoaded', ()=> {
    loadTheme(getCurrentTheme());
})
