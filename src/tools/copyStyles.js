//Code Source: https://medium.com/@rkichenama/should-pull-all-internal-and-external-stylesheets-in-sourcedoc-and-clone-them-into-targetdoc-in-3fced02ae28a
export default function copyStyles(source, target){
  Array.from(source.querySelectorAll('link[rel="stylesheet"], style'))
  .forEach( link => {
    target.head.appendChild(link.cloneNode(true));
  })
}
