(async () => {
  try {
    const url = 'https://script.google.com/macros/s/AKfycbxs9f5W1N1VZ_wxPliVWX4wjPLid6Pvh8L_vofCWz6W8CzX-UPQkjLNdIgeM5qlE3zF/exec';
    const payload = {
      student_name: 'Test User',
      student_whatsapp: '+923001234567',
      parent_whatsapp: '+923001234568',
      email: 'test@example.com',
      country: 'Pakistan',
      qualification: 'FSc Pre-Medical',
      grades: '80%',
      intake: '15 September 2025',
      budget: 'Less than $5,000'
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log('HTTP', res.status);
    console.log(text);
  } catch (err) {
    console.error('ERROR', err);
    process.exitCode = 1;
  }
})();
