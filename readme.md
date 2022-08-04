# Video Generator with NodeJS + FFMPEG

This script generate a video bases on an array to automate the creation of aniversary videos for my church.

## Requirements

- NodeJS
- FFMPEG CLI
- ImageMagic CLI

## How to Run

First, you need to configure the array on `src/index.ts` file. Setting the people you want to generate frames, each array object is a frame.

To execute:
```shell
yarn dev
```