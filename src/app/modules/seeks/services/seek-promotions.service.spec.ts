/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeekPromotionsSeek } from './seek-promotions.service';

describe('Seek: SeekPromotions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeekPromotionsSeek]
    });
  });

  it('should ...', inject([SeekPromotionsSeek], (seek: SeekPromotionsSeek) => {
    expect(seek).toBeTruthy();
  }));
});
