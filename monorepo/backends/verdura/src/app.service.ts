import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVerdura(): { vegetable: string } {
    return { vegetable: 'Lattuga 🥬' };
  }
}
