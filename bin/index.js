#!/usr/bin/env node
const fs = require("fs");
const INPUT_FILEPATH = `./${process.argv[2]}`;
const CHANGES_FILEPATH = `./${process.argv[3]}`;
const OUTPUT_FILEPATH = `./${process.argv[4]}`;
const readJson = async () => {
  const inputData = await fs.promises.readFile(INPUT_FILEPATH, (err, data) => {
    try {
      return data;
    } catch {
      throw new Error(
        `There was an issue reading the file at ${INPUT_FILEPATH}`
      );
    }
  });
  const changeData = await fs.promises.readFile(
    CHANGES_FILEPATH,
    (err, data) => {
      try {
        return data;
      } catch {
        throw new Error(
          `There was an issue reading the file at ${CHANGES_FILEPATH}`
        );
      }
    }
  );

  updateJson(inputData, changeData);
};

const updateJson = (initialData, changeData) => {
  const changes = JSON.parse(changeData);
  const input = JSON.parse(initialData);
  // console.log(changes);
  const keys = Object.keys(changes);
  keys.forEach((key) => {
    if (key === "add_songs_to_playlist") {
      console.log(changes.add_songs_to_playlist);
      console.log(input.playlists);
      changes.add_songs_to_playlist.forEach((item) => {
        const result = input.playlists.find(
          (playlist) => playlist.id === item.playlist_id
        );
        if (result) {
          result.song_ids.push(item.song_id);
        } else {
          throw new Error("Playlist not valid");
        }
        console.log("RESULT", input.playlists);
      });
    }

    fs.writeFile(OUTPUT_FILEPATH, JSON.stringify(input, null, 2), (err) => {
      if (err) console.log("Error writing file:", err);
    });
  });
};

readJson();
