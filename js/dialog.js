import { clearSeries } from './chart.js'

const getDialogContent = () => `
    <button id="dialogClose" class="dialog-close button-reset">&times</button>
    <div id="chart" class="chart"></div>
    <p id="compare" class="compare">
        <button class="button-reset">compare +</button>
    </p>
`

export const showDialog = (element) => {

    const dialogElement = document.createElement('dialog')

    const compare = () => {
        dialogElement.close()
        // leave series in current state so next time the dialog is opened 
        // another gets added for comparison
    }

    const closeDialog = () => {
        dialogElement.close()
        clearSeries()
    }

    const onDialogClose = () => {
        // clean up
        dialogElement.removeEventListener('close', onDialogClose)
        document.querySelector('#dialogClose').removeEventListener('click', closeDialog)
        document.querySelector('#compare').removeEventListener('click', compare)
        document.body.removeChild(dialogElement)
    }

    // populate and show the dialog
    dialogElement.innerHTML = getDialogContent(element)
    dialogElement.classList.add('dialog')
    document.body.appendChild(dialogElement)
    dialogElement.showModal()
    
    // add event listeners to newly created elements
    document.querySelector('#compare').addEventListener('click', compare)
    document.querySelector('#dialogClose').addEventListener('click', closeDialog)
    dialogElement.addEventListener('close', onDialogClose)

    return dialogElement
}