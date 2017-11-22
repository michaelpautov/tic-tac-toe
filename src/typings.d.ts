/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

interface TEMoveInterface {
  index?: number;
  score?: number;
}


type TEPlayerSymbolInterface = 'X' | 'O' | 'W';
type TECellInterface = 'X' | 'O' | 'W' | number;

