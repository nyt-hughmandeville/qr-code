import QRCode from 'https://esm.sh/qrcode@1.5.4';

const $ = (id) => document.getElementById(id);

const text = $('text');
const fgColor = $('fg-color');
const fgPicker = $('fg-color-picker');
const bgColor = $('bg-color');
const bgPicker = $('bg-color-picker');
const width = $('width');
const margin = $('margin');
const message = $('message');
const canvas = $('canvas');

const COLOR_NAMES = {
  transparent: '#0000',
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  yellow: '#FFFF00',
  cyan: '#00FFFF',
  magenta: '#FF00FF',
  gray: '#808080',
  grey: '#808080',
  darkgray: '#A9A9A9',
  darkgrey: '#A9A9A9',
  lightgray: '#D3D3D3',
  lightgrey: '#D3D3D3',
};

function getHex(color) {
  if (!color) return '#000000';
  if (color.startsWith('#')) return color;
  return COLOR_NAMES[color.toLowerCase()] || color;
}

function getOpts() {
  return {
    errorCorrectionLevel: 'H',
    width: Number(width.value) || 400,
    margin: Number(margin.value) || 0,
    color: {
      dark: getHex(fgColor.value),
      light: getHex(bgColor.value),
    },
  };
}

function showError(err) {
  message.textContent = 'Error: ' + err.message;
}

function clearError() {
  message.textContent = '';
}

function render() {
  QRCode.toCanvas(canvas, text.value || ' ', getOpts(), (err) => {
    if (err) {
      showError(err);
      return;
    }
    clearError();
  });
}

function downloadDataUrl(mime, ext) {
  const dataUrl = canvas.toDataURL(mime);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = 'qr-code.' + ext;
  a.click();
}

function downloadSvg() {
  QRCode.toString(text.value || ' ', getOpts(), (err, svg) => {
    if (err) {
      showError(err);
      return;
    }
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.svg';
    a.click();
    URL.revokeObjectURL(url);
  });
}

[text, fgColor, bgColor, width, margin].forEach((el) =>
  el.addEventListener('input', render)
);

fgPicker.addEventListener('input', () => {
  fgColor.value = fgPicker.value;
  render();
});
bgPicker.addEventListener('input', () => {
  bgColor.value = bgPicker.value;
  render();
});
fgColor.addEventListener('input', () => {
  if (/^#[0-9a-f]{6}$/i.test(fgColor.value)) fgPicker.value = fgColor.value;
});
bgColor.addEventListener('input', () => {
  if (/^#[0-9a-f]{6}$/i.test(bgColor.value)) bgPicker.value = bgColor.value;
});

$('download-jpeg').addEventListener('click', () => downloadDataUrl('image/jpeg', 'jpg'));
$('download-png').addEventListener('click', () => downloadDataUrl('image/png', 'png'));
$('download-svg').addEventListener('click', downloadSvg);

render();
