import {storage} from '@core/utils';

function dateCreatedModel(date) {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date))
}

export function toHtml(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    const date = dateCreatedModel(model.created)
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>${date}</strong>
        </li>
    `
}

// excel:id
function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length) {
        return `<p>You have no records in the table</p>`
    } else {
        return `
            <div class="db__list-header">
                <span>Tabel name</span>
                <span>Date open</span>
            </div>

            <ul class="db__list">
                ${keys.map(toHtml).join('')}
            </ul>
        `
    }
}
