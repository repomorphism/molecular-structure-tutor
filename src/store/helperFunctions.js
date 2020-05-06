function findClickedAtom(atoms, x, y) {
  for (const atom of atoms) {
    const radius = 30;
    const dx = atom.x - x;
    const dy = atom.y - y;
    if (dx * dx + dy * dy <= radius * radius) {
      return atom;
    }
  }
  return null;
}

export { findClickedAtom };
