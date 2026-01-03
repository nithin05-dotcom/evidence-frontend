fetch("https://evidence-backend.onrender.com")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("caseTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
      table.innerHTML =
        "<tr><td colspan='4'>No cases available</td></tr>";
      return;
    }

    data.forEach(c => {
      // status badge class
      const statusClass = c.status.toLowerCase();

      table.innerHTML += `
        <tr>
          <td>${c.caseId}</td>

          <td>
            <a class="view-link"
               href="https://gateway.pinata.cloud/ipfs/${c.ipfsHash}"
               target="_blank">
              View Evidence
            </a>
          </td>

          <td>
            <span class="status ${statusClass}">
              ${c.status}
            </span>
          </td>

          <td>
            <button class="btn-approve"
              onclick="updateStatus('${c.caseId}', 'Approved')">
              Approve
            </button>

            <button class="btn-reject"
              onclick="updateStatus('${c.caseId}', 'Rejected')">
              Reject
            </button>

            <button class="btn-clear"
              onclick="clearCase('${c.caseId}')">
              Clear
            </button>
          </td>
        </tr>
      `;
    });
  })
  .catch(() => {
    const table = document.getElementById("caseTable");
    table.innerHTML =
      "<tr><td colspan='4'>Failed to load cases</td></tr>";
  });

/* ---------- UPDATE STATUS ---------- */
function updateStatus(caseId, status) {
  fetch("https://evidence-backend.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ caseId, status })
  })
    .then(() => {
      location.reload(); // refresh to show updated status
    });
}

/* ---------- CLEAR CASE ---------- */
function clearCase(caseId) {
  if (!confirm("Are you sure you want to clear this case?")) return;

  fetch("https://evidence-backend.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ caseId })
  })
    .then(() => {
      location.reload();
    });
}
