import { Construct } from 'constructs';
import { File } from './file';
import * as fs from 'fs';

export class License extends File {
  private readonly buffer: Buffer;

  constructor(scope: Construct, spdx: string) {
    super(scope, 'LICENSE');

    const text = `${__dirname}/license-text/${spdx}.txt`;
    if (!fs.existsSync(text)) {
      throw new Error(`unsupported license ${spdx}`);
    }

    this.buffer = fs.readFileSync(text);
  }

  protected get data(): unknown {
    return this.buffer;
  }
}