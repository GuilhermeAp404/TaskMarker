const loginTab = document.getElementById('login')
const registerTab = document.getElementById('register')
const formLogin = document.getElementById('login-form')
const formRegister = document.getElementById('register-form')

console.log('foi')

const loginTabModify = loginTab.addEventListener('click', ()=>{
    loginTab.classList.add('activate-option')
    registerTab.classList.remove('activate-option')
    formRegister.style.display="none"
    formLogin.style.display="block"
})

loginTab.addEventListener('touchstart', ()=>{
    loginTabModify()
})

const registerTabModify = registerTab.addEventListener('click', function(){
    registerTab.classList.add('activate-option')
    loginTab.classList.remove('activate-option')
    formLogin.style.display="none"
    formRegister.style.display="block"
})

registerTab.addEventListener('touchstart', ()=>{
    registerTabModify()
})