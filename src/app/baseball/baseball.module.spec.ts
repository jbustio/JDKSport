import { BaseballModule } from './baseball.module';

describe('BaseballModule', () => {
  let baseballModule: BaseballModule;

  beforeEach(() => {
    baseballModule = new BaseballModule();
  });

  it('should create an instance', () => {
    expect(baseballModule).toBeTruthy();
  });
});
