// Array to store team members and their expenses
let members = [];

// Get HTML elements
const memberInput = document.getElementById("memberInput");
const addMemberBtn = document.getElementById("addMemberBtn");
const memberSelect = document.getElementById("memberSelect");
const mealInput = document.getElementById("mealInput");
const addMealBtn = document.getElementById("addMealBtn");
const transportInput = document.getElementById("transportInput");
const addTransportBtn = document.getElementById("addTransportBtn");
const expenseTableBody = document.getElementById("expenseTableBody");
const totalExpenseValue = document.getElementById("totalExpense");

function updateMemberSelect() {
    memberSelect.innerHTML = "<option value=\"\">Choose a member</option>";

    members.forEach((member, index) => {
        memberSelect.innerHTML += `<option value="${index}">${member.name}</option>`;
    });
}

function displayExpenseTable() {
    expenseTableBody.innerHTML = "";
    let totalTeamExpense = 0;

    members.forEach(member => {
        const total = member.mealCost + member.transportCost;
        totalTeamExpense += total;

        expenseTableBody.innerHTML += `
            <tr>
                <td>${member.name}</td>
                <td>$${member.mealCost.toFixed(2)}</td>
                <td>$${member.transportCost.toFixed(2)}</td>
                <td>$${total.toFixed(2)}</td>
            </tr>
        `;
    });

    totalExpenseValue.textContent = `$${totalTeamExpense.toFixed(2)}`;
}

function addMember() {
    const name = memberInput.value.trim();

    if (name === "") {
        alert("Please enter a name");
        return;
    }

    members.push({ name, mealCost: 0, transportCost: 0 });
    memberInput.value = "";
    updateMemberSelect();
    displayExpenseTable();
}

function addMealPrice() {
    const selectedIndex = memberSelect.value;
    const price = parseFloat(mealInput.value);

    if (selectedIndex === "") {
        alert("Please select a member");
        return;
    }

    if (isNaN(price) || price < 0) {
        alert("Please enter a valid meal price");
        return;
    }

    members[selectedIndex].mealCost += price;
    mealInput.value = "";
    displayExpenseTable();
}

function addTransportPrice() {
    const selectedIndex = memberSelect.value;
    const price = parseFloat(transportInput.value);

    if (selectedIndex === "") {
        alert("Please select a member");
        return;
    }

    if (isNaN(price) || price < 0) {
        alert("Please enter a valid transport price");
        return;
    }

    members[selectedIndex].transportCost += price;
    transportInput.value = "";
    displayExpenseTable();
}

addMemberBtn.addEventListener("click", addMember);
addMealBtn.addEventListener("click", addMealPrice);
addTransportBtn.addEventListener("click", addTransportPrice);

// Initialize empty table
displayExpenseTable();