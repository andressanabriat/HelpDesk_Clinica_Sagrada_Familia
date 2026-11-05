export function setupSendEmailButton(buttonId) {
  const button = document.getElementById(buttonId);

  if (!button) {
    console.error(`No se encontró ningún elemento con el ID: ${buttonId}`);
    return;
  }

  button.addEventListener('click', () => {});
}

export function setupCopyButton(codigoId, iconoId) {
  document.getElementById('boton-copia').addEventListener('click', function() {
    const textToCopy = document.getElementById(codigoId).innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      document.getElementById(iconoId).src = "assets/copied-icon.svg";
      setTimeout(() => {
        document.getElementById(iconoId).src = "assets/copy-icon.svg";
      }, 2000);
    }).catch(err => {
      console.error("Error al copiar el texto:", err);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setupSendEmailButton('send-email-button');
  setupCopyButton('codigo', 'icono-copia');
});
