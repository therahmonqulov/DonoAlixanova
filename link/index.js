document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.form');
  const imgButton = document.querySelector('.img-button');
  const body = document.body;
  const phoneInput = document.getElementById("phone");
  const countrySelect = document.getElementById("country");
  const flagImg = document.getElementById("flag");
  const inputName = document.getElementById('name');
  const nameError = document.createElement('p');
  const warningP = document.querySelector('.warning-p');
  const buttonS = document.querySelector('.submit-button');
  const showForm = document.querySelector('.show-form-div');
  const hideForm = document.querySelector('.hide-form-div');
  const forme = document.forms['contact-form'];

  // Initial settings
  document.getElementById("loadingDiv").style.display = "block";
  nameError.style.cssText = "color:red;font-size:14px;margin-top:5px;";
  inputName.parentNode.insertBefore(nameError, inputName.nextSibling);
  hideForm.style.display = "block";
  showForm.style.display = "none";

  // Show form
  document.querySelectorAll('.show-button').forEach(btn => {
    btn.addEventListener("click", () => {
      form.style.display = 'block';
      body.style.overflow = 'hidden';
    });
  });

  // Hide form
  document.querySelector('.f-button')?.addEventListener('click', () => {
    form.style.display = 'none';
    body.style.overflow = 'auto';
  });

  // Image button show form
  imgButton?.addEventListener('click', () => {
    form.style.display = 'block';
  });

  // Phone input formatting
  function formatPhoneByCountry(rawValue, country) {
    const formatRules = {
      'UZ': /(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/,
      'KRZ': /(\d{0,3})(\d{0,3})(\d{0,3})/,
      'TJK': /(\d{0,3})(\d{0,3})(\d{0,3})/,
      'TK': /(\d{0,2})(\d{0,3})(\d{0,3})/,
      'KZ': /(\d{0,3})(\d{0,3})(\d{0,4})/,
      'RU': /(\d{0,3})(\d{0,3})(\d{0,4})/,
      'US': /(\d{0,3})(\d{0,3})(\d{0,4})/,
      'GER': /(\d{0,3})(\d{0,8})/,
      'TUR': /(\d{0,3})(\d{0,3})(\d{0,4})/,
      'BEL': /(\d{0,2})(\d{0,3})(\d{0,4})/,
      'UKI': /(\d{0,2})(\d{0,3})(\d{0,4})/
    };
    const match = rawValue.match(formatRules[country]);
    return match ? match.slice(1).filter(Boolean).join('-') : rawValue;
  }

  function updateInputFields() {
    const selected = countrySelect.value;
    const options = {
      UZ:     { ph: '99-999-99-99', pat: '\\d{2}-\\d{3}-\\d{2}-\\d{2}', len: 12, flag: 'uz', width: '70px' },
      KRZ:    { ph: '999-999-999',  pat: '\\d{3}-\\d{3}-\\d{3}',         len: 11, flag: 'kg', width: '70px' },
      TJK:    { ph: '999-999-999',  pat: '\\d{3}-\\d{3}-\\d{3}',         len: 11, flag: 'tj', width: '70px' },
      TK:     { ph: '99-999-999',   pat: '\\d{2}-\\d{3}-\\d{3}',         len: 10, flag: 'tm', width: '70px' },
      KZ:     { ph: '999-999-9999', pat: '\\d{3}-\\d{3}-\\d{4}',         len: 12, flag: 'kz', width: '48px' },
      RU:     { ph: '999-999-9999', pat: '\\d{3}-\\d{3}-\\d{4}',         len: 12, flag: 'ru', width: '48px' },
      US:     { ph: '999-999-9999', pat: '\\d{3}-\\d{3}-\\d{4}',         len: 12, flag: 'us', width: '48px' },
      GER:    { ph: '999-99999999', pat: '\\d{3}-\\d{8}',                len: 12, flag: 'de', width: '60px' },
      TUR:    { ph: '999-999-9999', pat: '\\d{3}-\\d{3}-\\d{4}',         len: 12, flag: 'tr', width: '60px' },
      BEL:    { ph: '99-999-9999',  pat: '\\d{2}-\\d{3}-\\d{4}',         len: 11, flag: 'by', width: '70px' },
      UKI:    { ph: '99-999-9999',  pat: '\\d{2}-\\d{3}-\\d{4}',         len: 11, flag: 'ua', width: '70px' }
    };

    const opt = options[selected] || {};
    phoneInput.placeholder = opt.ph || '';
    phoneInput.pattern = opt.pat || '';
    phoneInput.maxLength = opt.len || '';
    phoneInput.value = '';
    flagImg.src = opt.flag ? `https://flagcdn.com/w40/${opt.flag}.png` : '';
    countrySelect.style.width = opt.width || '50px';
  }

  countrySelect.addEventListener('change', updateInputFields);
  phoneInput.addEventListener('input', (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const formatted = formatPhoneByCountry(raw, countrySelect.value);
    const cursorPos = phoneInput.selectionStart;
    phoneInput.value = formatted;
    phoneInput.setSelectionRange(cursorPos + (formatted.length - raw.length), cursorPos + (formatted.length - raw.length));
  });
  updateInputFields();

  // Name validation
  function validateName() {
    const val = inputName.value.trim();
    const regex = /^[A-Za-zÀ-ÿА-Яа-яЁё' -]{2,}$/;
    if (!regex.test(val)) {
      nameError.textContent = "❌ Xatolik: noto‘g‘ri format";
      inputName.style.borderColor = "red";
      return false;
    }
    nameError.textContent = "";
    inputName.style.borderColor = "";
    return true;
  }

  // Phone validation
  function validatePhone() {
    const val = phoneInput.value.trim();
    const valid = val.length === parseInt(phoneInput.maxLength);
    warningP.style.display = valid ? "none" : "block";
    phoneInput.style.borderColor = valid ? "" : "red";
    return valid;
  }

  // Submit trigger
  buttonS.addEventListener('click', () => {
    inputName.addEventListener("input", validateName);
    phoneInput.addEventListener("input", validatePhone);
    if (validateName() && validatePhone()) {
      hideForm.style.display = "none";
      showForm.style.display = "block";
    }
  });

  // Submit to Google Sheets
  const scriptURL = "https://script.google.com/macros/s/AKfycbz084jpuUEl5JtbvsUP9HaFFDodKP1ne6PEzaAKHzwB33prLZ2NxCoCkwzY46-mOYpfbQ/exec";
  forme.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateName() || !validatePhone()) return;

    const formData = new FormData(forme);
    const data = new URLSearchParams();
    for (const [key, value] of formData) data.append(key, value);

    warningP.textContent = "Yuborilmoqda...";
    fetch(scriptURL, { method: 'POST', body: data });

    setTimeout(() => window.location.assign("./thank-you.html"), 1000);
  });

  // Page reload after thank-you
  if (sessionStorage.getItem('reloadAfterThankYou') === 'true') {
    sessionStorage.removeItem('reloadAfterThankYou');
    window.location.reload();
  }
});
