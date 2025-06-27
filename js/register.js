'use strict';

(async _ => {
  const statistics = new Statistics();
  let user = JSON.parse(localStorage.getItem('user'));

  const joinButton = document.querySelector('#joinToChannel')
  joinButton?.addEventListener('click', async (e) => {
    joinButton.disabled = true;
    await statistics.onClickTgBtn();
    joinButton.disabled = false;
    window.location.href = 'https://t.me/+oRz1oXGmSVpjYWEy';
  })

  if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();

    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);
    formData.append(`Foydalanuvchi ID`, statistics.userId);
    formData.append(`Timestamp`, statistics.time?.toString());

    let response = await fetch('https://script.google.com/macros/s/AKfycbxpP6T6NZvLx_pkces0F1ZOy1NTlPvlyuCnmZMFoEACmI6PEFCd12eGc1j8H4Rnhp85/exec', {
      method: 'POST',
      body: formData
    })
    await response.json();
    await statistics.onRegister(user);
    localStorage.removeItem('user');
  } else {
    localStorage.removeItem('user');
  }
})()

