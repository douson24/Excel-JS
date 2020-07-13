const CODES = {
    A: 65,
    Z: 90
}

function toCell(_, col) {
    return `<div class="cell" data-col="${col}" contenteditable></div>`
}

function toColumn(char, index) {
    return `<div class="column" data-col="${index}" data-type="resizable">
         ${char}
         <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(content, index) {
    const resizes = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                 ${index ? index : ''}
                 ${resizes}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols, null))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')

        rows.push(createRow(cells, i + 1))
    }

    return rows.join('')
}
