// src/pages/api/editor/list.ts

import type { NextApiResponse } from 'next';
import { examAttrConverter } from '@/database/converters/exam';
import { fs_e } from '@/database/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const snapshot = await fs_e.withConverter(examAttrConverter).get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 'fail', data: e });
  }
}
