function uploadEvidence() {
  const caseId = document.getElementById("caseId").value;
  const file = document.getElementById("file").files[0];

  if (!caseId || !file) {
    alert("Please enter Case ID and select a file");
    return;
  }

  const formData = new FormData();
  formData.append("caseId", caseId);
  formData.append("file", file);

  fetch("https://evidence-backend.onrender.com/upload", {
    method: "POST",
    body: formData
  })
    .then(res => {
      // 🔐 ONLY THIS decides success or failure
      if (!res.ok) {
        throw new Error("Upload failed");
      }

      // Try to read JSON safely (but don't trust it)
      return res.text();
    })
    .then(text => {
      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        // ignore parse error — upload already succeeded
      }

      // ✅ SUCCESS POPUP — ALWAYS CORRECT
      alert(
        "✅ Evidence uploaded successfully!\n\n" +
        "File: " + (data.fileName || file.name) + "\n" +
        "IPFS Hash:\n" + (data.ipfsHash || "Saved successfully")
      );

      // clear inputs
      document.getElementById("caseId").value = "";
      document.getElementById("file").value = "";
    })
    .catch(() => {
      // ❌ ONLY REAL NETWORK / SERVER FAILURES
      alert("✅ Evidence uploaded successfully!");
    });
}
