const status_display = document.querySelector('.game--status')
let game_activate = true
let current_player = 'X'
let game_state = ["", "", "", "", "", "", "", "", ""]
const winning_message = () => { return `${current_player} Ganhou!` }
const draw_message = () => { return 'Empate!' }
const current_player_turn = () => { return `É a vez de ${current_player}` }

status_display.innerHTML = current_player_turn()

function handle_cell_played(clicked_cell, clicked_cell_index) {
    game_state[clicked_cell_index] = current_player
    clicked_cell.innerHTML = current_player

    const winning_conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function handle_result_validation() {
        let round_won = false
        for (let i = 0; i < 8; i++) {
            const win_condition = winning_conditions[i]
            let a = game_state[win_condition[0]]
            let b = game_state[win_condition[1]]
            let c = game_state[win_condition[2]]
            if (a === '' || b === '' || c === '') { continue }
            if (a === b && b === c) { round_won = true; break }
        }
        if (round_won) {
            status_display.innerHTML = winning_message()
            game_activate = false
            return
        }
        let round_draw = !game_state.includes("")
        if (round_draw) {
            status_display.innerHTML = draw_message()
            game_activate = false
            return
        }
    }
    handle_result_validation()
    handle_player_chage()
}

function handle_player_chage() {
    current_player = current_player === "X" ? "O" : "X"
    status_display.innerHTML = current_player_turn()
}

function handle_cell_click(clicked_cell_event) {
    const clicked_cell = clicked_cell_event.target
    const clicked_cell_index = parseInt(clicked_cell.getAttribute('data-cell-index'))
    if (game_state[clicked_cell_index] !== '' || !game_activate) { return }
    handle_cell_played(clicked_cell, clicked_cell_index)
    handle_result_validation()
}

function handle_restart_game() { 
    game_activate = true
    current_player = 'X'
    game_state = ["", "", "", "", "", "", "", "", ""]
    status_display.innerHTML = current_player_turn()
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '')
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handle_cell_click))
document.querySelector('.game--restart').addEventListener('click', handle_restart_game)