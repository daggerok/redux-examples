const exec = (e, fn, ref) => {
  if (!e.keyCode || e.keyCode !== 13) return;
  fn(+ref.value);
  ref.value = '';
};

export default exec;
