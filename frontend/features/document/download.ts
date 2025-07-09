
export function downloadFile(fileKey: string) {
  const url = `http://localhost:5000/uploads/${fileKey}`; // adjust host if needed
  const a = document.createElement('a');
  a.href = url;
  a.download = fileKey;       // suggest filename
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
