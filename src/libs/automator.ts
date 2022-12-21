class Automator {
  static testEquivalence(
    a1: Object,
    a2: Object
  ): { equivalent: boolean; witness?: string } {
    const accepts = Math.random() > 0.5;

    if (accepts) return { equivalent: true };
    return { equivalent: false, witness: "WITNESS" };
  }
}

export { Automator };
