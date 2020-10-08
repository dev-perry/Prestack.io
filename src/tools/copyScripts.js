export default function copyScripts(source, target){
  Array.from(source.body.querySelectorAll('script[crossorigin="anonymous"]'))
  .forEach( link => {
    target.body.appendChild(link.cloneNode(true));
  })
}
