
/*
  Declaration files are how the Typescript compiler knows about the type information(or shape) of an object.
  They're what make intellisense work and make Typescript know all about your code.
  A wildcard module is declared below to allow third party libraries to be used in an app even if they don't
  provide their own type declarations.
  To learn more about using third party libraries in an Ionic app, check out the docs here:
  http://ionicframework.com/docs/v2/resources/third-party-libs/
  For more info on type definition files, check out the Typescript docs here:
  https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
*/
// declare module '*';


declare module 'litepicker/dist/nocss/*';


// declare module 'react-file-manager-ui' {

//   export interface Node {
//     name: string;
//     type: number;
//   }

//   type Feature = 'createDirectory' | 'uploadFiles' | 'deletePaths' | 'rename';


//   interface FileManagerProps {
//     getList: (path: string) => Promise<Node[]>;
//     createDirectory: (path: string) => Promise<void>;

//     deletePaths: (path: string[]) => Promise<void>;
//     openFile: (path: string) => Promise<void>;

//     uploadFiles: (path: string, files: File[]) => Promise<void>;
//     rename: (path: string) => Promise<void>;

//     features: Feature[];
//   }

//   export default function FileManager(props: FileManagerProps): any;
// }

declare module '@chatscope/chat-ui-kit-styles/dist/*';
declare module '@chatscope/chat-ui-kit-styles/themes/*';
