let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function register() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPass").value;

    const user = { name, email, pass };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registered Successfully!");
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("logEmail").value;
    const pass = document.getElementById("logPass").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.pass === pass) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

function loadDashboard() {
    if (!localStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    }
    updateUI();
}

function addTransaction() {
    const desc = document.getElementById("desc").value;
    const amount = parseFloat(document.getElementById("amount").value);

    transactions.push({ desc, amount });
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}

function updateUI() {
    let income = 0, expense = 0;

    transactions.forEach(t => {
        if (t.amount > 0) income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("income").textContent = income;
    document.getElementById("expense").textContent = expense;
    document.getElementById("balance").textContent = income + expense;

    generateAIAdvice(income, expense);

    new Chart(document.getElementById("chart"), {
        type: "bar",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, Math.abs(expense)]
            }]
        }
    });
}

function generateAIAdvice(income, expense) {
    let advice = "Good job!";
    if (Math.abs(expense) > income) {
        advice = "⚠ You are spending more than earning!";
    } else if (income - Math.abs(expense) > income * 0.5) {
        advice = "🔥 Excellent savings rate!";
    }
    document.getElementById("aiAdvice").textContent = advice;
}

function loadProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("pName").textContent = user.name;
    document.getElementById("pEmail").textContent = user.email;
}
