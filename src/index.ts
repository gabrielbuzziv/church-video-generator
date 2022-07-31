import { execSync } from 'child_process';
import { unlinkSync, writeFile } from 'fs';
import { generateDefaultFrame } from './generate-default-frames';
import { generateFrame } from './generate-frame';
import { sortByDate } from './utils';

export type Birthday = {
  date: string;
  groupName: string;
  description: string;
};

const handler = async () => {
  const listOfBirthdays: Birthday[] = [
    {
      date: '24/07',
      groupName: 'Célula Eternidade',
      description: 'Casamento de 10 anos do buzzi e da bruna',
    },
    {
      date: '20/07',
      groupName: 'Célula Zoe',
      description: 'Gabriel Buzzi Venturi',
    },
    // {
    //   date: '21/07',
    //   groupName: 'Célula Huious',
    //   description: 'Xande',
    // },
    // {
    //   date: '22/07',
    //   groupName: 'Célula Eternidade',
    //   description: 'Vitor',
    // },
    // {
    //   date: '01/12',
    //   groupName: 'Célula Eternidade',
    //   description: 'William',
    // },
    // {
    //   date: '13/03',
    //   groupName: 'Célula Eternidade',
    //   description: 'Sanatiel',
    // },
  ];

  const ffmpegPath = '/opt/homebrew/bin';
  const outputPath = 'tmp/output.mp4';

  const frameDuration = 1.6;
  const totalOfDefaultFrames = 2;
  const videoDuration = (listOfBirthdays.length + totalOfDefaultFrames) * frameDuration;

  await generateDefaultFrame();

  const files = await Promise.all(
    listOfBirthdays
      .sort(sortByDate)
      .map(
        async (birthday: Birthday, index: number) =>
          await generateFrame({ ...birthday, numberOrder: index + 1 })
      )
  );

  const args = [
    '-y',
    '-i assets/music.mp3',
    '-framerate 1/2',
    '-pattern_type glob',
    `-i 'tmp/*.png'`,
    // `-filter_complex "zoompan=z='min(zoom+0.0015,1.5)':d=40:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)', scale=3840:1080"`,
    // `-vf "scale=3840:1080, zoompan=z='min(zoom+0.0015,1.5)':d=40:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"`,



    `-vf "scale=3840x1080, setsar=ratio='(2/1)', zoompan=z='min(zoom+0.0015,1.5)':d=40:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"`,

    // '-r 30',
    '-c:v libx264',
    '-pix_fmt yuv420p',
    `-t ${videoDuration}`,
    '-movflags +faststart',
    outputPath,
  ].join(' ');


  execSync(`${ffmpegPath}/ffmpeg ${args}`);

  files.forEach(file => unlinkSync(`./tmp/${file}.png`));
  unlinkSync('./tmp/00-first-frame.png');
  unlinkSync('./tmp/99-last-frame.png');
};

handler();
