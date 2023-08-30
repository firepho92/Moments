import PersonDto from './PersonDto';

export default interface CoupleDto {
  id: string;
  principal: PersonDto;
  companion: PersonDto;
}