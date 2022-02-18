declare var module: NodeModule;
interface NodeModule {
  id: string;
}
 
declare global {
  var log: import('Log4js').Logger;
}
export {};