import throttle from 'lodash.throttle'

const form = document.querySelector(".feedback-form");
const message = document.querySelector(".feedback-form message");
const email = document.querySelector(".feedback-form email");

let formElements = {};
const STORAGE_KEY = "feedback-form-state";

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);


populateForm()

function onFormInput(evt) {
    // formElements.email = evt.target.elements.email.value;
    // formElements.message = evt.target.elements.message.value;
    formElements[evt.target.name] = evt.target.value;
    const formValueJSON = JSON.stringify(formElements);
    localStorage.setItem(STORAGE_KEY, formValueJSON)
};

function populateForm() {
    const savedFormElements = localStorage.getItem(STORAGE_KEY);
    const parsedFormElements = JSON.parse(savedFormElements);
    if (parsedFormElements) {
        formElements.email = parsedFormElements.email;
        formElements.message = parsedFormElements.message;
        form.elements.email.value = formElements.email;
        form.elements.message.value = formElements.message;
    };
};

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(formElements);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};