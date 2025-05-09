const form = document.querySelector('.form');
const imgButton = document.querySelector('.img-button');
const body = document.querySelector('body');

document.getElementById("loadingDiv").style.display = "block";

// show-button-function (show button)
const showButtons = document.querySelectorAll('.show-button');
showButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    form.style.display = 'block';
    body.style.overflow = 'hidden'; // scrollni o'chirish
  });
});

// hide-button-function (close button)
const hideButton = document.querySelector('.f-button').addEventListener('click', () => {
  body.style.overflow = "auto"; // Enable scrolling
  form.style.display = 'none';
});

// img-button-function (image button)
imgButton.addEventListener('click', () => {
  form.style.display = 'block';
});

//phone number validation (telefon raqamni tekshirish)
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qabul qiladi

  if (value.length > 2 && value.length <= 5) {
    value = `${value.slice(0, 2)}-${value.slice(2)}`;
  } else if (value.length > 5 && value.length <= 7) {
    value = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5)}`;
  } else if (value.length > 7) {
    value = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5, 7)}-${value.slice(7)}`;
  }

  e.target.value = value;
});

//(telefon raqami orasiga "-" qo'shish)
function updatePhoneInput() {
  const countrySelect = document.getElementById('country');
  const phoneInput = document.getElementById('phone');
  const flagImg = document.getElementById('flag');

  function updateInputFields() {
    let selectedCountry = countrySelect.value;
    let placeholder = '';
    let pattern = '';
    let flag = '';
    let maxLength = '';
    let width = '';

    switch (selectedCountry) {
      case 'UZ':
        flag = 'https://flagcdn.com/w40/uz.png';
        placeholder = '99-999-99-99';
        pattern = '\\d{2}-\\d{3}-\\d{2}-\\d{2}';
        maxLength = '12';
        width = '70px';
        break;
      case 'KRZ':
      case 'TJK':
        flag = selectedCountry === 'KRZ'
          ? 'https://flagcdn.com/w40/kg.png'
          : 'https://flagcdn.com/w40/tj.png';
        placeholder = '999-999-999';
        pattern = '\\d{3}-\\d{3}-\\d{3}';
        maxLength = '11';
        width = '70px';
        break;
      case 'TK':
        flag = 'https://flagcdn.com/w40/tm.png';
        placeholder = '99-999-999';
        pattern = '\\d{2}-\\d{3}-\\d{3}';
        maxLength = '10';
        width = '70px';
        break;
      case 'KZ':
      case 'RU':
      case 'US':
        flag = selectedCountry === 'KZ'
          ? 'https://flagcdn.com/w40/kz.png'
          : selectedCountry === 'RU'
            ? 'https://flagcdn.com/w40/ru.png'
            : 'https://flagcdn.com/w40/us.png';
        placeholder = '999-999-9999';
        pattern = '\\d{3}-\\d{3}-\\d{4}';
        maxLength = '12';
        width = '48px';
        break;
      case 'GER':
        flag = 'https://flagcdn.com/w40/de.png';
        placeholder = '999-99999999';
        pattern = '\\d{3}-\\d{8}';
        maxLength = '12';
        width = '60px';
        break;
      case 'TUR':
        flag = 'https://flagcdn.com/w40/tr.png';
        placeholder = '999-999-9999';
        pattern = '\\d{3}-\\d{3}-\\d{4}';
        maxLength = '12';
        width = '60px';
        break;
      case 'BEL':
      case 'UKI':
        flag = selectedCountry === 'BEL'
          ? 'https://flagcdn.com/w40/by.png'
          : 'https://flagcdn.com/w40/ua.png';
        placeholder = '99-999-9999';
        pattern = '\\d{2}-\\d{3}-\\d{4}';
        maxLength = '11';
        width = '70px';
        break;
      default:
        flag = '';
        placeholder = '';
        pattern = '';
        maxLength = '';
        width = '50px';
    }

    phoneInput.placeholder = placeholder;
    phoneInput.pattern = pattern;
    phoneInput.maxLength = maxLength;
    phoneInput.value = '';
    flagImg.src = flag;
    countrySelect.style.width = width; // Width qo'shildi
  }

  function formatPhoneNumber(event) {
    let rawValue = phoneInput.value.replace(/\D/g, '');
    let selectedCountry = countrySelect.value;
    let formattedValue = '';
    let cursorPosition = phoneInput.selectionStart;

    switch (selectedCountry) {
      case 'UZ':
        formattedValue = rawValue.replace(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) =>
          [a, b, c, d].filter(Boolean).join('-'));
        break;
      case 'KRZ':
      case 'TJK':
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,3})(\d{0,3})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
      case 'TK':
        formattedValue = rawValue.replace(/(\d{0,2})(\d{0,3})(\d{0,3})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
      case 'KZ':
      case 'RU':
      case 'US':
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
      case 'GER':
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,8})/, (_, a, b) =>
          [a, b].filter(Boolean).join('-'));
        break;
      case 'TUR':
        formattedValue = rawValue.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
      case 'BEL':
      case 'UKI':
        formattedValue = rawValue.replace(/(\d{0,2})(\d{0,3})(\d{0,4})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join('-'));
        break;
    }

    phoneInput.value = formattedValue;

    // Kursorni formatlashdan keyin to'g'ri joyga qaytarish
    let diff = formattedValue.length - rawValue.length;
    phoneInput.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
  }

  countrySelect.addEventListener('change', updateInputFields);
  phoneInput.addEventListener('input', formatPhoneNumber);
  updateInputFields();
}
updatePhoneInput();

// form country select (bayroqlar)
function updateFlag() {
  const select = document.getElementById('country');
  const phoneInput = document.getElementById('phone');
  const flagImg = document.getElementById('flag');
  const selectedOption = select.options[select.selectedIndex];
  const maxLength = selectedOption.getAttribute('data-maxlength');
  const countryCode = selectedOption.value.toLowerCase();

  // Bayroq rasmini yangilash
  flagImg.src = `https://flagcdn.com/w40/${countryCode}.png`;
  // Telefon raqami uzunligini yangilash
  phoneInput.setAttribute('maxlength', maxLength);
}
updateFlag();


// Formani yuborish uchun Google Sheets linki
const scriptURL = "https://script.google.com/macros/s/AKfycbz084jpuUEl5JtbvsUP9HaFFDodKP1ne6PEzaAKHzwB33prLZ2NxCoCkwzY46-mOYpfbQ/exec"; // google sheets link
const forme = document.forms['contact-form'];
const buttonS = document.querySelector('.submit-button');
const showForm = document.querySelector('.show-form-div');
const hideForm = document.querySelector('.hide-form-div');
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const nameError = document.createElement('p');
const warningP = document.querySelector('.warning-p');


// submit funksiyasi
forme.addEventListener('submit', e => {
  e.preventDefault();

  if (!validateName() || !validatePhone()) {
    return;
  }

  const formData = new FormData(forme);
  const data = new URLSearchParams();

  for (const pair of formData) {
    data.append(pair[0], pair[1]);
  }

  warningP.textContent = "Yuborilmoqda...";

  fetch(scriptURL, {
      method: 'POST',
      body: data,
  });

  // 1 soniya ichida sahifani o‘zgartirish
  setTimeout(() => {
      window.location.assign("./thank-you.html");
  }, 1000);
});



// Xatolik xabarini yaratish
nameError.style.color = 'red';
nameError.style.fontSize = '14px';
nameError.style.marginTop = '5px';
inputName.parentNode.insertBefore(nameError, inputName.nextSibling);

// Formni boshlang‘ich holatda ko‘rsatish
hideForm.style.display = "block";
showForm.style.display = "none";

// Ismni tekshirish
function validateName() {
  const nameValue = inputName.value.trim();
  const nameRegex = /^[A-Za-zÀ-ÿА-Яа-яЁё' -]{2,}$/; // Harflar, apostrof, defis va bo‘shliq ruxsat etiladi

  if (!nameRegex.test(nameValue)) {
    nameError.textContent = "❌ Xatolik: noto‘g‘ri format";
    inputName.style.borderColor = "red";
    return false;
  } else {
    nameError.textContent = "";
    inputName.style.borderColor = "";
    return true;
  }
}

// telefon raqamni tekshirish
function validatePhone() {
  const phoneValue = inputPhone.value.trim();

  if (phoneValue.length !== parseInt(inputPhone.maxLength)) { // Check for invalid phone input
    warningP.style.display = "block";
    return false;
  } else {
    warningP.style.display = "none";
    inputPhone.style.borderColor = "";
    return true;
  }
}

// tugmani bosganda formni tekshirib ochish
buttonS.addEventListener('click', () => {
  inputName.addEventListener("input", validateName);
  inputPhone.addEventListener("input", validatePhone);
  if (validateName() && validatePhone()) {
    hideForm.style.display = "none";
    showForm.style.display = "block";
  }
});

// sahifa yuklanganda qaytdimi yoki yo‘qmi tekshiramiz
window.addEventListener('load', () => {
  if (sessionStorage.getItem('reloadAfterThankYou') === 'true') {
    sessionStorage.removeItem('reloadAfterThankYou');
    window.location.reload();
  }
});
