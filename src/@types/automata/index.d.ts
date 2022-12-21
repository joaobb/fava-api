declare namespace Automata {
  interface Edge {
    id: string;
    isInitial?: boolean;
    isAcceptance?: boolean;
    label: string;
  }
  interface Node {
    id: string;
    source: string;
    target: string;
    label: string;
  }

  export interface Automata {
    edges: Edge[];
    nodes: Node[];
  }
}
