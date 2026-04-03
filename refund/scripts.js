// seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista de despesas.
const expenseList = document.querySelector("ul")
const expensesquantity = document.querySelector("aside header p span")
const exppenseTotal = document.querySelector("aside header h2")

//Captura o evento de input no campo de valor.
amount.oninput = () => {
    //obtém o valor atual do input e remove os caracteres não numéricos.
    let value = amount.value.replace(/\D/g, "")
    // Transforma o valor em centavos. (Exemplo: 150/100 = 1.5) = R$ 1,50
    value = Number(value) / 100

    // Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formata o valor como moeda brasileira (BRL).
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

// Captura o evento de envio do formulário.
form.onsubmit = (event) => {
    //prevenir o comportamento padrão de recarregamento da página.  
    event.preventDefault()

    //Cria um objeto com os detalhes na nova despesa.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    //chama a função que irá adicionar a despesa.
    expenseAdd(newExpense)
}

// Adiciona um novo item na Lista.
function expenseAdd(newExpense) {
    try {
        // cria o elemento de li(item) para adicionar na lista (ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o icone da categoria.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Criar a info da despesa.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Criar o nome da despesa.
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Criar a categoria da despesa.
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona o nome e a categoria na div nas informações da despesa.
        expenseInfo.append(expenseName, expenseCategory)

        // Criar o valor da despesa.
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Criar icone de remover despesa.
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // Adiciona o evento de clique para remover o item.
        removeIcon.onclick = () => {
            expenseItem.remove()
            updateTotals()
        }

        // Adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Adiciona o item na lista.
        expenseList.append(expenseItem)

        // Limpa o formulário para a próxima despesa
        form.reset()
        expense.focus()

        // Atualiza os totais.
        updateTotals()
    } catch (error) {
        alert("Erro ao adicionar despesa.")
        console.log(error)
    }
}

// Atualiza os totais.
function updateTotals() {
    try {
        // Recupera os itens na lista.
        const items = expenseList.children

        // Atualiza a quantidade de itens da lista.
        expensesquantity.textContent = `${items.length} ${items.length > 1 ? " despesas" : " despesa"}`

        // Variável para incrementar o total.
        let total = 0

        // Percorre cada item da lista.
        for (let i = 0; i < items.length; i++) {
            const itemElement = items[i].querySelector(".expense-amount")
            
            // CORREÇÃO: Pega o conteúdo de texto, remove R$, pontos e troca vírgula por ponto.
            let value = itemElement.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            // Converte o valor para float.
            value = parseFloat(value)

            // Verifica se é um número válido.
            if (isNaN(value)) {
                console.error("Valor inválido encontrado")
                continue
            }

            // Incrementa o valor ao total.
            total += value
        }

        // Formata o total para exibir no HTML
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"
        
        // Formata e remove o R$ fixo para usar o elemento small
        const formattedTotal = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        exppenseTotal.innerHTML = ""
        exppenseTotal.append(symbolBRL, formattedTotal)

    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}

// Evento que captura o clique os itens na lista.
expenseList.addEventListener("click", function (event) {
    if(event.target.classList.contains("remove-icon")) {
         console.log(event)
    }

   
})