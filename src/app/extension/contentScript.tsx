import { createRoot } from 'react-dom/client'
import { type FC } from 'react'
import DraggableTooltip from '@/shared/ui/draggableTooltip'

let popupRoot: HTMLDivElement | null = null

function ensurePopupRoot() {
  if (!popupRoot) {
    popupRoot = document.createElement('div')
    popupRoot.id = 'translator-tooltip-root'
    document.body.appendChild(popupRoot)
  }
  return popupRoot
}

const TooltipWrapper: FC<{
  selectedText: string
}> = ({ selectedText }) => {
  return <DraggableTooltip text={selectedText} />
}

function showPopupForSelection() {
  const sel = window.getSelection()?.toString().trim()
  if (!sel) return

  const rootEl = ensurePopupRoot()
  rootEl.innerHTML = ''
  const root = createRoot(rootEl)
  root.render(<TooltipWrapper selectedText={sel} />)
}

document.addEventListener('mouseup', showPopupForSelection)
document.addEventListener('mousedown', (e) => {
  if (
    popupRoot &&
    e.target instanceof HTMLElement &&
    !popupRoot.contains(e.target)
  ) {
    popupRoot.innerHTML = ''
  }
})
