// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dekoGr: [
            {id: 1, nombre:'Presentacion'},
            {id: 11, nombre:'Pizarrita'},
            {id: 10, nombre:'CHE'},
            {id: 2, nombre:'Alineacion'},
            {id: 3, nombre:'Campo'},
            {id: 5, nombre:'Tres al Bate'},
            {id: 8, nombre:'Bateador'},
            {id: 7, nombre:'Lanzador'},
            {id: 6, nombre:'Bulpen'},
            {id: 4, nombre:'Arbitros'},
            {id: 10, nombre:'Comentaristas'}
          ],
    dirlogo:'E:\\cg\\Serie_Nacional\\img\\logos\\',
    dirMacro:'E:\\cg\\Serie_Nacional',
    saveMacro:' "" -nocompress category="" title="" user="" memo=""',
    posiciones:['1B','2B','3B','SS','LF','CF','RF','C','L','BD','BE']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
