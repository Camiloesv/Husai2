export function calculatePayback(investment: number, monthlyValue: number, monthlyCost: number) {
  if (![investment, monthlyValue, monthlyCost].every(value => Number.isFinite(value) && value >= 0)) {
    return { valid: false, net: null, months: null };
  }
  const net = monthlyValue - monthlyCost;
  return { valid: true, net, months: net > 0 ? investment / net : null };
}
