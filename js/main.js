const SUBSCRIBE_MODAL = document.querySelector('.subscribe-widget');

if (SUBSCRIBE_MODAL) {
    let messages = SUBSCRIBE_MODAL.querySelectorAll('.subscribe-widget--wrapper');
    messages.forEach(message => message.addEventListener('click', ()=>{
        hide(SUBSCRIBE_MODAL);
        localStorage.removeItem("modal")
    }))
}

function show(elem){
  elem.style.display = 'block'
}

function hide(elem){
  elem.style.display = 'none'
}

function modalHandler() {
  if ( localStorage.getItem("modal") == "true") {
   setTimeout(()=>{
      show(SUBSCRIBE_MODAL);
        setTimeout(()=>{
          hide(SUBSCRIBE_MODAL);
          localStorage.removeItem("modal")
        }, 1000)
    }, 1000)
  }
}
modalHandler();

function handeSubscriveForm(){
  const validPhone = '0398-3388155';
  const validPin = '4231';
  const SUB_FORM = document.getElementById('subscribe-form');
  const PIN_FORM = document.querySelector('#pin-form');
  if (SUB_FORM && PIN_FORM) {
    const PHONE_INPUT = SUB_FORM.querySelector('#phone');
    const SUB_FORM_STATUS = SUB_FORM.querySelector('.input-status');
    const SUB_FORM_SUBBMIT = SUB_FORM.querySelector('.submit-button');
    const PIN_FORM_SUBBMIT = PIN_FORM.querySelector('.submit-button');
    hide(PIN_FORM);

    PIN_FORM.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    SUB_FORM.addEventListener('submit', checkForm);
    PHONE_INPUT.addEventListener('input', inputCheck);
    PIN_FORM_SUBBMIT.disabled = true;

    function checkForm(e){
      e.preventDefault();
    }
    function secondaryStepLunch(){
      SUB_FORM_SUBBMIT.disabled = true;
       hide(SUB_FORM);
       show(PIN_FORM);
    }

function isValidPhoneNumber(number){
  if (number === validPhone) return true;
  return false
}
function inputCheck(e){
  SUB_FORM_SUBBMIT.disabled = true;
  function onlyNumbers(string){
      return string.replace(/[^0-9\.]/g, '');
  }
  let stringNUmber = e.target.value.split('');
  let first = stringNUmber.slice(0, 4);
  let other  = stringNUmber.filter(function(elem, index) {
      if (index !== 0 && index !== 1 && index !== 2 && index !== 3 && elem !== '-' ){
          return elem
      }
  });
  function checkFisrtPart(){
      if (other.length >= 1){
          return '-' + onlyNumbers(other.join(''));
      } else {
          stringNUmber.filter(elem => elem !== '-')
          return  onlyNumbers(other.join(''));
      }
  }
  let partOne = onlyNumbers(first.join(''));
  let partSecond = checkFisrtPart(); 
  PHONE_INPUT.value = partOne + partSecond;
  if (isValidPhoneNumber(partOne + partSecond)){
      SUB_FORM_STATUS.classList.add('success')
      SUB_FORM_SUBBMIT.removeAttribute("disabled");
      SUB_FORM_SUBBMIT.addEventListener('click', secondaryStepLunch )
  }
}

function resetSUBFORM(){
PHONE_INPUT.value = '';
PHONE_INPUT.focus();
SUB_FORM_STATUS.classList.remove('success');
SUB_FORM_SUBBMIT.disabled = true;
}

function pinFormHandlerJQ(){
  let pincode = ''
  let PIN_RESET_BTN = PIN_FORM.querySelector('.reset-sms--button');
  PIN_RESET_BTN.addEventListener('click', resetPin)
  let PHOBE_RESET_BTN = PIN_FORM.querySelector('.reset-number--button');
  PHOBE_RESET_BTN.addEventListener('click', resetPhone)
  $(document.body).on('keyup', 'input', (e) => {
    let target = $(e.currentTarget)
    let currentlength = target.val().length  
    let maxlength = 0
    let allInputs = $('input#pin');
    allInputs.each((i, el) => {
      maxlength += parseInt($(el).attr('maxlength'))
    })
    if(currentlength <= maxlength) {
      if(e.keyCode == 8) {
          allInputs.first().focus()
          allInputs.val('')
          pincode = ''
      } else {
        if(target.val().length != 0) {
          pincode += target.val()
          target.next().focus()
        }
      }
    }
    if(pincode.length == maxlength) {
      if(pincode == validPin) {
        PIN_FORM_SUBBMIT.removeAttribute("disabled");
        PIN_FORM_SUBBMIT.addEventListener('click', (e) => {
          let lang = e.target.getAttribute('data-lang');
          console.log(lang)
          if (lang == 'en') {
            window.location.href = '/index.html';
            localStorage.setItem("modal", "true");
          }
          if (lang == 'ar') {
            window.location.href = '/index_ar.html';
            localStorage.setItem("modal", "true");
          }
        })
      } else {
        //case is empty
      }
    }
  })
  
  function resetPin(){
    $('input#pin').each((i, el) => {
      $(el).val('')
    })
    $('#pin:first').focus()
    pincode = '';
    PIN_FORM_SUBBMIT.disabled = true;
  }
  
  function resetPhone() {
    $('input#pin').each((i, el) => {
      $(el).val('')
    })
    $('#pin:first').focus()
    pincode = '';
    PIN_FORM_SUBBMIT.disabled = true;
    hide(PIN_FORM);
    resetSUBFORM();
    show(SUB_FORM);
  }
  }
  pinFormHandlerJQ()
  }
  }

  handeSubscriveForm()