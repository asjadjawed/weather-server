window.onload = () => {
  const form = document.querySelector("form");
  const inputField = document.querySelector("input");

  form.onsubmit = e => {
    e.preventDefault();
    fetch(`/weather?address=${inputField.value}`)
      .then(response => response.json())
      .then(data => console.log(data));
  };
};
