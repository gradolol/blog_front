export const loadDeferredStyles = () => {
  const load = () => {
    const addStylesNode = document.getElementById('deferred-styles')
    const replacement = document.createElement('div')
    if (addStylesNode) {
      replacement.innerHTML = String(addStylesNode.textContent)
      document.body.appendChild(replacement)
      const parent = addStylesNode.parentElement
      if (parent) parent.removeChild(addStylesNode)
    }
  }
  window.requestAnimationFrame(() => window.setTimeout(load, 0))
}
