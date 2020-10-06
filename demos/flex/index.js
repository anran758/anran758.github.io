const panels = document.querySelectorAll('.panel');

function toggleOpen() {
  panels.forEach((item) => {
    if (item === this) return;
    item.classList.remove('open');
  });

  this.classList.toggle('open');
}

function toggleActicon(e) {
  if (e.propertyName.includes('flex-grow')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach((panel) => panel.addEventListener('click', toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener('transitionend', toggleActicon)
);
