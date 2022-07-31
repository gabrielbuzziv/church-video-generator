import { Birthday } from ".";
import { parse, isBefore } from 'date-fns';

export const clearString = (text: string) => {
  return text
    .trim()
    .normalize('NFD') // Change diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
    .replace(/\s+/g, '-') // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, '-and-') // Replace ampersand
    .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
    .replace(/-+/g, '-') // Remove duplicate dashes
    .replace(/^-*/, '') // Remove starting dashes
    .replace(/-*$/, '');
};

export const breakLines = (text: string, numberOfWords: number) => {
  const content = text.split(' ');

  const lines = content.map((item: string, index: number) => {
    const isNotLastItem = index < content.length - 1;

    if (isNotLastItem && (index + 1) % numberOfWords === 0) {
      return `${item}-`;
    }

    return item;
  });

  return {
    lines: lines.join(' ').split('-').join('\n'),
    totalOfLines: lines.length,
  };
};

export const sortByDate = (a: Birthday, b: Birthday) => {
  const dateA = parse(a.date, 'dd/MM', new Date());
  const dateB = parse(b.date, 'dd/MM', new Date());

  if (isBefore(dateA, dateB)) return -1;
  if (isBefore(dateB, dateA)) return 1;
  return 0;
};