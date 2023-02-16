import { sequelize } from "/../../../../config/connection"
import { routes } from "/../../../../routes"
const signUpButton = document.querySelector(`#sign-up`)
const hide = document.querySelector(`.hide`)
const show = document.querySelector(`.show`)
const signUpSubmit = document.querySelector(`#sign-up-submit`)
const signUpConfirmation = document.querySelector(`#sign-up-confirmation`)
const signUpPassword = document.querySelector(`#sign-up-password`)
const signUpUsername = document.querySelector(`#sign-up-username`)
const fail = document.querySelector(`#fail`)
const signInSubmit = document.querySelector(`#sign-in-submit`)

// need async function?
const signUpUser =  async (username, password) => {
const response =  await fetch('/api/users/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: Score.create({ username, password })
    });

    if (response.ok) {
        alert('sign up successful')
    }
};

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/auth', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };

signUpSubmit.addEventListener("click", async (event) => {
    event.preventDefault()
    if (
        signUpConfirmation.value.trim() === signUpPassword.value.trim() &&
        signUpPassword.value.length >= 5 &&
        signUpUsername.value.length >= 5
    ){
        const username = signUpUsername.value.trim();
        const password = signUpPassword.value.trim();
             try {
        const response = await signUpUser(username, password); 
            }
            catch (error) {
        console.log(error);
            fail.innerHTML = 'Error signing up. Please try again later.';
             }
        // await signUpPassword.value and signUpUsername.value to post on mysql
        // then redirect to home page or start game
        } else {
        fail.innerHTML = `Please make sure to have at least 5 characters in your username and password and that you have confirmed your password properly`
    }
        });

    signUpButton.addEventListener("click" , () => {
        hide.style.display = "none"
        show.style.display = "inline"
        });

    signInSubmit.addEventListener("click" , loginFormHandler);