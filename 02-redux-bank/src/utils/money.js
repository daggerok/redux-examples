const money = amount => parseFloat(
  parseFloat(amount || 0.0).toFixed(2)
);

export default money;
