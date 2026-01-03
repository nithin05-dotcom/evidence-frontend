fetch("https://evidence-backend.onrender.com")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("policeTable");
    table.innerHTML = "";

    data.forEach(c => {
      table.innerHTML += `
        <tr>
          <td>${c.caseId}</td>
          <td>${c.status}</td>
        </tr>
      `;
    });
  });
