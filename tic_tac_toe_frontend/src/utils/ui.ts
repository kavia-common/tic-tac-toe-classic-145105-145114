import { Cell } from './game';

// PUBLIC_INTERFACE
export function cellA11yLabel(index: number, value: Cell): string {
  /** Returns an accessibility label for a tic tac toe cell */
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  const val = value ?? 'empty';
  return `Cell row ${row}, column ${col}, ${val}`;
}
