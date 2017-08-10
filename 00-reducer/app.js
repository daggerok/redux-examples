(function app() {

  // create container
  const fragment = document.createDocumentFragment();

  // add container content
  const render = text => {
    const div = document.createElement('div');
    div.innerText = text;
    fragment.appendChild(div);
  };

  // main
  const original = [1, 2, 3, 5, ];
  render(`original: ${original}`);

  const sum = original.reduce((acc, next) => acc + next, 0);
  render(`sun: ${sum}`);

  const tens = original.reduce((acc, next) => acc.concat(next * 10), []);
  render(`tens: ${tens}`);

  // render DOM
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#app').appendChild(fragment);
  });

})();
