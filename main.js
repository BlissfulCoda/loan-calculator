//FORM 
const form = document.querySelector('#loan-form');


//load All Event Listeners
loadAllEventListeners();

//Event Listeners Function
function loadAllEventListeners(){
    //form
    form.addEventListener('submit', calculateResults);
}

//Calculate Results
function calculateResults(e){
    //Form UI Variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //calculate monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please Check Your Numbers')
    }

    e.preventDefault();
}

//Error Message
function showError(error){
    //create a div
    const errorDiv = document.createElement('div');
    // Add a class
    errorDiv.className = 'alert alert-danger';

    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add text
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//clear Error
function clearError(){
    document.querySelector('.alert').remove();
}