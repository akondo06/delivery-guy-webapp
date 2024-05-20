
export function triggerDownload(link: string, downloadAttr?: string) {
  const element = document.createElement('a');
  element.style.display = 'none';

  element.href = link;
  // element.target = '_blank';
  // element.download = link.substr(link.lastIndexOf('/') + 1);
  if (downloadAttr) {
    element.download = downloadAttr;
  }
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
