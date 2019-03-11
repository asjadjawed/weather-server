window.onload = () => {
  const form = document.querySelector("form");
  const inputField = document.querySelector("input");

  const statusMessage = document.querySelector(".status");
  const responseMessage = document.querySelector(".response");

  form.onsubmit = e => {
    e.preventDefault();
    responseMessage.textContent = "";
    statusMessage.textContent = "Loading...";
    fetch(`/weather?address=${inputField.value}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          statusMessage.textContent = data.error;
        } else {
          statusMessage.innerHTML = `<h3>${data.address.Address}</h3>`;
          responseMessage.textContent = JSON.stringify(
            data.weather.currently,
            null,
            2
          );
        }
      });
  };
};
