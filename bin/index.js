#!/usr/bin/env node
const fs = require("fs");
const INPUT_FILEPATH = `./${process.argv[2]}`;
const CHANGES_FILEPATH = `./${process.argv[3]}`;
const readJson = async () => {
  const inputData = await fs.promises.readFile(INPUT_FILEPATH, (err, data) => {
    try {
      return data;
    } catch {
      throw new Error`There was an issue reading the file at ${INPUT_FILEPATH}`();
    }
  });
  const changeData = await fs.promises.readFile(
    CHANGES_FILEPATH,
    (err, data) => {
      try {
        return data;
      } catch {
        throw new Error`There was an issue reading the file at ${CHANGES_FILEPATH}`();
      }
    }
  );
  // console.log(JSON.parse(inputData));
  // console.log(JSON.parse(changeData));
  updateJson(inputData, changeData);
};

const updateJson = (initialData, changeData) => {
  const changes = JSON.parse(changeData);
  const input = JSON.parse(initialData);
  console.log(changes);
  console.log(Object.keys(changes));
};

readJson();
// console.log("hello");
