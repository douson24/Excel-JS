import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }
    onMousedown(event) {
        if (event.target.dataset['resize']) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const type = $resizer.data.resize
            const sideProp = type === 'col' ? 'bottom' : 'right'
            const rootElementSize = $resizer.closest('.excel__table')
            const sidePropParam = sideProp === 'bottom' ?
                - (rootElementSize.getCoords().height - 15) + 'px' :
                - rootElementSize.getCoords().width + 'px'
            let value = 0

            $resizer.css({
                opacity: 1,
                [sideProp]: sidePropParam
            })

            document.onmousemove = ev => {
                if (type === 'col') {
                    const delta = Math.floor(ev.pageX - coords.right)
                    value = coords.width + delta
                    $resizer.css({right: - delta + 'px'})
                } else {
                    const delta = ev.pageY - coords.bottom
                    value = coords.height + delta
                    $resizer.css({bottom: - delta + 'px'})
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null

                if (value !== 0) {
                    if (type === 'col') {
                        $parent.css({width: value + 'px'})
                        this.$root.findAll(`[data-col="${$parent.data.col}"]`)
                            .forEach(el => el.style.width = value + 'px')
                    } else {
                        $parent.css({height: value + 'px'})
                    }
                }

                $resizer.css({
                    opacity: 0,
                    right: 0,
                    bottom: 0
                })
            }
        }
    }

    toHTML() {
        return createTable(20)
    }
}
