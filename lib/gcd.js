const gcd = (a, b) => {
  return a % b ? gcd(b, a % b) : b;
};

export default gcd;
