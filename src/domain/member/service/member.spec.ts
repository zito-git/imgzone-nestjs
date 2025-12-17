import { Test, TestingModule } from '@nestjs/testing';
import { Member } from '../member';

describe('Member', () => {
  let provider: Member;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Member],
    }).compile();

    provider = module.get<Member>(Member);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
