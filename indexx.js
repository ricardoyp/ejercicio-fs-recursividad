const { readdirSync, statSync, readFileSync, appendFileSync } = require("fs");
const path = "../ejercicio-fs-recursividad";

// Muestra por pantalla el número de ficheros y directorios que hay en el árbol (No cuentes el fichero README.md)
function countFilesAndDirectories(path, number = 0) {
    const files = readdirSync(path);

    const filteredFiles = files.filter(file => file !== "README.md" && file !== ".DS_Store" && file !== ".git" && file !== "tempCodeRunnerFile.js");

    number += filteredFiles.length;

    filteredFiles.forEach(file => {
        const stats = statSync(`${path}/${file}`);
        if (stats.isDirectory()) {
            number += countFilesAndDirectories(`${path}/${file}`);
        }
    });

    return number;
}

// Muestra por pantalla el número total de ficheros en todo el árbol (No cuentes el fichero README.md)
function countFiles(path, number = 0) {
    const files = readdirSync(path);

    const filteredFiles = files.filter(file => file !== "README.md" && file !== ".DS_Store" && file !== ".git" && file !== "tempCodeRunnerFile.js");

    filteredFiles.forEach(file => {
        const stats = statSync(`${path}/${file}`);
        if (stats.isFile()) {
            number++;
            // console.log('archivo: ' ,file)
        } else if (stats.isDirectory()) {
            // console.log('directorio: ' ,file)
            number += countFiles(`${path}/${file}`);
        }
    });
    return number;
}

// Muestra por pantalla bytes totales de sumar el peso de todos los ficheros del árbol (No cuentes el fichero README.md)
function countFilesBytes(path, number = 0) {
    const files = readdirSync(path);

    const filteredFiles = files.filter(file => file !== "README.md" && file !== ".DS_Store" && file !== ".git" && file !== "tempCodeRunnerFile.js");

    filteredFiles.forEach(file => {
        const stats = statSync(`${path}/${file}`);
        if (stats.isFile()) {
            number += stats.size;
        } else if (stats.isDirectory()) {
            number += countFilesBytes(`${path}/${file}`);
        }
    });
    return number;
}

// Crea, en la raíz, un fichero .js (ponle el nombre que quieras), que tenga todas las líneas de todos los js que haya en el árbol (No cuentes el fichero README.md)
function createFile(path, string = "") {
    const files = readdirSync(path);

    const filteredFiles = files.filter(file => file !== "README.md" && file !== ".DS_Store" && file !== ".git" && file !== "tempCodeRunnerFile.js" && file !== "indexx.js");

    filteredFiles.forEach(file => {
        const stats = statSync(`${path}/${file}`);
        if (stats.isFile()) {
            const data = readFileSync(`${path}/${file}`).toString();
            appendFileSync("solucion4.js", data);
        } else if (stats.isDirectory()) {
            createFile(`${path}/${file}`);
        }
    });
}
console.log("Ejercicio 1 - Nº Total de Archivos y Directorios:", countFilesAndDirectories(path), "archivos y directorios");
console.log("Ejercicio 2 - Nº Total de Archivos:", countFiles(path), "archivos");
console.log("Ejercicio 3 - Nº Total de Bytes:", countFilesBytes(path), "bytes");
createFile(path);