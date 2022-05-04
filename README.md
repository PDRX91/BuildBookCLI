# BuildBookCLI

---

## Installation and Setup

1. Clone the repository and CD into the project.
2. In terminal, run `npm i -g .` to install the CLI command.
3. Feel free to make any changes to `changes.json` that you see fit or just keep it as-is.
4. In terminal, run `buildbook spotify.json changes.json <output-file.json>` (The last param can be any file name you choose)

## Verification of Results

Data can be verified by comparing the various sections in `spotify.json` with `output-file.json`.
I chose to implement a few changes per requirement to verify that it was not a single use solution. Those changes be seen in `changes.json`.
There is also error handling for each of the 3 types of changes required:

- Songs are only added to the playlist if the playlist exists in `spotify.json`
- New playlists are only created if the user exists in `spotify.json`
- Playlist can only be removed if it exists in `spotify.json`

## Potential Changes for Scalability

Assuming the input and changes grow significantly, we will quickly run into bottlenecks for processing the large dataset at one time.

- The most critical change I would make is using streaming in NodeJS instead of reading the entire file. This would allow for us to begin processing the data as it comes to us instead of waiting for one giant batch. This would decrease loading/waiting times dramatically at scale.
- In tandem, I think preparing the files to be sorted on creation would be very helpful. For example, if we were to sort the data by users then as we are streaming the data then we could apply all the changes for a given user and begin to write that to the output file. This would speed up processing time instead of waiting for random chunks and possibly running repeated process to verify that all changes were implemented.
- Lastly, if the scale warranted it, it would be beneficial to shard the files and process the data across multiple different server instances.

## Design Thoughts

From the start I planned out how I wanted to process the documents:

First, read the input. Second, read the changes. Third break the changes up by use case. Fourth, implement the changes for each section. Fifth, combine the changes and write the changes to the output file.

Additionally, I decided to implement a slightly more complex version of the requirements, allowing multiple changes per change type. I did this because based on the general functional requirements it seemed unlikely that something like this would actually be done one at a time. A single change like adding a song would be more for a single user's API endpoint. Using files with mass amounts of changes does not imply one use per use type. I thought looping through any potential multiple changes was more representative of the problem at hand.

## Time Spent and Additional Thoughts

Overall I spent about 3 hours on this. The first hour or so was spent working on some very specific node configuration errors I was coming across when setting up the actual CLI command. The actual data interpretation and manipulation was much quicker once I got started.

Last thoughts: It seems like `spotify.json` could be better stored in a DB of some sort and the `changes.json` could be organized to more efficiently make the critical changes. This would also allow for the usage of caching to improve performance. I very much appreciate this being a practical take home and I hope you continue to use this process in the future.
