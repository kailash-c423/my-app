function generateChecklist(gender) {
  const checklistContainer = document.getElementById("checklistContainer");
  checklistContainer.innerHTML = ""; // Clear existing checklist

  if (gender === "male") {
    checklistContainer.innerHTML = `
      <h3>Select your clothing:</h3>
      <input type="checkbox" id="shirt" />
      <label for="shirt">Shirts</label>
      <input type="number" id="shirtQty" min="0" value="0" placeholder="Qty" /><br />

      <input type="checkbox" id="pants" />
      <label for="pants">Pants</label>
      <input type="number" id="pantQty" min="0" value="0" placeholder="Qty" /><br />
    `;
  } else if (gender === "female") {
    checklistContainer.innerHTML = `
      <h3>Select your clothing:</h3>
      <input type="checkbox" id="sarees" />
      <label for="sarees">Sarees</label>
      <input type="number" id="sareesQty" min="0" value="0" placeholder="Qty" /><br />

      <input type="checkbox" id="chudidhars" />
      <label for="chudidhars">Chudidhars</label>
      <input type="number" id="chudidharsQty" min="0" value="0" placeholder="Qty" /><br />
    `;
  }
}

// Add event listeners to gender radios for immediate checklist generation
document.querySelectorAll('input[name="gender"]').forEach(radio => {
  radio.addEventListener('change', (event) => {
    const gender = event.target.value;
    document.getElementById("op").textContent = "Selected gender: " + gender;
    generateChecklist(gender);
  });
});

function sendBookingData(data) {
  fetch('/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(response => response.text())
    .then(result => alert(result))
    .catch(error => console.error('Error:', error));
}

document.getElementById("submitAll").onclick = function () {
  let name = document.getElementById("name").value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }
  let mobile = document.getElementById("mobile").value.trim();
  if (!mobile) {
    alert("Please enter your mobile number.");
    return;
  }

  let selectedGender = document.querySelector('input[name="gender"]:checked');
  if (!selectedGender) {
    alert("Please select a gender.");
    return;
  }

  let gender = selectedGender.value;

  let output =
    "Name: " +
    name +
    ", Mobile: " +
    mobile +
    ", Gender: " +
    gender +
    ", Clothing - ";

  if (gender === "male") {
    let shirtsChecked = document.getElementById("shirt")?.checked;
    let shirtsQty = parseInt(document.getElementById("shirtQty")?.value) || 0;

    let pantsChecked = document.getElementById("pants")?.checked;
    let pantsQty = parseInt(document.getElementById("pantQty")?.value) || 0;

    output += shirtsChecked ? `Shirts: ${shirtsQty}` : "Shirts: 0";
    output += ", ";
    output += pantsChecked ? `Pants: ${pantsQty}` : "Pants: 0";
  } else {
    let sareesChecked = document.getElementById("sarees")?.checked;
    let sareesQty = parseInt(document.getElementById("sareesQty")?.value) || 0;

    let chudidharsChecked = document.getElementById("chudidhars")?.checked;
    let chudidharsQty = parseInt(document.getElementById("chudidharsQty")?.value) || 0;

    output += sareesChecked ? `Sarees: ${sareesQty}` : "Sarees: 0";
    output += ", ";
    output += chudidharsChecked ? `Chudidhars: ${chudidharsQty}` : "Chudidhars: 0";
  }

  document.getElementById("output").textContent = output;

  // Construct the E.164 phone number for user mobile with +91 country code
  const phoneNumber = "+919550587757" + mobile;

  // Send the message data to backend to send SMS
  sendBookingData({
    phone: phoneNumber,
    message: output,
  });
};

const today = new Date();
document.getElementById("dateop").textContent = today.toDateString();
