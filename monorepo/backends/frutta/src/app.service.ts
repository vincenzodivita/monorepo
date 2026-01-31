import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getFrutta(): { fruit: string } {
    return { fruit: 'Banana 🍌' };
  }
}
