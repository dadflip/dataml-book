import { FC } from 'react';

export interface Subsection {
  id: string;
  title: string;
  description: string;
  illustration: FC<{ className?: string }>;
  detailId?: string;
}

export interface Section {
  id: string;
  title: string;
  glowColor: string;
  colSpan?: 1 | 2;
  subsections: Subsection[];
}
