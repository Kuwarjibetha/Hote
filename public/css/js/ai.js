async function generateDescription() {
  // Get values from form
  const title    = document.querySelector("input[name='listing[title]']").value;
  const location = document.querySelector("input[name='listing[location]']").value;
  const country  = document.querySelector("input[name='listing[country]']").value;
  const price    = document.querySelector("input[name='listing[price]']").value;

  // Validate
  if (!title || !location) {
    alert("Please fill Title and Location first!");
    return;
  }

  // Show loading
  document.getElementById("aiLoading").style.display = "block";
  document.getElementById("aiBtn").disabled = true;
  document.getElementById("aiBtn").innerText = "Generating...";

  try {
    const response = await fetch("/ai/generate-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, location, country, price }),
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById("descriptionBox").value = data.description;
    } else {
      alert("AI generation failed! Please try again.");
    }

  } catch (err) {
    alert("Something went wrong! Please try again.");
  }

  // Hide loading
  document.getElementById("aiLoading").style.display = "none";
  document.getElementById("aiBtn").disabled = false;
  document.getElementById("aiBtn").innerText = "✨ Generate with AI";
}