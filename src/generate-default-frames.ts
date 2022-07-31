import { unlinkSync } from 'fs';
import { exec, execSync } from 'child_process';
import { Birthday } from '.';
import { breakLines, clearString } from './utils';


export const generateDefaultFrame = async () => {

  const defaultArgs = [
    '-size 3840x1080',
    '-font ./assets/fonts/edosz.ttf',
    '-fill yellow',
    '-gravity center',
  ];

  const firstFrameArgs = [
    ...defaultArgs,
    '-pointsize 300',
    '-annotate +0+0 "Feliz Aniversário"',
    '-flatten ./assets/background.png',
    './tmp/00-first-frame.png'
  ].join(' ');

  const lastFrameArgs = [
    ...defaultArgs,
    '-pointsize 300',
    '-annotate +0+0 "Parabéns..."',
    '-flatten ./assets/background.png',
    './tmp/99-last-frame.png'
  ].join(' ');


  execSync(`convert ${firstFrameArgs}`);
  execSync(`convert ${lastFrameArgs}`);
};
