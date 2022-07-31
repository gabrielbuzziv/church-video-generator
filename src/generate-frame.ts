import { unlinkSync } from 'fs';
import { exec, execSync } from 'child_process';
import { Birthday } from '.';
import { breakLines, clearString } from './utils';

type Params = Birthday & {
  numberOrder: number;
};

export const generateFrame = async ({
  date,
  groupName,
  description,
  numberOrder,
}: Params) => {
  const fileName = clearString(`${String(numberOrder).padStart(2, '0')}-${description}`);

  const defaultArgs = [
    '-size 3840x1080',
    '-background transparent',
    '-font ./assets/fonts/edosz.ttf',
    '-gravity center',
  ];

  const descriptionWithLineBreaks = breakLines(description, 5);
  const descriptionYAxis = descriptionWithLineBreaks.totalOfLines;

  const groupNameAxis = `+0-300`;
  const descriptionAxis = `+0+${descriptionYAxis}`;
  const dateAxis = `+0+${300 + 2 * descriptionYAxis}`;

  const dateArgs = [
    ...defaultArgs,
    '-fill yellow',
    '-pointsize 100',
    `-annotate ${groupNameAxis} "${groupName}"`,
    '-append',
    '-fill white',
    '-pointsize 180',
    `-annotate ${descriptionAxis} "${
      descriptionWithLineBreaks.lines
    }"`,
    '-append',
    '-fill white',
    '-pointsize 140',
    `-annotate ${dateAxis} "${date}"`,
    '-flatten ./assets/background.png',
    `./tmp/${fileName}.png`,
  ].join(' ');

  execSync(`convert ${dateArgs}`);

  return fileName;
};
